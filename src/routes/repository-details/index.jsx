import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GITHUB_API, GITHUB_REPOS_PATH } from '../../constants/api';
import { get } from '../../util/fetch';
import { constructUrl, getContributorCount } from '../../util/helpers';
import Item from '../../components/item-list/item';

class RepositoryDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      repository: null,
      activityData: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params,
      },
    } = this.props;
    const repository = await this.getRepository(params);
    const contributors_count = await getContributorCount(repository.contributors_url);
    const activityData = await this.getActivityData(params);

    this.setState({
      repository: {
        ...repository,
        contributors_count,
      },
      activityData,
    });
  }

  getRepository = async (params) => {
    const url = constructUrl({
      host: GITHUB_API,
      pathname: `${GITHUB_REPOS_PATH}/${params.owner}/${params.repo}`,
    });
    const result = await get(url);
    return result;
  }

  getActivityData = async (params) => {
    const url = constructUrl({
      host: GITHUB_API,
      pathname: `${GITHUB_REPOS_PATH}/${params.owner}/${params.repo}/stats/participation`,
    });
    const result = await get(url);
    return result;
  }

  render() {
    const { repository, activityData } = this.state;

    return (
      <div>
        {repository
          && <Item item={repository} />
        }
        {activityData && <div>chart</div>}
      </div>
    );
  }
}

export default RepositoryDetails;
