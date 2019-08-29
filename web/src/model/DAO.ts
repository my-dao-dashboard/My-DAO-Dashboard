import { DaoType } from "./DaoType";
import { Member } from "./Member";
import { Proposal } from "./Proposal";

export interface DAO {
  name: string;
  address: string;
  type: DaoType;
  members: Member[];
  proposals: Proposal[];
}
