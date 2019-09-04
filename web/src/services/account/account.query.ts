import { Query } from "@datorama/akita";
import { AccountState, AccountStore } from "./account.store";

export class AccountQuery extends Query<AccountState> {
  address$ = this.select(state => state.address);

  constructor(protected store: AccountStore) {
    super(store);
  }

  address() {
    return this.getValue().address;
  }
  //
  // isEnabled() {
  //   return this.getValue().isEnabled;
  // }
}
