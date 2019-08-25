import React from "react";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import * as daos from "../backbone/daos";

interface DispatchProps {
    loadProposals: () => void
}

export class ProposalLoader extends React.Component<DispatchProps> {
    componentDidMount(): void {
      this.props.loadProposals()
    }

    render () {
        return this.props.children
    }
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
      loadProposals: () => {
        return dispatch(daos.loadProposals.action())
      }
    }
}

export default connect(null, dispatchToProps)(ProposalLoader);
