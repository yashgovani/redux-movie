import classes from './Layout.module.css';
import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Layout extends React.Component {
  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenicated} email={this.props.email} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenicated: state.token !== null,
    email: state.email,
  };
};

export default connect(mapStateToProps)(Layout);
