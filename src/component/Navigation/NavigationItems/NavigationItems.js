import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* <NavigationItem link="/selectbox">selectbox</NavigationItem> */}
    {!props.isAuthenticated ? (
      <NavigationItem link="/login">Login</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
    <h4 style={{ color: 'white'}}>{props.email}</h4>
  </ul>
);

export default navigationItems;
