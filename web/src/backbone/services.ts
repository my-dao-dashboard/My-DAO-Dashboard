import {AccountService} from "./account.service";
import {DaosService} from "./daos.service";

export const accountService = new AccountService()
export const dasosService = new DaosService(accountService)
