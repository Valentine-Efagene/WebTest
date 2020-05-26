/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Table,
} from 'react-bootstrap';

import UserContext from './UserContext.js';

// eslint-disable-next-line react/prefer-stateless-function
class ContactRowPlain extends React.Component {
  render() {
    const { contact, deleteContact } = this.props;
    const { user } = this.context;
    const disabled = !user;

    const updateTooltip = (
      <Tooltip id='close-tooltip' placement='top'>
        Edit Contact
      </Tooltip>
    );
    const deleteTooltip = (
      <Tooltip id='delete-tooltip' placement='top'>
        Delete Contact
      </Tooltip>
    );

    function onDelete(e) {
      e.preventDefault();
      deleteContact(contact.id);
    }

    let actions = null;
    if (user) {
      actions = (
        <td>
          <LinkContainer to={`/edit/${contact.id}`}>
            <OverlayTrigger delayShow={1000} overlay={updateTooltip}>
              <Button bsSize='xsmall'>
                <Glyphicon glyph='edit' />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
            <Button disabled={disabled} bsSize='xsmall' onClick={onDelete}>
              <Glyphicon glyph='trash' />
            </Button>
          </OverlayTrigger>
        </td>
      );
    }

    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.personalNumber}</td>
        <td>{contact.businessNumber}</td>
        <td>{contact.email}</td>
        <td>{contact.address}</td>
        <td>{contact.birthday}</td>
        {actions}
      </tr>
    );
  }
}

ContactRowPlain.contextType = UserContext;
const ContactRow = withRouter(ContactRowPlain);
delete ContactRow.contextType;

export default function ContactTable({ contacts, deleteContact, user }) {
  const contactRows = contacts.map((contact) => (
    <ContactRow
      key={contact.id}
      contact={contact}
      deleteContact={deleteContact}
    />
  ));

  let action = null;
  if (user) {
    action = <th>Action</th>;
  }

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Personal Number</th>
          <th>Business Number</th>
          <th>Email</th>
          <th>Addresss</th>
          <th>Birthday</th>
          {action}
        </tr>
      </thead>
      <tbody>{contactRows}</tbody>
    </Table>
  );
}
