import BigNumber from "bignumber.js";
import Web3 from "web3";
import Contract from "web3/eth/contract";
import { Block, Transaction } from "web3/eth/types";
import { Provider } from "web3/providers";
import { IWeb3Service } from "./IWeb3Service";

export class Web3Service implements IWeb3Service {
  public web3: Web3;

  private infura: string = "https://mainnet.infura.io/v3/1704f40805834d76b667f4228594b051";

  constructor(web3?: Web3) {
    if (web3) {
      this.web3 = web3;
    } else {
      if ((window as any).web3) {
        console.log("injected provider");
        this.web3 = new Web3((window as any).web3.currentProvider);
      } else {
        console.log("fallback infura provider");
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.infura));
      }
    }
  }

  public provider(): Provider {
    return this.web3.currentProvider;
  }

  public async getTransaction(hash: string): Promise<Transaction> {
    return await this.web3.eth.getTransaction(hash);
  }

  public async getBlock(blockNumber: number): Promise<Block> {
    return await this.web3.eth.getBlock(blockNumber);
  }

  public async getBlockTimestamp(blockNumber: number): Promise<Date> {
    const block = await this.web3.eth.getBlock(blockNumber);
    return new Date(block.timestamp * 1000);
  }

  public async getAccount(): Promise<string> {
    return (await this.getAccounts())[0];
  }

  public async getAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }

  public async getBalance(address: string): Promise<BigNumber> {
    return new BigNumber(await this.web3.eth.getBalance(address));
  }

  public contract(abi: any, address: string): Contract {
    return new this.web3.eth.Contract(abi, address);
  }
}
