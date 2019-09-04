import React from "react";
import { State } from "../../redux/redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

interface Props {
  isRead: boolean;
}

class SettingsLoader extends React.Component<Props> {
  render() {
    if (this.props.isRead) {
      return this.props.children;
    } else {
      return "ENABLING 3box";
    }
  }
}

function stateToProps(state: State): Props {
  return {
    isRead: state.settings.isRead
  };
}

function dispatchToProps(dispatch: ThunkDispatch<State, any, any>) {
  return {
    readSettings: () => {

    }
  }
}

export default connect(stateToProps)(SettingsLoader);
