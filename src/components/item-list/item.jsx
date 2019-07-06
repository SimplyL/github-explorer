import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as StarIcon } from '../../assets/svg/star.svg';
import { ReactComponent as ForkIcon } from '../../assets/svg/repo-forked.svg';
import { ReactComponent as OctofaceIcon } from '../../assets/svg/octoface.svg';
import { ReactComponent as OpenedIssueIcon } from '../../assets/svg/issue-opened.svg';

import {
  ItemContainer,
  ItemName,
} from './item-list.styles';

function Item({ item, onClick }) {
  const {
    stargazers_count,
    full_name,
    description,
    license,
    html_url,
    language,
    forks_count,
    open_issues_count,
    contributors_count,
  } = item;

  return (
    <ItemContainer onClick={() => onClick(full_name)}>
      <div>
        <ItemName>
          <a href={html_url}>{full_name}</a>
        </ItemName>
        {description}
      </div>
      <div>
        {license && license.name}
        {language}
        <div>
          <StarIcon />
          {stargazers_count}
        </div>
        <OctofaceIcon />
        {contributors_count}
        <ForkIcon />
        {forks_count}
        <OpenedIssueIcon />
        {open_issues_count}
      </div>
    </ItemContainer>
  );
}

Item.defaultProps = {
  onClick: () => {},
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Item;
