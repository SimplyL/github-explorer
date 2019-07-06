import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { get } from '../../util/fetch';
import REPOSITORY_API_URL from '../../constants/api';
import constructUrl from '../../util/helpers';
import TextInput from '../../components/text-input';
import Loader from '../../components/loader/loader.styles';
import ItemList from '../../components/item-list';

class LandingPage extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // }

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      isLoaded: true,
    };
  }

  fetchRepos = async (value) => {
    const url = constructUrl(REPOSITORY_API_URL, value);
    const result = await get(url);
    this.setState({
      repositories: result.items,
      isLoaded: true,
    });
  }

  // eslint-disable-next-line react/sort-comp
  debouncedSearch = debounce(
    this.fetchRepos,
    300,
  );

  handleChange = (evt) => {
    if (evt.target.value.length > 2) {
      this.setState({ isLoaded: false });
      this.debouncedSearch(evt.target.value);
    } else {
      this.setState({ repositories: [] });
    }
  }

  render() {
    const { repositories, isLoaded } = this.state;
    return (
      <>
        <TextInput
          placeholder="Search..."
          onChange={this.handleChange}
        />
        {!isLoaded
          ? <Loader />
          : <ItemList items={repositories} />
        }
      </>
    );
  }
}

export default LandingPage;
