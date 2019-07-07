import React from 'react';
import PropTypes from 'prop-types';

import { Container, Icon } from './empty-view.styles';

const EmptyView = ({ text }) => (
  <Container>
    <Icon />
    {text}
  </Container>
);

EmptyView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyView;
