import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import Avatar from 'components/avatar';

import styles from './sidebar.styles.pcss';

function Sidebar({
  icon, name, currentPage, pages, fullName, onChange,
}) {
  return (
    <div className={styles.root}>
      <div className={styles.logoContainer}>
        <Icon
          icon={icon}
          noWrapper
          className={styles.logo}
        />
        <div className={styles.projectName}>{name}</div>
      </div>
      <div className={styles.list}>
        {pages.map((item) => {
          const {
            path, label, disabled, icon: itemIcon,
          } = item;

          const isCurrentPage = currentPage.path === path;

          const handleChange = () => onChange(item);

          return (
            <button
              key={path}
              type="button"
              className={cn(styles.listItem, {
                [styles.active]: isCurrentPage,
                [styles.disabled]: disabled,
              })}
              onClick={handleChange}
            >
              <div className={styles.itemIcon}>
                <Icon
                  icon={itemIcon}
                  className={styles.icon}
                />
              </div>
              <div className={styles.listItemText}>
                {label}
              </div>
            </button>
          );
        })}
      </div>
      <button type="button" className={styles.footer}>
        <Avatar fullName={fullName} />
        <div className={styles.profile}>
          <div className={styles.fullName}>
            {fullName}
          </div>
          View profile
        </div>
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  fullName: PropTypes.string.isRequired,
  currentPage: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func,
  }).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func,
  })).isRequired,
};

Sidebar.defaultProps = {
  icon: 'shipLogo',
  name: 'ship',
  onChange: null,
};

export default React.memo(Sidebar);
