import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getToken } from './utils/localStorage';
import { logout } from './actions/userAction';
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";


class App extends Component {
  constructor(props) {
    super(props);
    const { history } = props;
    if (!getToken()) {
      history.replace('/login');
    }

  }

  handleLogout() {
    const {
      // eslint-disable-next-line react/prop-types
      logoutA,
      history
    } = this.props;
    logoutA();
    history.replace('/login');
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }


  render() {
    const {activeClient, activeSteps} = this.props;
    if (!activeClient) {
      return <div style={{width: 'calc(100% - 357px)',
        backgroundColor: '#EDEFF3'}}/>
    }
    switch (activeSteps) {
      case 1:
        return (
            <Step1/>
        );
      case 2:
        return (
            <Step2/>
        )
      default:
        return <div style={{width: 'calc(100% - 357px)',
          backgroundColor: '#EDEFF3'}}/>
    }
  }
}

export default connect(
    state => ({activeClient: state.work.activeClient, activeSteps: state.work.activeSteps}),
    { logoutA: logout }
)(App);
