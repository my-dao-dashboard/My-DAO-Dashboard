import { memoize } from "decko";
import { MetamaskService } from "./metamask/metamask.service";
import { MetamaskQuery } from "./metamask/metamask.query";

export class Services {
  @memoize()
  metamask() {
    const service = new MetamaskService();
    const query = new MetamaskQuery(service.store);
    return { service, query };
  }
}
