import React from 'react';
import { Panel } from 'react-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

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
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let contact = doc.data();
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
  async deleteContact(index) {
    console.log(index);
    //
  }

  render() {
    const { contacts } = this.state;
    if (contacts == null) return null;

    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ContactFilter />
          </Panel.Body>
        </Panel>
        <ContactTable
          contacts={contacts}
          closeContact={this.closeContact}
          deleteContact={this.deleteContact}
        />
      </React.Fragment>
    );
  }
}

const ContactListWithToast = withToast(ContactList);
ContactListWithToast.getContacts = ContactList.getContacts;
export default ContactListWithToast;
