import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../redux/redux';
import * as account from '../../redux/account.redux';

interface DispatchProps {
  enable: () => Promise<void>;
}

interface OwnState {
  isProgress: boolean;
  error?: string;
}

export class LoginComponent extends React.Component<DispatchProps, OwnState> {
  state = {
    isProgress: false,
    error: undefined,
  };

  async handleClick() {
    if (!this.state.isProgress) {
      this.setState({
        isProgress: true,
      });
      try {
        await this.props.enable();
      } catch (e) {
        this.setState({
          isProgress: false,
          error: e.message,
        });
      }
    }
  }

  renderButton() {
    if (this.state.isProgress) {
      return <button disabled={true}>Waiting...</button>;
    } else {
      return <button onClick={this.handleClick.bind(this)}>Connect</button>;
    }
  }

  renderError() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <>
        <p>You are not logged in</p>
        {this.renderError()}
        {this.renderButton()}
      </>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, any, any>): DispatchProps {
  return {
    enable: async () => {
      await dispatch(account.enable.action());
    },
  };
}

export default connect(
  undefined,
  mapDispatchToProps,
)(LoginComponent);
