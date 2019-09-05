import { MetamaskService } from "./metamask/metamask.service";
import { BlockchainService } from "./blockchain/blockchain.service";
import { memoize } from "../util/memoize";
import { SettingsService } from "./settings/settings.service";
import { filter } from "rxjs/operators";

export class Services {
  @memoize()
  get metamask() {
    return new MetamaskService();
  }

  @memoize()
  get blockchain() {
    const service = new BlockchainService();
    this.metamask.query.isEnabled$.subscribe(async isEnabled => {
      if (isEnabled) {
        await service.updateAddress(this.metamask.upstream);
      }
    });
    return service;
  }

  @memoize()
  get settings() {
    const service = new SettingsService();
    this.blockchain.query.address$.pipe(filter(p => !!p)).subscribe(async address => {
      const web3 = this.blockchain.web3;
      await service.openSpace(web3, address);
      service.readWatchedAddresses();
    });
    return service;
  }
}
