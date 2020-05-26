/* eslint-disable react/jsx-one-expression-per-line */
/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
} from 'react-bootstrap';

class ContactFilter extends React.Component {
  constructor() {
    super();
    this.state = { changed: false };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ name: e.target.value, changed: true });
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <Row>
          <Col xs={10} sm={8} md={8} lg={6}>
            <FormGroup>
              <FormControl
                type='text'
                placeholder='Not yet implemented'
                value={name}
                onChange={this.onChangeStatus}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ContactFilter);
