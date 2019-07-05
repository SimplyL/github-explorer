import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './text-input.styles';

const TextInput = ({ onChange, ...props }) => (
  <Input
    onChange={onChange}
    {...props}
  />
);

TextInput.prototypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
