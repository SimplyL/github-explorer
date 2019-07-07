import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './button.styles';

const Button = ({ onClick, label, isPrimary }) => (
  <StyledButton
    type="button"
    onClick={onClick}
    isPrimary={isPrimary}
  >
    {label}
  </StyledButton>
);

Button.defaultProps = {
  isPrimary: true,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
};

export default Button;
