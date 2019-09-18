import { DaoType } from "./dao-type";
import { BalanceEntry } from "./balance-entry";

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoType;
  shareBalance: number;
  totalSupply: number;
  balance: BalanceEntry[];
  usdBalance: number;
}
