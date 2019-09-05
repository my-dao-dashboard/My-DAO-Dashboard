import ApolloClient, { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import molochABI from "../abis//moloch.abi.json";
import aragonKernelABI from "../abis/aragon-kernel.abi.json";
import aragonTokenControllerABI from "../abis/aragon-token-controller.abi.json";
import aragonTokenABI from "../abis/aragon-token.abi.json";
import erc20ABI from "../abis/erc20.abi.json";
import daolist from "../data/daolist.json";
import knownMolochList from "../data/moloch-daos.json";
import { AccountService } from "./account.service";
import { BalanceService } from "./balance.service";
import { DaoInstanceState, DaoKind } from "./State";

function uniq<A>(array: A[]): A[] {
  return array.filter((v, i) => {
    return array.indexOf(v) === i;
  });
}

async function hasMethod(web3: Web3, contractAddress: string, signature: string): Promise<boolean> {
  const code = await web3.eth.getCode(contractAddress);
  return code.indexOf(signature.slice(2, signature.length)) > 0;
}

const MOLOCH_MEMBER_ADDRESS: string | undefined = "";
// MOLOCH_MEMBER_ADDRESS = '0x59a5493513ba2378ed57ae5ecfb8a027e9d80365' // MOLOCH
// MOLOCH_MEMBER_ADDRESS = '0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88' // METACARTEL AND MOLOCH
// MOLOCH_MEMBER_ADDRESS = '0xd6e371526cdaee04cd8af225d42e37bc14688d9e' // METACARTEL ONLY

export class DaosService {
  private readonly web3: Web3;
  private readonly ensApollo: ApolloClient<unknown>;
  private readonly daostackApollo: ApolloClient<unknown>;
  private names: any | undefined;

  constructor(private readonly accountService: AccountService, private readonly balanceService: BalanceService) {
    this.web3 = accountService.web3();
    this.ensApollo = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
    });
    this.daostackApollo = new ApolloClient({
      uri: "https://subgraph.daostack.io/subgraphs/name/v24"
    });
  }

  public async fetchAllNames() {
    if (!this.names) {
      try {
        const endpoint = `https://daolist.1hive.org`;
        const data = await fetch(endpoint);
        this.names = await data.json();
      } catch (e) {
        this.names = daolist;
      }
    }
    return this.names;
  }

  public async fetchName(parent: string, labelhash: string, skip: number = 0): Promise<string | null> {
    const page = await this.ensApollo.query({
      query: gql`
                query {
                    domain(id: "${parent}") {
                        subdomains(orderBy: id, skip: ${skip}) {
                            labelName
                            labelhash
                        }
                    }
                }
            `
    });
    const subdomains = page.data.domain.subdomains as Array<{ labelName: string; labelhash: string }>;
    const found = subdomains.find(s => s.labelhash === labelhash);
    if (found) {
      return found.labelName;
    } else {
      return this.fetchName(parent, labelhash, skip + 100);
    }
  }

  public async getAragonDaos(address: string): Promise<DaoInstanceState[]> {
    const endpoint = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}#tokentxns&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    const data = await fetch(endpoint);
    const body = await data.json();
    const tokenTransactions = body.result;
    const tokenContracts = uniq<string>(tokenTransactions.map((t: any) => t.contractAddress));
    const aragonKernels = [];
    for await (const contractAddress of tokenContracts) {
      const tokenContract = new this.web3.eth.Contract(aragonTokenABI, contractAddress);
      const signature = await tokenContract.methods.controller().encodeABI();
      const isAragonToken = await hasMethod(this.web3, contractAddress, signature);
      if (isAragonToken) {
        const controllerAddress = await tokenContract.methods.controller().call();
        const controller = new this.web3.eth.Contract(aragonTokenControllerABI, controllerAddress);
        const kernel: string = await controller.methods.kernel().call();
        const kernelContract = new this.web3.eth.Contract(aragonKernelABI, kernel);
        const vaultAddress = await kernelContract.methods.apps("0xd6f028ca0e8edb4a8c9757ca4fdccab25fa1e0317da1188108f7d2dee14902fb", "0x7e852e0fcfce6551c13800f1e7476f982525c2b5277ba14b24339c68416336d1").call();
        const balance = await this.balanceService.balance(vaultAddress);
        const a = await this.ensApollo.query({
          query: gql`
                      query {
                          domains(where: {resolvedAddress: "${kernel.toLowerCase()}"}) {
                              name
                              labelhash
                              parent {
                                  id
                              }
                          }
                      }
                  `
        });
        const labelHash = a.data.domains[0].labelhash;
        const parentId = a.data.domains[0].parent.id.toLowerCase();
        const name = await this.fetchName(parentId, labelHash);
        const hiveNames = await this.fetchAllNames();
        const hiveEntity = hiveNames.find((t: any) => t.address.toLowerCase() === kernel.toLowerCase());
        const hiveName = hiveEntity ? hiveEntity.name : null;
        const graphqlName = name ? `${name}.aragonid.eth` : null;

        const decimals = Number(await tokenContract.methods.decimals().call());
        const shareBalance = new BigNumber(await tokenContract.methods.balanceOf(address).call()).dividedBy(10 ** decimals).toNumber();
        const totalSupply = new BigNumber(await tokenContract.methods.totalSupply().call()).dividedBy(10 ** decimals).toNumber();
        const dao: DaoInstanceState = {
          address: kernel.toLowerCase(),
          name: graphqlName || hiveName || kernel,
          kind: DaoKind.ARAGON,
          shareBalance,
          totalSupply,
          balance,
          usdBalance: balance.reduce((acc, cur) => acc + cur.usdValue, 0)
        };
        aragonKernels.push(dao);
      }
    }
    return aragonKernels;
  }

  public async getDaostackDaosByReputation(address: string): Promise<DaoInstanceState[]> {
    const results = await this.daostackApollo.query({
      query: gql`
        query {
          reputationHolders(where: { address: "${address}" }) {
            id
            contract
            address
            balance
            dao {
              id
              name
              reputationHoldersCount
              nativeToken {
                id
                name
                symbol
                totalSupply
              }
              nativeReputation {
                id
                totalSupply
              }
            }
          }
        }
      `
    });

    const holdings: DaoInstanceState[] = await Promise.all(
      await results.data.reputationHolders.map(async (holder: any) => {
        const balance = await this.balanceService.balance(holder.dao.id);
        const usdBalance = balance.reduce((acc, cur) => acc + cur.usdValue, 0);

        return {
          address: holder.dao.id,
          name: holder.dao.name,
          kind: DaoKind.DAOSTACK,
          shareBalance: new BigNumber(holder.balance).dividedBy(10 ** 18).toNumber(),
          totalSupply: new BigNumber(holder.dao.nativeReputation.totalSupply).dividedBy(10 ** 18).toNumber(),
          balance,
          usdBalance
        } as DaoInstanceState;
      })
    );

    return holdings;
  }

  public async getOneMolochDao(daoAddress: string, daoName: string, account: string): Promise<DaoInstanceState> {
    const contract = new this.web3.eth.Contract(molochABI, daoAddress);
    const memberInfo = await contract.methods.members(account).call();
    const totalShares = await contract.methods.totalShares().call();
    const approvedTokenAddress = await contract.methods.approvedToken().call();
    const guildBankAddress = await contract.methods.guildBank().call();
    const approvedToken = new this.web3.eth.Contract(erc20ABI, approvedTokenAddress);
    const guildBalance = new BigNumber(await approvedToken.methods.balanceOf(guildBankAddress).call());
    const ethBalanceUsd = guildBalance.dividedBy(10 ** 18).multipliedBy(await this.balanceService.assetPrice("ETH"));
    const balance = [
      {
        symbol: "ETH",
        name: "Ether",
        contractAddress: "0x00",
        value: guildBalance,
        usdValue: ethBalanceUsd.toNumber()
      }
    ];
    return {
      address: daoAddress,
      name: daoName,
      kind: DaoKind.MOLOCH,
      shareBalance: Number(memberInfo.shares),
      totalSupply: Number(totalShares),
      balance,
      usdBalance: ethBalanceUsd.toNumber()
    };
  }

  public async getMolochDaos(account: string): Promise<DaoInstanceState[]> {
    const all = await Promise.all(
      knownMolochList.daos.map(daoDetails => {
        return this.getOneMolochDao(daoDetails.address, daoDetails.name, account);
      })
    );
    return all.filter(dao => dao.shareBalance !== 0);
  }

  public async getDaos(address: string): Promise<DaoInstanceState[]> {
    const aragons = await this.getAragonDaos(address);
    const molochs = await this.getMolochDaos(MOLOCH_MEMBER_ADDRESS || address);
    const daostack = await this.getDaostackDaosByReputation(address);
    return aragons.concat(molochs).concat(daostack);
  }
}
