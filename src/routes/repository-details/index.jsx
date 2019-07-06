import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GITHUB_API, GITHUB_REPOS_PATH } from '../../constants/api';
import { get } from '../../util/fetch';
import { constructUrl, getContributorCount } from '../../util/helpers';
import Item from '../../components/item-list/item';
import Chart from '../../components/chart';

class RepositoryDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      repository: null,
      effectiveHours: null,
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

    const effectiveHours = this.getWeeklyEffectiveHours(
      contributors_count,
      repository.open_issues_count,
      activityData.all,
    );

    console.log('Contributors:', contributors_count);
    console.log('Issues: ', repository.open_issues_count);

    this.setState({
      repository: {
        ...repository,
        contributors_count,
      },
      effectiveHours,
    });
  }

  getRepository = async (params) => {
    const url = constructUrl({
      host: GITHUB_API,
      pathname: `${GITHUB_REPOS_PATH}/${params.owner}/${params.repo}`,
      query: '',
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

  getWeeklyEffectiveHours = (contributors, issues, activity) => activity.map((commits, index) => {
    const hours = Math.round(commits * contributors / (issues || 1));
    return {
      name: index + 1,
      value: {
        hours,
        commits,
      },
    };
  })

  render() {
    const { repository, effectiveHours } = this.state;

    return (
      <div>
        {repository && <Item item={repository} />}
        {effectiveHours && <Chart data={effectiveHours} label="Effective hours spent per year" />}
      </div>
    );
  }
}

export default RepositoryDetails;
