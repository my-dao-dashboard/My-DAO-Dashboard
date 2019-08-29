import BigNumber from "bignumber.js";
import Contract from "web3/eth/contract";
import { Block, Transaction } from "web3/eth/types";
import { Provider } from "web3/providers";

export interface IWeb3Service {
  provider(): Provider;

  getTransaction(hash: string): Promise<Transaction>;
  getBlock(blockNumber: number): Promise<Block>;
  getBlockTimestamp(blockNumber: number): Promise<Date>;
  getAccount(): Promise<string>;
  getAccounts(): Promise<string[]>;
  getBalance(address: string): Promise<BigNumber>;

  contract(abi: any, address: string): Contract;
}
