import { BalanceEntry } from "../model/balance-entry";
import { DaoKind } from "../model/dao-kind";

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: number;
  totalSupply: number;
  balance: BalanceEntry[];
  usdBalance: number;
}
