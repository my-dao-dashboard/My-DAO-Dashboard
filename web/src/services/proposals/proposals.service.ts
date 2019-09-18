import { ProposalsStore } from "./proposals.store";
import { ProposalsQuery } from "./proposals.query";
import { Observable } from "rxjs";
import Web3 from "web3";
import { first, flatMap } from "rxjs/operators";
import aragonKernelABI from "../../abis/aragon-kernel.abi.json";
import aragonVotingABI from "../../abis/aragon-voting.abi.json";
import BigNumber from "bignumber.js";
import ApolloClient, { gql } from "apollo-boost";
import { VoteStatus } from "../../model/vote-status";
import { VoteProposal } from "../../model/vote-proposal";
import { VoteCount } from "../../model/vote-count";
import { TransactionKind } from "../../model/transaction-kind";
import { DaoType } from "../../model/dao-type";
import { Dao } from "../../model/dao";

const MINTING_MARK = "40c10f19";

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

async function parseMinting(
  web3: Web3,
  voteId: number,
  yes: number,
  no: number,
  total: number,
  creator: string,
  txInput: string,
  blockNumber: number,
  votingAddress: string,
  voteStatus: VoteStatus,
  dao: Dao
): Promise<VoteProposal> {
  const markIndex = txInput.indexOf(MINTING_MARK);
  const txStuff = txInput.slice(markIndex, txInput.length);
  const amount = web3.eth.abi.decodeParameter("uint256", txStuff.slice(txStuff.length - 64, txStuff.length));
  const humanAmount = new BigNumber(amount).dividedBy(10 ** 18).toNumber();
  const address = web3.eth.abi.decodeParameter("address", txStuff.slice(txStuff.length - 128, txStuff.length - 64));
  const title = `Minting ${humanAmount} tokens to ${address}`;
  const block = await web3.eth.getBlock(blockNumber);
  const timestamp = new Date(block.timestamp * 1000);
  const votes: VoteCount = {
    yes,
    no,
    total
  };
  return {
    kind: TransactionKind.MINTING,
    dao,
    creator,
    voteId,
    votes,
    title,
    timestamp,
    votingAddress,
    status: voteStatus
  };
}

async function parseTx(
  web3: Web3,
  voteId: number,
  yes: number,
  no: number,
  total: number,
  creator: string,
  metadata: string,
  txInput: string,
  blockNumber: number,
  votingAddress: string,
  voteStatus: VoteStatus,
  dao: Dao
): Promise<VoteProposal> {
  const block = await web3.eth.getBlock(blockNumber);
  const timestamp = new Date(block.timestamp * 1000);
  const title = metadata ? metadata : `Proposal by ${creator}`;
  const votes: VoteCount = {
    yes,
    no,
    total
  };
  return {
    kind: TransactionKind.WHATEVER,
    dao,
    creator,
    voteId,
    votes,
    title,
    timestamp,
    votingAddress,
    status: voteStatus
  };
}

function molochProposalTitle(details: string): string {
  try {
    const payload = JSON.parse(details);
    return payload.title || payload.description;
  } catch (e) {
    return details;
  }
}

export class ProposalsService {
  private readonly store: ProposalsStore;
  readonly query: ProposalsQuery;
  private readonly molochApollo: ApolloClient<unknown>;
  private readonly daostackApollo: ApolloClient<unknown>;

  constructor(private readonly web3$: Observable<Web3>, private readonly daos$: Observable<Dao[]>) {
    this.store = new ProposalsStore({
      proposals: []
    });
    this.store.setLoading(true);
    this.query = new ProposalsQuery(this.store);
    this.molochApollo = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/molochventures/moloch"
    });
    this.daostackApollo = new ApolloClient({
      uri: "https://subgraph.daostack.io/subgraphs/name/v24"
    });

    this.daos$.pipe(flatMap(daos => this.loadAllProposals(daos))).subscribe(proposals => {
      this.store.update({
        proposals
      });
      this.store.setLoading(false);
    });
  }

  async loadAllProposals(daos: Dao[]) {
    const proposals = await Promise.all(
      daos.map(dao => {
        return this.byDao(dao);
      })
    );
    return proposals.flat();
  }

  byDao(dao: Dao) {
    switch (dao.kind) {
      case DaoType.ARAGON:
        return this.getAragonVotes(dao);
      case DaoType.MOLOCH:
        return this.getMolochVotes(dao);
      case DaoType.DAOSTACK:
        return this.getDaostackVotes(dao);
      default:
        return assertNever(dao.kind);
    }
  }

  public async getDaostackVotes(dao: Dao): Promise<VoteProposal[]> {
    const page = await this.daostackApollo.query({
      query: gql`
          query {
              proposals(where: { dao: "${dao.address}" }) {
                  id
                  title
                  proposer
                  stage
                  executionState
                  url
                  votesFor
                  votesAgainst
                  winningOutcome
                  createdAt
              }
          }
      `
    });

    return page.data.proposals.map((p: any) => {
      let status = VoteStatus.OPEN;
      if (p.stage === "Executed") {
        status = VoteStatus.ENACTED;
      } else if (p.stage === "ExpiredInQueue") {
        status = VoteStatus.REJECTED;
      }

      const votes: VoteCount = {
        yes: new BigNumber(p.votesFor).dividedBy(10 ** 18).toNumber(),
        no: new BigNumber(p.votesAgainst).dividedBy(10 ** 18).toNumber(),
        total: dao.totalSupply
      };

      return {
        kind: TransactionKind.WHATEVER,
        dao,
        creator: p.proposer,
        voteId: p.id,
        votes,
        title: p.title,
        timestamp: new Date(Number(p.createdAt) * 1000),
        votingAddress: p.memberAddress,
        status
      };
    });
  }

  public async getMolochVotes(dao: Dao): Promise<VoteProposal[]> {
    const page = await this.molochApollo.query({
      query: gql`
        query {
          proposals {
            id
            timestamp
            proposalIndex
            startingPeriod
            delegateKey
            memberAddress
            applicantAddress
            tokenTribute
            sharesRequested
            processed
            didPass
            aborted
            details
          }
        }
      `
    });

    return page.data.proposals.map((p: any) => {
      const kind = p.tokenTribute === "0" ? TransactionKind.SPENDING : TransactionKind.MINTING;
      let status = VoteStatus.OPEN;
      if (p.aborted || (!p.didPass && p.processed)) {
        status = VoteStatus.REJECTED;
      } else if (p.didPass) {
        status = VoteStatus.ENACTED;
      }
      return {
        kind,
        dao,
        creator: p.applicantAddress,
        voteId: p.id,
        title: molochProposalTitle(p.details),
        timestamp: new Date(Number(p.timestamp) * 1000),
        votingAddress: p.memberAddress,
        status
      };
    });
  }

  public async getAragonVotes(dao: Dao): Promise<VoteProposal[]> {
    const kernelAddress = dao.address;
    const web3 = await this.web3$.pipe(first()).toPromise();
    const kernelContract = new web3.eth.Contract(aragonKernelABI, kernelAddress);
    const setAppEvents = await kernelContract.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
      topics: ["0xd880e726dced8808d727f02dd0e6fdd3a945b24bfee77e13367bcbe61ddbaf47"]
    });
    const filter = setAppEvents.find((event: any | undefined) => {
      const data = event.raw.data;
      return data.includes("9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4");
    });
    const raw = Buffer.from(filter!.raw!.data.slice(2, filter!.raw!.data.length), "hex");
    const votingAddress = web3.eth.abi.decodeParameter("address", raw.slice(0, 32).toString("hex"));
    const votingContract = new web3.eth.Contract(aragonVotingABI, votingAddress);
    const startVoteEvents = await votingContract.getPastEvents("StartVote", {
      fromBlock: 0,
      toBlock: "latest"
    });
    return Promise.all(
      startVoteEvents.map(async event => {
        const creator = event.returnValues.creator;
        const voteId = Number(event.returnValues.voteId);

        const vt = await votingContract.methods.getVote(voteId).call();
        const yes = new BigNumber(vt[6]).dividedBy(10 ** 18).toNumber();
        const no = new BigNumber(vt[7]).dividedBy(10 ** 18).toNumber();
        const total = dao.totalSupply;
        // console.log(vt);

        const transactionHash = event.transactionHash;
        const tx = await web3.eth.getTransaction(transactionHash);
        const txInput = tx.input.replace("0x", "");
        const functionCallIndex = txInput.indexOf(MINTING_MARK);
        const voteEntry = await votingContract.methods.getVote(voteId).call();
        let voteStatus: VoteStatus = VoteStatus.REJECTED;
        if (voteEntry.executed && !voteEntry.open) {
          voteStatus = VoteStatus.ENACTED;
        } else if (!voteEntry.executed && voteEntry.open) {
          voteStatus = VoteStatus.OPEN;
        }
        const metadata = event.returnValues[2];
        if (functionCallIndex >= 0) {
          return parseMinting(
            web3,
            voteId,
            yes,
            no,
            total,
            creator,
            txInput,
            tx.blockNumber,
            votingAddress,
            voteStatus,
            dao
          );
        } else {
          return parseTx(
            web3,
            voteId,
            yes,
            no,
            total,
            creator,
            metadata,
            txInput,
            tx.blockNumber,
            votingAddress,
            voteStatus,
            dao
          );
        }
      })
    );
  }
}
