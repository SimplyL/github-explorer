import React from 'react';
import PropTypes from 'prop-types';

import Item from './item';

const renderItem = (item, onClick) => (
  <Item
    item={item}
    key={item.id}
    onClick={onClick}
  />
);

const ItemList = ({ items, onClick }) => (
  <div>
    {items.map(item => renderItem(item, onClick))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemList;
