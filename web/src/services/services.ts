import { MetamaskService } from "./metamask/metamask.service";
import { BlockchainService } from "./blockchain/blockchain.service";
import { memoize } from "../util/memoize";
import { SettingsService } from "./settings/settings.service";
import { DaosService } from "./daos/daos.service";
import { map } from "rxjs/operators";

export class Services {
  @memoize()
  get metamask() {
    return new MetamaskService();
  }

  @memoize()
  get blockchain() {
    const service = new BlockchainService();
    this.metamask.ready$.subscribe(async upstream => {
      await service.updateAddress(upstream);
    });
    return service;
  }

  @memoize()
  get settings() {
    const service = new SettingsService();
    this.blockchain.ready$.subscribe(async payload => {
      await service.openSpace(payload.web3, payload.address);
      service.readWatchedAddresses();
    });
    return service;
  }

  @memoize()
  get daos() {
    const watchedAddresses$ = this.settings.query.loadedWatchedAddresses$;
    const web3$ = this.blockchain.ready$.pipe(map(p => p.web3));
    const account$ = this.blockchain.ready$.pipe(map(p => p.address));
    return new DaosService(watchedAddresses$, web3$, account$);
  }
}
