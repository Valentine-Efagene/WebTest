/* eslint-disable react/jsx-one-expression-per-line */
/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap';

class ContactFilter extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onChange } = this.props;

    return (
      <div>
        <Row>
          <Col xs={10} sm={8} md={8} lg={6}>
            <FormGroup>
              <FormControl
                type='text'
                placeholder='Enter full name'
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ContactFilter);
