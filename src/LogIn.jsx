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
  // Spinner,
  ProgressBar,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';

import withToast from './withToast.jsx';
import UserContext from './UserContext.js';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      user: null,
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const { test } = this.context;
    this.setState({ test });
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
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const user = firebase.auth().currentUser;
        showSuccess('Signed out');
        onUserChange(user);
        this.setState({ user });
        this.stoptLoading();
        console.log(`User after logout: ${user}`);
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  async signUpWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = firebase.auth().currentUser;
        showSuccess(`Signed in as ${user.email}`);
        onUserChange(user);
        this.setState({ user });
        this.stoptLoading();
      })
      .catch(function (error) {
        if (error.code === 'auth/weak-password') {
          showError('The password is too weak.');
        } else {
          alert(error.message);
        }
      });
  }

  async signInWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const user = firebase.auth().currentUser;
        showSuccess(`Signed in as ${user.email}`);
        onUserChange(user);
        this.setState({ user });
        this.stoptLoading();
        console.log(`User after sign in: ${user}`);
      })
      .catch(function (error) {
        // Handle Errors here.
        if (error.code === 'auth/wrong-password') {
          showError('Wrong password.');
        } else {
          showError('Unknown error');
          console.log('Unknown error');
          console.log(error);
        }
      });
  }

  async checkUser() {
    const { showSuccess, showError } = this.props;
    const { onUserChange } = this.context;
    this.startLoading();
    const user = await firebase.auth().currentUser;

    if (user) {
      showSuccess(`Signed in with ${user.email}`);
    } else {
      showError('Nobody is logged in');
    }

    onUserChange(user);
    this.stoptLoading();
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { showSuccess, showError } = this.props;
    const { user } = this.state;

    if (
      user.password === undefined ||
      user.email === undefined ||
      user.password === '' ||
      user.email === ''
    ) {
      this.showValidation();
    } else {
      this.dismissValidation();
      this.signInWithEmail(user.email, user.password);
    }
  }

  render() {
    const { showingValidation, loading } = this.state;
    const { test } = this.state;
    let email = '';
    let { user } = this.context;
    // let spinner;
    let progress;

    if (loading) {
      progress = <ProgressBar animated='true' variant='success' now={45} />;
    }

    if (user) {
      // eslint-disable-next-line prefer-destructuring
      email = user.email;
    }

    let validationMessage;
    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle='danger' onDismiss={this.dismissValidation}>
          All fields must be filled
        </Alert>
      );
    }

    /* if (loading) {
      spinner = (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    } */

    return (
      <Col smOffset={3} sm={6}>
        <Panel>
          <Panel.Heading>
            <Panel.Title className='text-center'>
              Firebase Email Login {email}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
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
                  <ButtonToolbar>
                    <Button disabled={false} bsStyle='primary' type='submit'>
                      Login
                    </Button>
                    <Button
                      disabled={false}
                      bsStyle='primary'
                      onClick={this.checkUser}
                    >
                      Check
                    </Button>
                    <Button
                      disabled={false}
                      bsStyle='primary'
                      onClick={this.signOut}
                    >
                      Sign Out
                    </Button>
                  </ButtonToolbar>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={8}>
                  {validationMessage}
                </Col>
              </FormGroup>
            </Form>
          </Panel.Body>
          <Panel.Footer>
            <Image className='footer-image' src='./assets/images/home.png' />
            {progress}
          </Panel.Footer>
        </Panel>
      </Col>
    );
  }
}

LogIn.contextType = UserContext;
const LoginWithToast = withToast(LogIn);
export default LoginWithToast;
