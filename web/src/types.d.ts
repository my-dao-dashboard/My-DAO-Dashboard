declare module "3box" {
  import { Provider } from "web3/providers";

  export class KeyValueStore {
    set<A>(key: string, value: A): Promise<void>;
    get<A>(key: string): Promise<A | undefined>;
  }

  export class Space {
    private: KeyValueStore;
  }

  export class Box {
    openSpace(namespace: string): Promise<Space>;
  }

  export function openBox(account: string, provider: Provider): Promise<Box>;
}
