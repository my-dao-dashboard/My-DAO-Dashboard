import aragonTokenABI from "../../../abis/aragon-token.abi.json";
import aragonTokenControllerABI from "../../../abis/aragon-token-controller.abi.json";
import aragonKernelABI from "../../../abis/aragon-kernel.abi.json";
import ApolloClient, { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import daolist from "../../../data/daolist.json";
import { BalanceService } from "../../balance.service";
import { DaoType } from "../../../model/dao-type";
import { Dao } from "../../../model/dao";
import { IDaoService } from "../dao.service";
import { EtherscanService } from "../../etherscan.service";
import _ from "underscore";

export class AragonService implements IDaoService {
  private readonly ensApollo: ApolloClient<unknown>;
  private names: any | undefined;

  constructor(
    private readonly web3: Web3,
    private readonly balanceService: BalanceService,
    private readonly etherscanService: EtherscanService
  ) {
    this.ensApollo = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
    });
  }

  private async fetchAllNames() {
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

  private async fetchName(parent: string, labelhash: string, skip: number = 0): Promise<string | null> {
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

  public async getDao(address: string): Promise<Dao> {
    throw new Error("Method not implemented.");
  }

  public async getDaos(): Promise<Dao[]> {
    throw new Error("Method not implemented.");
  }

  public async daoByToken(tokenAddress: string, account: string): Promise<Dao | undefined> {
    try {
      const tokenContract = new this.web3.eth.Contract(aragonTokenABI, tokenAddress);
      const controllerAddress = await tokenContract.methods.controller().call();
      const controller = new this.web3.eth.Contract(aragonTokenControllerABI, controllerAddress);
      const kernel: string = await controller.methods.kernel().call();
      const kernelContract = new this.web3.eth.Contract(aragonKernelABI, kernel);
      const vaultAddress = await kernelContract.methods
        .apps(
          "0xd6f028ca0e8edb4a8c9757ca4fdccab25fa1e0317da1188108f7d2dee14902fb",
          "0x7e852e0fcfce6551c13800f1e7476f982525c2b5277ba14b24339c68416336d1"
        )
        .call();
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
      const shareBalance = new BigNumber(await tokenContract.methods.balanceOf(account).call())
        .dividedBy(10 ** decimals)
        .toNumber();
      const totalSupply = new BigNumber(await tokenContract.methods.totalSupply().call())
        .dividedBy(10 ** decimals)
        .toNumber();
      const dao: Dao = {
        address: kernel.toLowerCase(),
        name: graphqlName || hiveName || kernel,
        kind: DaoType.ARAGON,
        shareBalance,
        totalSupply,
        balance,
        usdBalance: balance.reduce((acc, cur) => acc + cur.usdValue, 0)
      };
      return dao;
    } catch (ex) {
      console.warn(`Token is not of Aragon DAO, tokenAddress=${tokenAddress}`);
      return undefined;
    }
  }

  public async getDaosByAccount(account: string): Promise<Dao[]> {
    const tokenContracts = await this.etherscanService.tokenContractsByAccount(account);
    const daos = await Promise.all(tokenContracts.map(tokenAddress => this.daoByToken(tokenAddress, account)));
    return _.compact(daos);
  }
}
