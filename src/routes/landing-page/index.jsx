import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { PATH_REPOSITORY } from '../../constants/paths';
import { get } from '../../util/fetch';
import REPOSITORY_API_URL from '../../constants/api';
import {
  constructUrl,
  getContributorCount,
  getStargazerStatus,
} from '../../util/helpers';
import TextInput from '../../components/text-input/text-input.styles';
import Loader from '../../components/loader/loader.styles';
import ItemList from '../../components/item-list';
import EmptyView from '../../components/empty-view';
import SearchContainer from './landing-page.styles';

class LandingPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      isLoaded: true,
    };
  }

  fetchAdditionalDetails = async (item) => {
    const contributors_count = await getContributorCount(item.contributors_url);
    const [owner, repo] = item.full_name.split('/');
    const isStarred = await getStargazerStatus({ owner, repo });
    return {
      ...item,
      contributors_count,
      isStarred,
    };
  }

  fetchRepos = async (query) => {
    this.setState({ isLoaded: false });
    const url = constructUrl(REPOSITORY_API_URL, query);
    const repositories = await get(url);
    const items = repositories.items.map(await this.fetchAdditionalDetails);
    const updatedItems = await Promise.all(items);
    this.setState({
      repositories: updatedItems,
      isLoaded: true,
    });
  }

  debouncedSearch = debounce(
    this.fetchRepos,
    500,
  );

  handleChange = (evt) => {
    if (evt.target.value.length > 2) {
      this.debouncedSearch(evt.target.value);
    } else {
      this.setState({ repositories: [] });
    }
  }

  handleClick = (repoName) => {
    const { history } = this.props;
    history.push(`${PATH_REPOSITORY}/${repoName}`);
  };

  render() {
    const { repositories, isLoaded } = this.state;
    return (
      <>
        <SearchContainer>
          <TextInput
            placeholder="Search..."
            onChange={this.handleChange}
          />
        </SearchContainer>
        {!repositories.length && isLoaded && <EmptyView text="Search for repositories..." />}
        {!isLoaded
          ? <Loader />
          : <ItemList items={repositories} onClick={this.handleClick} />
        }
      </>
    );
  }
}

export default LandingPage;
