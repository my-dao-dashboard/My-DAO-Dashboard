import knownMolochList from "../../data/moloch-daos.json";
import { DAO } from "../../model/DAO";
import { DaoType } from "../../model/DaoType";
import { IDaoService } from "./IDaoService";

export class MolochDaoService implements IDaoService {
  public getDao(userAddress: string): DAO {
    return this.mapDao(knownMolochList.daos.find(dao => dao.address === userAddress));
  }

  public getDaos(): DAO[] {
    return knownMolochList.daos.map(dao => this.mapDao(dao));
  }

  public getDaosByUser(contractAddress: string): DAO[] {
    return knownMolochList.daos.filter(dao => dao.address === contractAddress).map(dao => this.mapDao(dao));
  }

  private mapDao(dao: any) {
    return {
      name: dao.name ? dao.name : dao.address,
      address: dao.address,
      type: DaoType.MOLOCH,
      members: [],
      proposals: []
    } as DAO;
  }
}
