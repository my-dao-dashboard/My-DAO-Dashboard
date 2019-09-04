import React from "react";
import { connect } from "react-redux";
import { State } from "../redux/redux";

interface Props {
  isRead: boolean;
}

class SettingsPage extends React.Component<Props> {
  render() {
    if (this.props.isRead) {
      return this.props.children;
    } else {
      return "Loading 3Box...";
    }
  }
}

function stateToProps(state: State): Props {
  return {
    isRead: state.settings.isRead
  };
}

export default connect(stateToProps)(SettingsPage);
