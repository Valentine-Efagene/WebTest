/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
import React, { Component } from 'react';
import {
  Col,
  Panel,
  Form,
  FormGroup,
  Image,
  FormControl,
  Button,
  Glyphicon,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import img from './assets/images/home.png';
import './assets/css/styles.css';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      user: null,
      loading: false,
      noAccount: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stoptLoading() {
    this.setState({ loading: false });
  }

  async signOut() {
    const { showSuccess, showError } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    await firebase
      .auth()
      .signOut()
      .then(() => {
        const user = firebase.auth().currentUser;
        showSuccess('Signed out');
        onUserChange(user);
        this.setState({ user });
        this.stoptLoading();
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  async signUpWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        showSuccess(`Signed up as ${user.email}`);
        onUserChange(user);
        this.setState({ user });
      })
      .catch(function (error) {
        if (error.code === 'auth/weak-password') {
          showError('The password is too weak.');
        } else {
          showError(error.message);
        }
      })
      .finally(() => {
        this.setState({ noAccount: false });
        this.stopLoading();
      });
  }

  async signInWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        showSuccess(`Signed in as ${user.email}`);
        onUserChange(user);
        this.setState({ user });
      })
      .catch(function (error) {
        if (error.code === 'auth/wrong-password') {
          showError('Wrong password.');
        } else {
          showError(error.message);
        }
      })
      .finally(() => {
        this.stoptLoading();
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, noAccount } = this.state;

    if (
      user.password === undefined ||
      user.email === undefined ||
      user.password === '' ||
      user.email === ''
    ) {
      this.showValidation();
    } else {
      this.dismissValidation();

      if (noAccount) {
        this.signUpWithEmail(user.email, user.password);
      } else {
        this.signInWithEmail(user.email, user.password);
      }
    }
  }

  render() {
    const { showingValidation, loading, noAccount } = this.state;
    const { user } = this.context;
    let spinner = null;

    if (loading) {
      spinner = <Spinner size={50} />;
    }

    let validationMessage;
    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle='danger' onDismiss={this.dismissValidation}>
          All fields must be filled
        </Alert>
      );
    }

    let btn = (
      <Button disabled={false} bsStyle='primary' type='submit'>
        Sign in <Glyphicon glyph='log-in' />
      </Button>
    );

    if (user) {
      btn = (
        <Button disabled={false} bsStyle='primary' onClick={this.signOut}>
          Sign out <Glyphicon glyph='log-out' />
        </Button>
      );
    }

    if (noAccount) {
      btn = (
        <Button disabled={false} bsStyle='primary' onClick={this.handleSubmit}>
          Sign up <Glyphicon glyph='user' />
        </Button>
      );
    }

    return (
      <Col smOffset={3} sm={6}>
        <Panel>
          <Panel.Heading>
            <Panel.Title className='text-center'>
              Firebase Email Login
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <Button
                    variant='light'
                    style={{
                      border: 'none',
                    }}
                    disabled={user !== null}
                    onClick={() => {
                      this.setState({ noAccount: true });
                    }}
                  >
                    Want to create an account?
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <FormControl
                    type='email'
                    placeholder='Email'
                    name='email'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <FormControl
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <ButtonToolbar>{btn}</ButtonToolbar>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={8}>
                  {validationMessage}
                </Col>
              </FormGroup>
            </Form>
            {spinner}
          </Panel.Body>
          <Panel.Footer>
            <Image className='footer-image' src={img} />
          </Panel.Footer>
        </Panel>
      </Col>
    );
  }
}

LogIn.contextType = UserContext;
const LoginWithToast = withToast(LogIn);
export default LoginWithToast;
