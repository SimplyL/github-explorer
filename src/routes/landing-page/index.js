import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from '../../components/text-input';

class LandingPage extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    return (
      <TextInput placeholder="Search..." />
    );
  }
}

export default LandingPage;
