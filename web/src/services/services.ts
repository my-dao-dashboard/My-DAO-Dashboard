import { MetamaskService } from "./metamask/metamask.service";
import { BlockchainService } from "./blockchain/blockchain.service";
import { memoize } from "../util/memoize";
import { SettingsService } from "./settings/settings.service";

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
    return new SettingsService();
  }
}
