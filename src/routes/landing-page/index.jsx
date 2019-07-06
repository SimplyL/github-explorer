import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { get, getLinkHeaders } from '../../util/fetch';
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

  getContributorCount = async (url) => {
    const fullUrl = constructUrl({
      host: url,
      query: 'anon=true&per_page=1',
    });
    const result = await getLinkHeaders(fullUrl);
    return result ? result.last.page : 0;
  }

  addContributorCount = async (item) => {
    const contributors_count = await this.getContributorCount(item.contributors_url);
    return {
      ...item,
      contributors_count,
    };
  }

  fetchRepos = async (value) => {
    const url = constructUrl(REPOSITORY_API_URL, value);
    const result = await get(url);
    const items = result.items.map(await this.addContributorCount);
    const updatedItems = await Promise.all(items);
    this.setState({
      repositories: updatedItems,
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
