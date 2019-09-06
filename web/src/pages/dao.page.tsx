import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { DaosContext } from "../contexts/daos.context";
import LoaderView from "../components/layout/loader/loader.view";
import { DaoOverviewContainer } from "../components/dao/dao-overview.container";
import { ProposalsContext } from "../contexts/proposals.context";
import { zip } from "rxjs";
import { distributeProposals } from "../components/proposals/IProposalColumn";
import { DummyProposalListComponent } from "../components/proposals/dummy-proposal-list.component";

interface IProps {
  address: string;
}

export const DaoPage: React.FC<RouteComponentProps<IProps>> = props => {
  const address = props.match.params.address;

  const daosContext = useContext(DaosContext);
  const proposalsContext = useContext(ProposalsContext);
  const [state, setState] = useState({
    dao: daosContext.query.byAddress(address),
    proposals: proposalsContext.query.byDaoAddress(address)
  });

  useEffect(() => {
    const dao$ = daosContext.query.loadedByAddress$(address);
    const proposals$ = proposalsContext.query.byDaoAddress$(address);
    const subscription = zip(dao$, proposals$).subscribe(payload => {
      setState({
        dao: payload[0],
        proposals: payload[1]
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [
    address,
    daosContext.query,
    daosContext.query.loadedDaos$,
    proposalsContext.query,
    proposalsContext.query.loadedProposals$
  ]);

  if (state.dao && state.proposals) {
    const split = distributeProposals(state.proposals);
    return (
      <DaoOverviewContainer dao={state.dao}>
        <DummyProposalListComponent openProposals={split.openProposals} proposals={split.proposals} />
      </DaoOverviewContainer>
    );
  } else {
    return <LoaderView />;
  }
};
