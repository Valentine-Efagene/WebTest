/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Row, Image } from 'react-bootstrap';
import UserContext from './UserContext.js';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import img from './assets/images/home.png';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className='text-center'>
          <h3>Firebase Template</h3>
          <Row>
            <Image src={img} fluid='true' />
          </Row>
        </div>
      </>
    );
  }
}

Home.contextType = UserContext;
