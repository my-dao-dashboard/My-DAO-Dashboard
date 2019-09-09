import aragonTokenABI from "../../abis/aragon-token.abi.json";
import aragonTokenControllerABI from "../../abis/aragon-token-controller.abi.json";
import aragonKernelABI from "../../abis/aragon-kernel.abi.json";
import ApolloClient, { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import _ from "underscore";
import Web3 from "web3";
import daolist from "../../data/daolist.json";
import { BalanceService } from "../balance.service";
import { DaoKind } from "../../model/dao-kind";
import { DaoInstanceState } from "../../model/dao-instance-state";

async function hasMethod(web3: Web3, contractAddress: string, signature: string): Promise<boolean> {
  const code = await web3.eth.getCode(contractAddress);
  return code.indexOf(signature.slice(2, signature.length)) > 0;
}

export class AragonService {
  private readonly ensApollo: ApolloClient<unknown>;
  private names: any | undefined;

  constructor(private readonly web3: Web3, private readonly balanceService: BalanceService) {
    this.ensApollo = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
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

  public async all(address: string): Promise<DaoInstanceState[]> {
    const endpoint = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}#tokentxns&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    const data = await fetch(endpoint);
    const body = await data.json();
    const tokenTransactions = body.result;
    const tokenContracts = _.uniq<string, string>(tokenTransactions.map((t: any) => t.contractAddress));
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
        const shareBalance = new BigNumber(await tokenContract.methods.balanceOf(address).call())
          .dividedBy(10 ** decimals)
          .toNumber();
        const totalSupply = new BigNumber(await tokenContract.methods.totalSupply().call())
          .dividedBy(10 ** decimals)
          .toNumber();
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
}
