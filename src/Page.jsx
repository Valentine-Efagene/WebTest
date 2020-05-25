/* eslint-disable react/jsx-one-expression-per-line */
// import { useState } from 'react';

import React from 'react';
import {
  Navbar,
  Grid,
  Nav,
  NavItem,
  Glyphicon,
  NavDropdown,
  // Collapse, Button, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import SignInNavItem from './SignInNavItem.jsx';
import Contents from './Contents.jsx';
import UserContext from './UserContext.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAQZch2fOfKBsdaWpL3KZ_kNFBS_Akn57s',
  // apiKey: window.apiKey,
  authDomain: 'fir-ch2-5cbdb.firebaseapp.com',
  databaseURL: 'https://fir-ch2-5cbdb.firebaseio.com',
  projectId: 'fir-ch2-5cbdb',
  storageBucket: 'fir-ch2-5cbdb.appspot.com',
  // messagingSenderId: window.messagingSenderId,
  messagingSenderId: '',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.onUserChange(user);
      this.setState({ user });
      // eslint-disable-next-line no-unused-expressions
      if (user) {
        console.log(`Page User: ${user}`);
        // alert(`${user.email}`);
      } else {
        // alert('Logged out');
      }
    });
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <UserContext.Provider
          value={{ test: 'worked', user, onUserChange: this.onUserChange }}
        >
          <NavBar />
          <Grid fluid>
            <Contents />
          </Grid>
        </UserContext.Provider>
        <Footer />
      </div>
    );
  }
}

function Footer() {
  return (
    <small>
      <hr />
      <p className='text-center'>
        Full source code available at this{' '}
        <a href='https://github.com/Valentine-Efagene/MERN'>
          Github repository
        </a>
      </p>
    </small>
  );
}

function NavBar() {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkContainer to='/home'>
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to='/contacts'>
            <NavItem>Contacts</NavItem>
          </LinkContainer>
          <LinkContainer to='/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
          <LinkContainer to='/addcontact'>
            <NavItem>Add Contact</NavItem>
          </LinkContainer>
          <LinkContainer to='/testlogin'>
            <NavItem>TestLogIn</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown
            id='user-dropdown'
            title={<Glyphicon glyph='option-vertical' />}
            noCaret
          >
            <SignInNavItem />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

/* function CollapseButton() {
  const [open, setOpen] = useState(false);
  const drawerTooltip = (
    <Tooltip id='drawer-tooltip' placement='top'>
      Drawer
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger delayShow={1000} overlay={drawerTooltip}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls='example-collapse-text'
          aria-expanded={open}
        >
          <Glyphicon glyph='glyphicon glyphicon-align-justify' />
        </Button>
      </OverlayTrigger>
      <Collapse in={open}>
        <NavBar />
      </Collapse>
    </>
  );
}
*/
