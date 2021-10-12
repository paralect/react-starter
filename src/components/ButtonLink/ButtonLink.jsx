import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './ButtonLink.pcss';

function ButtonLink({
  href, text, disabled, className, Icon, inNewTab,
}) {
  return (
    <a
      href={href}
      target={inNewTab && '_blank'}
      rel="noreferrer"
      className={cn({
        [styles.disabled]: disabled,
      }, styles.link, className)}
    >
      <div className={styles.value}>
        {text}
        {Icon && <Icon />}
      </div>
    </a>
  );
}

ButtonLink.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  Icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  inNewTab: PropTypes.bool,
  href: PropTypes.string,
};

ButtonLink.defaultProps = {
  className: null,
  href: '',
  text: '',
  disabled: false,
  inNewTab: true,
  Icon: null,
};

export default React.memo(ButtonLink);
