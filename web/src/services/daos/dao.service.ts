import { Dao } from "../../model/dao";

export interface IDaoService {
  getDao(address: string): Promise<Dao | null>;
  getDaos(): Promise<Dao[]>;
  getDaosByAccount(address: string): Promise<Dao[]>;
}
