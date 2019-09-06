import { VoteProposal } from "../model/vote-proposal";
import { BalanceEntry } from "../model/balance-entry";

export interface AccountState {
  address?: string;
}

export enum DaoKind {
  ARAGON = "ARAGON",
  MOLOCH = "MOLOCH",
  DAOSTACK = "DAOSTACK"
}

export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: number;
  totalSupply: number;
  balance: BalanceEntry[];
  usdBalance: number;
}

export interface DaosState {
  daos: DaoInstanceState[] | undefined;
  dao: DaoInstanceState | undefined;
  proposals: VoteProposal[] | undefined;
}

export interface State {
  account: AccountState;
  daos: DaosState;
}
