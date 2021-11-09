import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ToRightIcon } from 'static/icons';

import Spinner from 'components/Spinner';

import styles from './Button.pcss';

const types = {
  primary: 'primary',
  secondary: 'secondary',
  text: 'text',
  link: 'link',
};

const sizes = {
  l: 'l',
  m: 'm',
  s: 's',
};

function Button({
  children, type, htmlType, size, Icon, iconPosition, withIcon, loading, disabled, className,
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      className={cn(
        {
          [styles.loading]: loading,
          [styles.disabled]: disabled,
        },
        styles.button,
        styles[type],
        styles[size],
        className,
      )}
    >
      {loading
        ? <Spinner theme={type === types.primary && 'dark'} size="s" />
        : (
          <span className={cn({
            [styles.right]: iconPosition === 'right',
          }, styles.value)}
          >
            {Icon && <Icon className={styles.icon} />}
            {children}
            {(type === types.link && withIcon) && <ToRightIcon /> }
          </span>
        )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(types)),
  htmlType: PropTypes.string,
  size: PropTypes.oneOf(Object.values(sizes)),
  Icon: PropTypes.elementType,
  iconPosition: PropTypes.string,
  withIcon: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: types.primary,
  htmlType: 'button',
  size: sizes.m,
  Icon: null,
  iconPosition: 'left',
  withIcon: false,
  loading: false,
  disabled: false,
  className: null,
};

export default React.memo(Button);
