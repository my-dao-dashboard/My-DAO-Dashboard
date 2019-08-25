import React from "react";
import {DaoInstanceState, State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import * as daos from "../backbone/daos";

interface StateProps {
    account: string
    daos: DaoInstanceState[]
}

interface DispatchProps {
    loadProposals: () => void
}

export class ProposalLoader extends React.Component<StateProps & DispatchProps> {
    componentDidMount(): void {
      this.props.loadProposals()
    }

    render () {
        return this.props.children
    }
}


function stateToProps(state: State): StateProps {
    return {
        account: state.account.address!,
        daos: state.daos.daos!
    };
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
      loadProposals: () => {
        return dispatch(daos.loadProposals.action())
      }
    }
}

export default connect(stateToProps, dispatchToProps)(ProposalLoader);
