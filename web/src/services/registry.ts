import { MetamaskService } from "./metamask.service";
import { memoize } from "decko";

export class Registry {
  @memoize()
  metamask(): MetamaskService {
    return new MetamaskService();
  }
}
