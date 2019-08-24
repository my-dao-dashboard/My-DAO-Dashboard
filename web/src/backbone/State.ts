import BigNumber from "bignumber.js";

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
    balance: BigNumber,
    totalSupply: BigNumber
}

export interface DaosState {
    daos: Array<DaoInstanceState> | undefined
}

export interface State {
    account: AccountState
    daos: DaosState
}
