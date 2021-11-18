import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './MemoCard.pcss';

const types = {
  info: 'info',
  alert: 'alert',
  error: 'error',
};

const MemoCard = ({ title, items, type }) => {
  return (
    <div className={cn(styles.memoCard, styles[type])}>
      {title}
      <ul>
        {items.map((item) => (
          <li key={item.title}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

MemoCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(Object.values(types)),
};

MemoCard.defaultProps = {
  type: 'info',
};

export default React.memo(MemoCard);
