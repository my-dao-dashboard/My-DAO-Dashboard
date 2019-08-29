import { DAO } from "../../model/DAO";

export interface IDaoService {
  getDao(userAddress: string): DAO;
  getDaos(): DAO[];
  getDaosByUser(contractAddress: string): DAO[];
}
