import { DAO } from "./DAO";

export interface Member {
  address: string;
  daos: DAO[];
}
