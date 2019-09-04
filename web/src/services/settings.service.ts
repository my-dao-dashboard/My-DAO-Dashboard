import { Provider } from "web3/providers";

export interface ISettingsService {}

export class SettingsServiceDummy implements ISettingsService {}

export class SettingsService implements ISettingsService {
  constructor(private readonly account: string, private readonly provider: Provider) {}
}
