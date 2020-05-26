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
  Alert,
  Glyphicon,
  Image,
} from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import Spinner from './Spinner.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import PhoneNumberInput from './PhoneNumberInput.jsx';
import img from './assets/images/home.png';
import './assets/css/styles.css';

class ContactUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingValidation: false,
      contact: {
        name: '',
        personalNumber: '',
        businessNumber: '',
        address: '',
        email: '',
        birthday: '',
      },
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
  }

  async componentDidMount() {
    this.loadData();
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [name]: value },
    }));
  }

  loadData() {
    const { showError } = this.props;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const firestore = firebase.firestore();
    const contactRef = firestore.collection('contacts').doc(id);
    this.startLoading();
    contactRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          showError('No such document!');
        } else {
          this.setState({ contact: doc.data() });
        }
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        this.stopLoading();
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

  stopLoading() {
    this.setState({ loading: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { showSuccess, showError } = this.props;
    const { contact } = this.state;
    if (contact.name === null) {
      this.showValidation();
      return;
    }

    if (contact.name.trim() === '') {
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

    const {
      match: {
        params: { id },
      },
    } = this.props;

    const firestore = firebase.firestore();
    const docRef = firestore.collection('contacts').doc(id);
    this.startLoading();
    await docRef
      .update({
        name: name || '',
        personalNumber: personalNumber || '',
        businessNumber: businessNumber || '',
        address: address || '',
        email: email || '',
        birthday: birthday || '',
      })
      .then(() => {
        showSuccess('Updated');
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        this.stopLoading();
      });
  }

  render() {
    const { showingValidation, loading, contact } = this.state;
    let validationMessage = '';

    let spinner = null;
    if (loading) {
      spinner = <Spinner size={50} />;
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
            <Panel.Title className='text-center'>Create Contact</Panel.Title>
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
                    value={contact.name || ''}
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
                    name='personalNumber'
                    placeholder='Personal Number'
                    componentClass={PhoneNumberInput}
                    onChange={this.onChange}
                    value={contact.personalNumber || ''}
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
                    value={contact.businessNumber || ''}
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
                    value={contact.email || ''}
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
                    placeholder='Updateress'
                    type='text'
                    onChange={this.onChange}
                    value={contact.address || ''}
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
                    value={contact.birthday || ''}
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
                      Update
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

ContactUpdate.contextType = UserContext;
const ContactUpdateWithToast = withToast(ContactUpdate);
export default ContactUpdateWithToast;
