import { BalanceEntry } from "../model/balance-entry";

export enum DaoKind {
  ARAGON = "ARAGON",
  MOLOCH = "MOLOCH",
  DAOSTACK = "DAOSTACK"
}

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: number;
  totalSupply: number;
  balance: BalanceEntry[];
  usdBalance: number;
}
