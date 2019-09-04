import React from "react";
import { State } from "../../redux/redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

interface Props {
  isRead: boolean;
}

interface DispatchProps {
  readSettings: () => void
}

class SettingsLoader extends React.Component<Props & DispatchProps> {
  componentDidMount(): void {
    this.props.readSettings()
  }

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
      console.log('readSettings')
    }
  }
}

export default connect(stateToProps)(SettingsLoader);
