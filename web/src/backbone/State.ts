export interface AccountState {
    address?: string
}

export interface DaoInstanceState {
    address: string
}

export interface DaosState {
    daos: Array<DaoInstanceState> | undefined
}

export interface State {
    account: AccountState
    daos: DaosState
}
