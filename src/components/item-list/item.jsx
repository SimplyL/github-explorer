import React from 'react';
import PropTypes from 'prop-types';

function Item({ item }) {
  const {
    stargazers_count,
    full_name,
    description,
    license,
    html_url,
    language,
    forks_count,
    open_issues_count,
  } = item;
  console.log(item);
  return (
    <div />
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
