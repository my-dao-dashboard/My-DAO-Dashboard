import BigNumber from "bignumber.js";
import {IBalanceEntry} from "./balance.service";

export interface AccountState {
    address?: string
}

export enum DaoKind {
    ARAGON = 'ARAGON'
}

export interface DaoInstanceState {
    address: string
    name: string | null
    kind: DaoKind
    shareBalance: BigNumber,
    totalSupply: BigNumber,
    balance: Array<IBalanceEntry>
}

export interface DaosState {
    daos: Array<DaoInstanceState> | undefined
}

export interface State {
    account: AccountState
    daos: DaosState
}
