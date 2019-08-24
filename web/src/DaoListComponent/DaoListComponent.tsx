import React from "react";
import { connect } from 'react-redux'
import {DaoInstanceState, State} from "../backbone/State";
import {ThunkDispatch} from "redux-thunk";
import DaoListLoader from "./DaoListLoader";
import * as account from "../backbone/account";
import {AccountComponent} from "../AccountComponent/AccountComponent";

interface StateProps {
    daos: Array<DaoInstanceState>
}

export class DaoListComponent extends React.Component<StateProps> {
    renderItem(dao: DaoInstanceState) {
        return <p key={dao.address}>{dao.address} {dao.name}</p>
    }

    render() {
        return <div>
            {this.props.daos.map(this.renderItem)}
        </div>
    }
}

function stateToProps (state: State): StateProps {
    return {
        daos: state.daos.daos!
    }
}

export default connect(stateToProps)(DaoListComponent)
