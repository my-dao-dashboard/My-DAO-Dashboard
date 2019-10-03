import { SettingsState } from "./settings.store";
import { ImmediateQuery } from "../../util/immediate-query";

export class SettingsQuery extends ImmediateQuery<SettingsState> {
  isRead$ = this.immediate(s => s.isRead);
  watchedAddresses$ = this.immediate(s => s.watchedAddresses)
}
