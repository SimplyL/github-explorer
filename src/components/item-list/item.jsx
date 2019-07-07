import React from 'react';
import PropTypes from 'prop-types';

import StarIcon from 'mdi-react/StarIcon';
import UnstarIcon from 'mdi-react/StarOutlineIcon';
import { ReactComponent as StargazerIcon } from '../../assets/svg/star.svg';
import { ReactComponent as ForkIcon } from '../../assets/svg/repo-forked.svg';
import { ReactComponent as OctofaceIcon } from '../../assets/svg/octoface.svg';
import { ReactComponent as OpenedIssueIcon } from '../../assets/svg/issue-opened.svg';
import {
  ItemContainer,
  ItemName,
  MainContent,
  Stargazer,
  Description,
  TitleContainer,
  Statistics,
  Stats,
  Details,
  AnchorButton,
} from './item-list.styles';

const handleClick = (e, url) => {
  e.stopPropagation();
  window.location.href = url;
};

const Item = ({ item, onClick, hasName }) => {
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
    isStarred,
  } = item;

  return (
    <ItemContainer onClick={() => onClick(full_name)}>
      <MainContent>
        <TitleContainer>
          {hasName
            && (
              <ItemName>
                <AnchorButton
                  type="button"
                  onClick={e => handleClick(e, html_url)}
                >
                  {full_name}
                </AnchorButton>
              </ItemName>
            )
          }
          <Description>
            {description}
          </Description>
        </TitleContainer>
        <Stargazer>
          {isStarred ? <StarIcon /> : <UnstarIcon />}
        </Stargazer>
      </MainContent>
      <Statistics>
        <Details>
          <div>
            {license ? license.name : 'License not specified'}
          </div>
          <div>
            {language}
          </div>
        </Details>
        <Stats>
          <StargazerIcon />
          {stargazers_count}
        </Stats>
        <Stats>
          <OctofaceIcon />
          {contributors_count}
        </Stats>
        <Stats>
          <ForkIcon />
          {forks_count}
        </Stats>
        <Stats>
          <OpenedIssueIcon />
          {open_issues_count}
        </Stats>
      </Statistics>
    </ItemContainer>
  );
};

Item.defaultProps = {
  onClick: () => { },
  hasName: true,
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  hasName: PropTypes.bool,
};

export default Item;
