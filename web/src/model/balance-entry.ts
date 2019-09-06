import BigNumber from "bignumber.js";

export interface BalanceEntry {
  symbol: string;
  name: string;
  contractAddress: string;
  value: BigNumber;
  usdValue: number;
}
