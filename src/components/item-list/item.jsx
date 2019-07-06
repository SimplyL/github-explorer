import React from 'react';
import PropTypes from 'prop-types';

function Item({ item }) {
  console.log(item);
  return (
    <div>
      {item.stargazers_count}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
