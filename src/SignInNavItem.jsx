/* eslint-disable func-names */
import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import withToast from './withToast.jsx';
import UserContext from './UserContext.js';

class SigninNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    const { showSuccess, showError } = this.props;
    const { onUserChange } = this.context;
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const user = firebase.auth().currentUser;
        showSuccess('Signed out');
        onUserChange(user);
        console.log(`User after logout: ${user}`);
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  render() {
    const { user } = this.context;

    if (user) {
      return <NavItem onClick={this.signOut}>Sign out</NavItem>;
    }

    return (
      <LinkContainer to='/login'>
        <NavItem>Sign In</NavItem>
      </LinkContainer>
    );
  }
}

SigninNavItem.contextType = UserContext;
export default withToast(SigninNavItem);
