import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { PATH_REPOSITORY } from '../../constants/paths';
import { get } from '../../util/fetch';
import REPOSITORY_API_URL from '../../constants/api';
import { constructUrl, getContributorCount } from '../../util/helpers';
import TextInput from '../../components/text-input';
import Loader from '../../components/loader/loader.styles';
import ItemList from '../../components/item-list';

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

  getCommitCount = async () => {
    const fullUrl = constructUrl({
      host: 'https://api.github.com/search/commits',
      query: '+created:>=2019-01-01',
    }, 'facebook/flow');
    const result = await get(fullUrl, {
      headers: {
        Accept: 'application/vnd.github.cloak-preview',
      },
    });
    console.log(result);
  };

  addContributorCount = async (item) => {
    const contributors_count = await getContributorCount(item.contributors_url);
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

  handleClick = (repoName) => {
    const { history } = this.props;
    history.push(`${PATH_REPOSITORY}/${repoName}`);
  };


  render() {
    const { repositories, isLoaded } = this.state;
    console.log(this.getCommitCount());
    return (
      <>
        <TextInput
          placeholder="Search..."
          onChange={this.handleChange}
        />
        {!isLoaded
          ? <Loader />
          : <ItemList items={repositories} onClick={this.handleClick} />
        }
      </>
    );
  }
}

export default LandingPage;
