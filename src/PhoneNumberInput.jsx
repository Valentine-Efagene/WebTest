import React from 'react';

export default class PhoneNumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', focused: false };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onChange(e) {
    const { value: oldValue } = this.state;
    if (e.target.value.match(/^[+0-9]/) || e.target.value === '') {
      this.setState({ value: e.target.value });
    } else {
      this.setState({ value: oldValue });
    }

    if (e.target.value.match(/[a-zA-Z-`~/<?>/.!@#$%^&*()_=]/)) {
      this.setState({ value: oldValue });
    }
  }

  render() {
    const { focused, value } = this.state;
    const { value: origValue, onValidityChange, ...props } = this.props;
    return (
      <input
        {...props}
        value={value}
        placeholder={focused ? '+234 / 0-0' : 'Phone Number'}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
