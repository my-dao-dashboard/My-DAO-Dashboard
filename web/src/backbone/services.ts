import {AccountService} from "./account.service";
import {DaosService} from "./daos.service";
import {BalanceService} from "./balance.service";
import {VotesService} from "./votes.service";

export const accountService = new AccountService()
export const balanceService = new BalanceService(accountService)
export const daosService = new DaosService(accountService, balanceService)
export const votesService = new VotesService(accountService)
