import ApolloClient, { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import aragonKernelABI from "../abis/aragon-kernel.abi.json";
import aragonVotingABI from "../abis/aragon-voting.abi.json";
import { AccountService } from "./account.service";
import { DaoInstanceState, DaoKind } from "./State";

export enum TransactionKind {
  MINTING = "MINTING",
  WHATEVER = "WHATEVER",
  SPENDING = "SPENDING"
}

export enum VoteStatus {
  OPEN = "OPEN",
  ENACTED = "ENACTED",
  REJECTED = "REJECTED"
}

const MINTING_MARK = "40c10f19";

export interface VoteCount {
  yes: number;
  no: number;
  total: number;
}
export interface VoteProposal {
  kind: TransactionKind;
  dao: DaoInstanceState;
  creator: string;
  voteId: number;
  votes: VoteCount;
  title: string;
  timestamp: Date;
  votingAddress: string;
  status: VoteStatus;
}

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
  dao: DaoInstanceState
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
  dao: DaoInstanceState
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

export class VotesService {
  private readonly web3: Web3;
  private readonly molochApollo: ApolloClient<unknown>;

  constructor(private readonly accountService: AccountService) {
    this.web3 = accountService.web3();
    this.molochApollo = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/molochventures/moloch"
    });
  }

  public async getAragonVotes(dao: DaoInstanceState): Promise<VoteProposal[]> {
    const kernelAddress = dao.address;
    const kernelContract = new this.web3.eth.Contract(aragonKernelABI, kernelAddress);
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
    const votingAddress = this.web3.eth.abi.decodeParameter("address", raw.slice(0, 32).toString("hex"));
    const votingContract = new this.web3.eth.Contract(aragonVotingABI, votingAddress);
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
        const tx = await this.web3.eth.getTransaction(transactionHash);
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
          return parseMinting(this.web3, voteId, yes, no, total, creator, txInput, tx.blockNumber, votingAddress, voteStatus, dao);
        } else {
          return parseTx(this.web3, voteId, yes, no, total, creator, metadata, txInput, tx.blockNumber, votingAddress, voteStatus, dao);
        }
      })
    );
  }

  public async getMolochVotes(dao: DaoInstanceState): Promise<VoteProposal[]> {
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

  public async getVotes(dao: DaoInstanceState): Promise<VoteProposal[]> {
    switch (dao.kind) {
      case DaoKind.ARAGON:
        return this.getAragonVotes(dao);
      case DaoKind.MOLOCH:
        return this.getMolochVotes(dao);
      case DaoKind.DAOSTACK:
        return [];
      default:
        return assertNever(dao.kind);
    }
  }
}
