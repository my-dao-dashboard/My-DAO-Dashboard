import React from "react";
import { SettingsLoader } from "../components/settings/settings.loader";
import { AddressesFormComponent } from "../components/settings/addresses-form.component";

export const SettingsPage: React.FC = props => {
  return (
    <SettingsLoader>
        <p>Watched addresses:</p>
        <AddressesFormComponent/>
    </SettingsLoader>
  );
};
