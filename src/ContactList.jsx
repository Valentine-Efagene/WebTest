import React from 'react';
import { Panel } from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import UserContext from './UserContext.js';
import ContactFilter from './ContactFilter.jsx';
import ContactTable from './ContactTable.jsx';
import withToast from './withToast.jsx';

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: null,
    };

    this.deleteContact = this.deleteContact.bind(this);
  }

  async componentDidMount() {
    this.loadData();
  }

  static async getContacts() {
    const contacts = [];
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
        });
      });
    return contacts;
  }

  async loadData() {
    const contacts = await ContactList.getContacts();
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  async deleteContact(id) {
    const { showSuccess, showError } = this.props;
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
      });
  }

  render() {
    const { contacts } = this.state;
    let contactTable = '';
    if (contacts == null) {
      contactTable = '';
    } else {
      contactTable = (
        <ContactTable contacts={contacts} deleteContact={this.deleteContact} />
      );
    }

    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Search</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ContactFilter />
          </Panel.Body>
        </Panel>
        {contactTable}
      </React.Fragment>
    );
  }
}

ContactList.contextType = UserContext;
const ContactListWithToast = withToast(ContactList);
ContactListWithToast.getContacts = ContactList.getContacts;
export default ContactListWithToast;
