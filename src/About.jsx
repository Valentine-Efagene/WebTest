import React from 'react';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className='text-center'>
          <h3>Firebase Template</h3>
          <h4>Version 1.0</h4>
        </div>
      </>
    );
  }
}
