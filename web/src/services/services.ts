import { MetamaskService } from "./metamask/metamask.service";
import { MetamaskQuery } from "./metamask/metamask.query";
import { AccountService } from "./account/account.service";
import { AccountQuery } from "./account/account.query";
import { memoize } from "../util/memoize";

export class Services {
  @memoize()
  get metamask() {
    const service = new MetamaskService();
    const query = new MetamaskQuery(service.store);
    return { service, query };
  }

  @memoize()
  get account() {
    const service = new AccountService();
    const query = new AccountQuery(service.store);

    this.metamask.query.isEnabled$.subscribe(async isEnabled => {
      if (isEnabled) {
        await service.updateAddress(this.metamask.service.upstream)
      }
    });

    return { service, query };
  }
}
