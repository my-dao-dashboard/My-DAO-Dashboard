import BigNumber from "bignumber.js";
import { IBalanceEntry } from "./balance.service";

export interface AccountState {
  address?: string;
}

export enum DaoKind {
  ARAGON = "ARAGON",
  MOLOCH = "MOLOCH"
}

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: BigNumber;
  totalSupply: BigNumber;
  balance: IBalanceEntry[];
  usdBalance: number;
}

export interface DaosState {
  daos: DaoInstanceState[] | undefined;
  dao: DaoInstanceState | undefined;
}

export interface State {
  account: AccountState;
  daos: DaosState;
}
