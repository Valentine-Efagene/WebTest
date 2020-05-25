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
    const { contact, deleteContact, index } = this.props;
    const user = this.context;
    const disabled = !user;

    const editTooltip = (
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
      deleteContact(index);
    }

    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.personalNumber}</td>
        <td>{contact.businessNumber}</td>
        <td>{contact.email}</td>
        <td>{contact.address}</td>
        <td>{contact.birthday}</td>
        <td>
          <LinkContainer to={`/edit/${contact.id}`}>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button bsSize='xsmall'>
                <Glyphicon glyph='edit' />
              </Button>
            </OverlayTrigger>
          </LinkContainer>{' '}
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
            <Button disabled={disabled} bsSize='xsmall' onClick={onDelete}>
              <Glyphicon glyph='trash' />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}

ContactRowPlain.contextType = UserContext;
const ContactRow = withRouter(ContactRowPlain);
delete ContactRow.contextType;

export default function ContactTable({ contacts, deleteContact }) {
  const contactRows = contacts.map((contact, index) => (
    <ContactRow
      key={contact.id}
      contact={contact}
      deleteContact={deleteContact}
      index={index}
    />
  ));

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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{contactRows}</tbody>
    </Table>
  );
}
