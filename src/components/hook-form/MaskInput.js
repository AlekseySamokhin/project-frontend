import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const IPMaskInput = ({ ...other }) => (
  <MaskedInput
    {...other}
    // 192.168.1.1
    mask={[
      /[1-2]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[1-2]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[1-2]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[1-2]/,
      /[0-9]/,
      /[0-9]/,
    ]}
    // ensures that every subsection of the ip address is greater than 0 and lower than 256
    pipe={(value) => {
      const subips = value.split('.');
      const invalidSubips = subips.filter((ip) => {
        ip = parseInt(ip, 10);
        return ip < 0 || ip > 255;
      });
      return invalidSubips.length > 0 ? false : value;
    }}
    placeholderChar={'\u2000'}
    guide={false}
    keepCharPositions
    showMask
  />);

IPMaskInput.propTypes = {
  other: PropTypes.any,
};


// ----------------------------------------------------------------------

const TextMaskCustom = ({ ...other }) =>
  <MaskedInput
    {...other}
    mask={(rawValue) => {
      if (rawValue.charAt(0) === '-') {
        return [/-/, /[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/];
      }
      return [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/];
    }}
    placeholderChar={'\u2000'}
    keepCharPositions
    guide={false}
    showMask
  />;


TextMaskCustom.propTypes = {
  other: PropTypes.any,
};


export { IPMaskInput, TextMaskCustom };
