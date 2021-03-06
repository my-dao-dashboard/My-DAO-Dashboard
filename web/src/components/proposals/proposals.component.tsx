import React, { useContext, useEffect, useState } from "react";
import { ProposalsLoader } from "../dashboard/proposals.loader";
import { ProposalsContext } from "../../contexts/proposals.context";
import { DummyProposalListComponent } from "./dummy-proposal-list.component";
import { distributeProposals } from "../../model/proposal-column";

export const ProposalsComponent: React.FC = () => {
  const proposalsContext = useContext(ProposalsContext);
  const [proposals, setProposals] = useState(proposalsContext.query.proposals);

  useEffect(() => {
    const subscription = proposalsContext.query.loadedProposals$.subscribe(proposals => {
      setProposals(proposals);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [proposalsContext.query.loadedProposals$]);

  const split = distributeProposals(proposals);

  return (
    <ProposalsLoader>
      <DummyProposalListComponent openProposals={split.openProposals} proposals={split.proposals} />
    </ProposalsLoader>
  );
};
