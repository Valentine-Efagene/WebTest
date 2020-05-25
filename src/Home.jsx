/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Row, Image } from 'react-bootstrap';
import UserContext from './UserContext.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { test } = this.context;
    return (
      <>
        <div className='text-center'>
          <h3>Firebase Template {test}</h3>
          <Row>
            <Image src='./assets/images/home.png' fluid='true' />
          </Row>
        </div>
      </>
    );
  }
}

Home.contextType = UserContext;
