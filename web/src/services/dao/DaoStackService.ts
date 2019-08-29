import { DAO } from "../../model/DAO";
import { IDaoService } from "./IDaoService";

export class DaoStackService implements IDaoService {
  getDao(userAddress: string): DAO {
    throw new Error("Method not implemented.");
  }
  getDaos(): DAO[] {
    throw new Error("Method not implemented.");
  }
  getDaosByUser(contractAddress: string): DAO[] {
    throw new Error("Method not implemented.");
  }
}
