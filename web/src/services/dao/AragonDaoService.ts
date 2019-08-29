import daolist from "../../data/daolist.json";
import { DAO } from "../../model/DAO";
import { DaoType } from "../../model/DaoType";
import { IDaoService } from "./IDaoService";

export class AragonDaoService implements IDaoService {
  public getDao(userAddress: string): DAO {
    return this.mapDao(daolist.find(dao => dao.creator === userAddress));
  }

  public getDaos(): DAO[] {
    return daolist.map(dao => this.mapDao(dao));
  }

  public getDaosByUser(contractAddress: string): DAO[] {
    return daolist.filter(dao => dao.address === contractAddress).map(dao => this.mapDao(dao));
  }

  private mapDao(dao: any) {
    return {
      name: dao.name ? dao.name : dao.address,
      address: dao.address,
      type: DaoType.ARAGON,
      members: [],
      proposals: []
    } as DAO;
  }
}
