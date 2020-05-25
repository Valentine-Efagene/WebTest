/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import UserContext from './UserContext.js';

export default class TestLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.context;
    let email = '';
    if (user) {
      email = user.email;
    }

    return (
      <>
        <div className='text-center'>
          <h3>{email}</h3>
        </div>
      </>
    );
  }
}

TestLogin.contextType = UserContext;
