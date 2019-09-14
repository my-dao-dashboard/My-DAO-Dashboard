import { DaoKind } from "./dao-kind";
import { BalanceEntry } from "./balance-entry";

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: number;
  totalSupply: number;
  balance: BalanceEntry[];
  usdBalance: number;
}
