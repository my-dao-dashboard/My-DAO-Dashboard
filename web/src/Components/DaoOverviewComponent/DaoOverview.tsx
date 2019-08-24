import React from "react";
import { connect } from "react-redux";
import { DaoInstanceState, State } from "../../backbone/State";

interface StateProps {
  dao: DaoInstanceState;
}

export class DaoOverview extends React.Component<StateProps> {
  public render() {
    return (
      <div>
        <h2>Participating DAO's</h2>
      </div>
    );
  }
}

function stateToProps(state: State): StateProps {
  return {
    dao: state.daos.dao!
  };
}

export default connect(stateToProps)(DaoOverview);
