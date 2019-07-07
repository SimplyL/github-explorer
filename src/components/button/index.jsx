import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './button.styles';

const Button = ({ onClick, text, isPrimary }) => (
  <StyledButton
    type="button"
    onClick={onClick}
    isPrimary={isPrimary}
  >
    {text}
  </StyledButton>
);

Button.defaultProps = {
  isPrimary: true,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
};

export default Button;
