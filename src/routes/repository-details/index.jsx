import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  GITHUB_REPOS_PATH,
  GITHUB_STARRING_PATH,
} from '../../constants/api';
import { get, put, del } from '../../util/fetch';
import { constructUrl, getContributorCount, getStargazerStatus } from '../../util/helpers';
import Item from '../../components/item-list/item';
import Chart from '../../components/chart';
import Button from '../../components/button';
import Loader from '../../components/loader/loader.styles';
import { HeaderContainer, AnchorLink } from './repository-details.styles';

const requestHeaders = { headers: { 'Content-Length': '0' } };

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
    const isStarred = await getStargazerStatus(params);

    const effectiveHours = this.calculateEffectiveHours(
      contributors_count,
      repository.open_issues_count,
      activityData.all,
    );
    const totalHours = this.calculateTotalHours(effectiveHours);

    this.setState({
      repository: {
        ...repository,
        contributors_count,
        isStarred,
        totalHours,
      },
      effectiveHours,
    });
  }

  getRepository = async (params) => {
    const url = constructUrl({
      pathname: `${GITHUB_REPOS_PATH}/${params.owner}/${params.repo}`,
    });
    const result = await get(url);
    return result;
  }

  getActivityData = async (params) => {
    const url = constructUrl({
      pathname: `${GITHUB_REPOS_PATH}/${params.owner}/${params.repo}/stats/participation`,
    });
    const result = await get(url);
    return result;
  }

  calculateTotalHours = effectiveHours => effectiveHours.reduce((accumulator, current) => (
    accumulator + current.value.hours
  ), 0);

  calculateEffectiveHours = (contributors, issues, activity) => activity.map((commits, index) => {
    const hours = Math.round(commits * contributors / (issues || 1));
    return {
      name: index + 1,
      value: {
        hours,
        commits,
      },
    };
  })

  starRepository = async (url) => {
    const response = await put(url, requestHeaders);
    return response !== 404;
  }

  unstarRepository = async (url) => {
    const response = await del(url, requestHeaders);
    return response === 404;
  }

  handleClick = async () => {
    const {
      match: {
        params,
      },
    } = this.props;
    const { repository } = this.state;
    const { stargazers_count } = repository;
    const url = constructUrl({
      pathname: `${GITHUB_STARRING_PATH}/${params.owner}/${params.repo}`,
    });
    const isStarred = !repository.isStarred
      ? await this.starRepository(url)
      : await this.unstarRepository(url);

    this.setState({
      repository: {
        ...repository,
        stargazers_count: isStarred ? stargazers_count + 1 : stargazers_count - 1,
        isStarred,
      },
    });
  }

  render() {
    const { repository, effectiveHours } = this.state;

    return (
      !repository
        ? <Loader />
        : (
          <>
            <HeaderContainer>
              <AnchorLink
                href={repository.html_url}
                isHeader
              >
                {repository.full_name}
              </AnchorLink>
              <Button
                text={!repository.isStarred ? 'Star' : 'Unstar'}
                onClick={this.handleClick}
                isPrimary={!repository.isStarred}
              />
            </HeaderContainer>
            {repository && <Item item={repository} hasName={false} />}
            {effectiveHours && <Chart data={effectiveHours} label="Effective hours spent per year" />}
          </>
        )
    );
  }
}

export default RepositoryDetails;
