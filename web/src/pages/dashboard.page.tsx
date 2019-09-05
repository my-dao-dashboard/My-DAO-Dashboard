import React from "react";
import { DashboardLoader } from "../components/dashboard/dashboard.loader";
import { DaoListComponent } from "../components/dashboard/dao-list.component";
import { ProposalsLoader } from "../components/dashboard/proposals.loader";

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLoader>
      <DaoListComponent />
      <ProposalsLoader>
        proposals
      </ProposalsLoader>
    </DashboardLoader>
  );
};
