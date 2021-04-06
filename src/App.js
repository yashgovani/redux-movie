import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Auth from './container/Auth/Auth';
import SelectBox from './container/SelectBox/SelectBox';
import Logout from './container/Auth/Logout/Logout';
import Layout from './container/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Login" exact component={Auth} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login" exact component={Auth} />
          <Route path="/selectbox" component={SelectBox} />
          <Route path="/logout" component={Logout} />
          <Redirect from="/" to="/login" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
