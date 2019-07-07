import React from 'react';
import PropTypes from 'prop-types';

import { Container, Icon } from './empty-view.styles';

function EmptyView({ text }) {
  return (
    <Container>
      <Icon />
      {text}
    </Container>
  );
}

EmptyView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyView;
