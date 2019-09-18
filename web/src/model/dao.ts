import { DaoType } from "./dao-type";
import { Asset } from "./asset";

export interface Dao {
  address: string;
  name: string | null;
  kind: DaoType;
  shareBalance: number;
  totalSupply: number;
  balance: Asset[];
  usdBalance: number;
}
