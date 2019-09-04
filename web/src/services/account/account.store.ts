import { Store, StoreConfig } from "@datorama/akita";

export interface AccountState {
  address: string;
}

@StoreConfig({ name: "account" })
export class AccountStore extends Store<AccountState> {}
