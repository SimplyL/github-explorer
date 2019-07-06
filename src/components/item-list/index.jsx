import React from 'react';
import PropTypes from 'prop-types';

import Item from './item';

const renderItem = item => <Item item={item} key={item.id} />;

const ItemList = ({ items }) => (
  <div>
    {items.map(renderItem)}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
