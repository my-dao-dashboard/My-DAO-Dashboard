import BigNumber from "bignumber.js";

export interface Asset {
  symbol: string;
  name: string;
  contractAddress: string;
  value: BigNumber;
  usdValue: number;
}
