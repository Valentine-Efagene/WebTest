import React from 'react';

export default class PhoneNumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, focused: false };

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
    const { onChange: onChangeFromProps } = this.props;
    const { value: oldValue } = this.state;
    if (e.target.value.match(/^[+0-9]/) || e.target.value === '') {
      this.setState({ value: e.target.value });
    } else {
      this.setState({ value: oldValue });
    }

    if (e.target.value.match(/[a-zA-Z-`~/<?>/.!@#$%^&*()_=]/)) {
      this.setState({ value: oldValue });
    }

    onChangeFromProps(e);
  }

  render() {
    const { focused, value } = this.state;
    const { value: propsValue } = this.props;
    const { onValidityChange, ...props } = this.props;
    return (
      <input
        {...props}
        value={value || propsValue || ''}
        placeholder={focused ? '+234 / 0-0' : 'Phone Number'}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
