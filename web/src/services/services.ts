import { MetamaskService } from "./metamask/metamask.service";
import { BlockchainService } from "./blockchain/blockchain.service";
import { memoize } from "../util/memoize";
import { SettingsService } from "./settings/settings.service";
import { DaosService } from "./daos/daos.service";
import { map } from "rxjs/operators";
import { ProposalsService } from "./proposals/proposals.service";
import { EtherscanService } from "./etherscan.service";

export class Services {
  @memoize()
  get metamask() {
    return new MetamaskService(window as any);
  }

  @memoize()
  get blockchain() {
    return new BlockchainService(this.metamask.ready$);
  }

  @memoize()
  get settings() {
    return new SettingsService(this.blockchain.ready$);
  }

  @memoize()
  get daos() {
    const watchedAddresses$ = this.settings.query.watchedAddresses$;
    const web3$ = this.blockchain.ready$.pipe(map(p => p.web3));
    const account$ = this.blockchain.ready$.pipe(map(p => p.address));
    const etherscan = this.etherscanService;
    return new DaosService(watchedAddresses$, web3$, account$, etherscan);
  }

  @memoize()
  get etherscanService() {
    return new EtherscanService();
  }

  @memoize()
  get proposals() {
    const web3$ = this.blockchain.ready$.pipe(map(p => p.web3));
    return new ProposalsService(web3$, this.daos.query.loadedDaos$);
  }
}
