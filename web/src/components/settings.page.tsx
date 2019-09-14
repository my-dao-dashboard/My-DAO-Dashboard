import React from "react";
import { SettingsLoader } from "./settings/settings.loader";
import { AddressesFormComponent } from "./settings/addresses-form.component";

export const SettingsPage: React.FC = props => {
  return (
    <SettingsLoader>
        <p>Watched addresses:</p>
        <AddressesFormComponent/>
    </SettingsLoader>
  );
};
