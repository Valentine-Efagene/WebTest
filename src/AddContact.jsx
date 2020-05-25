/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Col,
  Panel,
  FormControl,
  FormGroup,
  Form,
  Button,
  ButtonToolbar,
  ControlLabel,
  ProgressBar,
  Alert,
  Glyphicon,
  Image,
} from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import PhoneNumberInput from './PhoneNumberInput.jsx';

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      contact: null,
      loading: false,
      myData: null,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
  }

  onChange(event) {
    console.log(`Onchange ${event.target.name}, ${event.target.value}`);
    const { name, value } = event.target;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [name]: value },
    }));

    const { contact } = this.state;

    if (!contact) {
      return;
    }

    if (contact.name !== null || contact.name !== '') {
      this.dismissValidation();
    }
  }

  async getRealTimeUpdate() {
    const { contact } = this.state;
    const firestore = firebase.firestore();
    const docRef = firestore.collection('contacts').doc(contact.name);
    await docRef.onSnapshot((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        this.setState({ myData });
      }
    });
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

  async handleSubmit(event) {
    event.preventDefault();
    const { showSuccess, showError } = this.props;
    const { contact } = this.state;
    console.log(`handleSubmit Contact name: ${contact.name}`);

    if (contact.name === null || contact.name === '') {
      this.showValidation();
      return;
    }

    this.dismissValidation();
    const {
      name,
      personalNumber,
      businessNumber,
      address,
      email,
      birthday,
    } = contact;

    // const docRef = firestore.collection('contacts');
    // await docRef.add(contact);

    const firestore = firebase.firestore();
    const docRef = firestore.collection('contacts').doc(name);

    await docRef
      .set({
        name: name || '',
        personalNumber: personalNumber || '',
        businessNumber: businessNumber || '',
        address: address || '',
        email: email || '',
        birthday: birthday || '',
      })
      .then(() => {
        showSuccess('Contact created');
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  render() {
    const { showingValidation, loading } = this.state;
    let progress;
    let validationMessage = '';
    const { myData } = this.state;
    let result = '';

    if (myData) {
      result = myData.name;
    }

    if (loading) {
      progress = <ProgressBar animated variant='success' now={45} />;
    }
    const { user } = this.context;
    let email = '';
    if (user) {
      email = user.email;
    }

    if (showingValidation) {
      validationMessage = (
        <Alert bsStyle='danger' onDismiss={this.dismissValidation}>
          Enter a name at least
        </Alert>
      );
    } else {
      validationMessage = '';
    }

    return (
      <Col smOffset={3} sm={6}>
        <Panel>
          <Panel.Heading>
            <Panel.Title className='text-center'>
              Create Contact {email} {result}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='user' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    type='text'
                    placeholder='Name'
                    name='name'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='phone' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name='personalMumber'
                    placeholder='Personal Number'
                    componentClass={PhoneNumberInput}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='phone-alt' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name='businessNumber'
                    placeholder='Business Number'
                    componentClass={PhoneNumberInput}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='envelope' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name='email'
                    placeholder='Email'
                    type='text'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='home' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name='address'
                    placeholder='Address'
                    type='text'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={1}>
                  <ControlLabel>
                    <Glyphicon glyph='calendar' />
                  </ControlLabel>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name='birthday'
                    placeholder='Birthday'
                    type='date'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={3} sm={6}>
                  <ButtonToolbar>
                    <Button
                      disabled={false}
                      onClick={this.handleSubmit}
                      bsStyle='primary'
                      type='submit'
                    >
                      Create
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

AddContact.contextType = UserContext;
const AddContactWithToast = withToast(AddContact);
export default AddContactWithToast;
