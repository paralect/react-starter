import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ToLeftIcon } from 'static/icons';

import styles from './Link.pcss';

const sizes = {
  l: 'l',
  m: 'm',
  s: 's',
};

const Link = ({
  children, href, size, withIcon, disabled, inNewTab, className,
}) => {
  return (
    <a
      href={href}
      target={inNewTab && '_blank'}
      rel="noreferrer"
      className={cn({
        [styles.disabled]: disabled,
      }, styles[size], styles.link, className)}
    >
      {withIcon && <ToLeftIcon className={styles.icon} />}
      <span className={styles.text}>{children}</span>
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  size: PropTypes.oneOf(Object.values(sizes)),
  withIcon: PropTypes.bool,
  inNewTab: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Link.defaultProps = {
  href: null,
  size: sizes.m,
  withIcon: false,
  inNewTab: false,
  disabled: false,
  className: null,
};

export default memo(Link);
