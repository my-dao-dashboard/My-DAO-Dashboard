import React from "react";
import { DashboardLoader } from "../components/dashboard/dashboard.loader";
import { DaoListComponent } from "../components/dashboard/dao-list.component";
import { ProposalsComponent } from "../components/proposals/proposals.component";

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLoader>
      <DaoListComponent />
      <ProposalsComponent />
    </DashboardLoader>
  );
};
