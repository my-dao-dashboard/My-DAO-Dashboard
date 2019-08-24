import {AccountService} from "./account.service";
import {DaosService} from "./daos.service";
import {BalanceService} from "./balance.service";

export const accountService = new AccountService()
export const balanceService = new BalanceService(accountService)
export const daosService = new DaosService(accountService, balanceService)
