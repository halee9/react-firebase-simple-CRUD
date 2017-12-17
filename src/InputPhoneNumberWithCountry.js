import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputPhoneNumberWithCountry.css';

import { asYouType } from 'libphonenumber-js'
import { ReactInput, templateFormatter, templateParser, parseDigit } from 'input-format'

// const DEFAULT_TEMPLATE = 'xxx-xxx-xxxx';
const DEFAULT_TEMPLATE = 'xxxxxxxxxxxxxxx';
const DEFAULT_COUNTRY_CODE = 'US';

const countryCodes = [
  { code: 'US', name: 'United States' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' }
];

const flagsPath = 'https://lipis.github.io/flag-icon-css/flags/4x3/';

export class InputPhoneNumberWithCountry extends Component {
  state = {
    value: '',
    // ccode: DEFAULT_COUNTRY_CODE,
    ccode: '',
    formatter: {},
    template: DEFAULT_TEMPLATE
  }

  handleChangePhoneNumber = (value) => {
    const formatter = new asYouType(this.state.ccode);
    formatter.input(value);
    // country_phone_code
    this.setState({ value, formatter, template: formatter.template || DEFAULT_TEMPLATE });
    this.props.onChangeInput({ target: {name: this.props.inputName, value, type: 'input' }})
  }

  handleChangeCode = (e) => {
    this.setState({ ccode: e.target.value },() => {
        this.handleChangePhoneNumber(this.state.value);
    });
    this.focus();
  }

  focus = () => {
    this.phoneInput.focus();
  }

  render(){
    const { 
      countryName, inputName, inputClassName, withFlag, countryClassName,
      countryLabel, phoneLabel
    } = this.props;
    let container, selectContainer, selectClass;
    if (withFlag) {
      container = 'container-flex';
      selectContainer = 'select-flag-container';
      selectClass = 'select';
    }
    else {
      container = '';
      selectContainer = '';
      selectClass = countryClassName;
    }
    return (
      <div className={container}>
        <div className={selectContainer}>
          { countryLabel && 
            <div>
              <label>{countryLabel}</label>
            </div>
          }
          <select
            name={countryName}
            className={selectClass}
            value={this.state.ccode}
            onChange={this.handleChangeCode}
          >
            <option value={''}>Select</option>
            { countryCodes.map(country => (
              <option value={country.code} key={country.code}>{country.name}</option>
            ))}
          </select>
          { withFlag && 
            <div className='flag-container'>
              <img
                className='flag-image'
                src={`${flagsPath}${this.state.ccode.toLowerCase()}.svg`}
              />
              <div className='select-arrow'></div>
            </div>
          }
        </div>
        { phoneLabel && 
          <div>
            <label>{phoneLabel}</label>
          </div>
        }
        <ReactInput
          name={inputName}
          className={inputClassName}
          value={ this.state.value }
          onChange={this.handleChangePhoneNumber}
          onBlur={(e) => this.props.onBlurInput({ target: { value: e.target.value, name: inputName }})}
          format={ templateFormatter(this.state.template) }
          parse={ templateParser(this.state.template, parseDigit) }
          ref={input => this.phoneInput = input}
        />
      </div>
    )
  }
}

InputPhoneNumberWithCountry.propTypes = {
  withFlag: PropTypes.bool,
  countryName: PropTypes.string,
  inputName: PropTypes.string,
  countryClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  onChangeInput: PropTypes.func,
  onBlurInput: PropTypes.func,
};

InputPhoneNumberWithCountry.defaultProps = {
  withFlag: false
};