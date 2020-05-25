/* eslint-disable func-names */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem,
  Modal,
  Col,
  Alert,
  Form,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

import withToast from './withToast.jsx';

class LogInNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: true,
      showingValidation: false,
      user: null,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  async signUpWithEmail(email, password) {
    const { showError, showSuccess } = this.props;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        showSuccess('Signed up successfuly ');
      })
      .catch(function (error) {
        if (error.code === 'auth/weak-password') {
          showError('The password is too weak.');
        } else {
          alert(error.message);
        }
      });

    if (firebase.auth().currentUser) {
      showSuccess('Successfully signed up');
    }
  }

  async signOut() {
    const { showSuccess, showError, onUserChange } = this.props;
    firebase
      .auth()
      .signOut()
      .then((user) => {
        showSuccess('Signed out');
        onUserChange(user);
        this.setState({ user: null });
      })
      .catch((error) => {
        showError(error);
      });
  }

  signInWithEmail(email, password) {
    const { showError, showSuccess, onUserChange } = this.props;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        showSuccess(`Signed in as ${user}`);
        onUserChange(user);
        this.setState({ user });
        this.checkUser();
      })
      .catch(function (error) {
        // Handle Errors here.
        if (error.code === 'auth/wrong-password') {
          showError('Wrong password.');
        } else {
          showError('Unknown error');
        }
      });
  }

  checkUser() {
    const { showSuccess, showError } = this.props;

    if (firebase.auth().currentUser) {
      showSuccess(`Signed in with ${firebase.auth().currentUser.email}`);
    } else {
      showError('Nobody is logged in');
    }
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
    const { user, showing, showingValidation } = this.state;
    let validationMessage;

    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle='danger' onDismiss={this.dismissValidation}>
          All fields must be filled
        </Alert>
      );
    }

    if (user) {
      return <NavItem onClick={this.signOut}>Sign out</NavItem>;
    }

    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>Sign in</NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  </ButtonToolbar>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={8}>
                  {validationMessage}
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type='button'
                bsStyle='primary'
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle='link' onClick={this.hideModal}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withToast(withRouter(LogInNavItem));
