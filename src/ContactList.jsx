import React from 'react';
import { Panel } from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import Spinner from './Spinner.jsx';
import UserContext from './UserContext.js';
import ContactFilter from './ContactFilter.jsx';
import ContactTable from './ContactTable.jsx';
import withToast from './withToast.jsx';

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: null,
      admins: null,
      name: '',
      loading: false,
    };

    this.deleteContact = this.deleteContact.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    this.loadData();
    this.loadAdmins();
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  async getContacts() {
    const contacts = [];
    const { showError } = this.props;

    this.startLoading();
    await firebase
      .firestore()
      .collection('contacts')
      .orderBy('name')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const contact = doc.data();
          contact.id = doc.id;
          contacts.push(contact);
          this.stopLoading();
        });
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        this.stopLoading();
      });

    return contacts;
  }

  async loadAdmins() {
    const { showError } = this.props;

    this.startLoading();
    await firebase
      .firestore()
      .collection('admins')
      .doc('admins')
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ admins: doc.data().admins });
        } else {
          showError('Could not obtain admins');
        }
        this.stopLoading();
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        this.stopLoading();
      });
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stopLoading() {
    this.setState({ loading: false });
  }

  async loadData() {
    const contacts = await this.getContacts();
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  async deleteContact(id) {
    const { showSuccess, showError } = this.props;
    this.startLoading();
    await firebase
      .firestore()
      .collection('contacts')
      .doc(id)
      .delete()
      .then(() => {
        showSuccess('Deleted');
        this.loadData();
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        this.stopLoading();
      });
  }

  render() {
    const { contacts, admins, name, loading } = this.state;
    let filteredContacts = contacts;
    const { user } = this.context;

    if (name !== '' && contacts) {
      filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    let spinner = null;
    if (loading) {
      spinner = <Spinner size={50} />;
    }

    let contactTable = '';
    if (contacts == null) {
      contactTable = '';
    } else {
      contactTable = (
        <ContactTable
          user={user}
          admins={admins || []}
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      );
    }

    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Search</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ContactFilter onChange={this.onChange} />
          </Panel.Body>
        </Panel>
        {spinner}
        {contactTable}
      </React.Fragment>
    );
  }
}

ContactList.contextType = UserContext;
const ContactListWithToast = withToast(ContactList);
export default ContactListWithToast;
