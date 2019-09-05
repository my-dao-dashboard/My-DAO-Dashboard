import {AccountService} from "./account.service";
import {BalanceService} from "./balance.service";
import {DaosService} from "./daos.service";
import {VotesService} from "./votes.service";

export const accountService = new AccountService()
export const balanceService = new BalanceService(accountService.web3())
export const daosService = new DaosService(accountService, balanceService)
export const votesService = new VotesService(accountService)
