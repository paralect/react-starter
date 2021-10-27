import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import {
  CheckIcon, ErrorIcon, AlertIcon, CloseIcon,
} from 'static/icons';

import Button from 'components/Button';

import styles from './Banner.pcss';

function getIconProps(type) {
  switch (type) {
    case 'success':
      return <CheckIcon />;
    case 'warning':
      return <CheckIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'info':
      return <AlertIcon />;
    default:
      return {};
  }
}

const Banner = ({
  onButtonClick, onClose, type, text, buttonText,
}) => {
  return (
    <div
      className={cn(styles.banner, styles[type])}
    >
      <div className={styles.left}>
        {getIconProps(type)}
        <span>{text}</span>
      </div>
      <div className={styles.right}>
        {!!buttonText && (
          <Button
            onClick={onButtonClick}
            className={cn(styles.button, styles[type])}
          >
            {buttonText}
          </Button>
        )}
        <CloseIcon onClick={onClose} />
      </div>
    </div>
  );
};

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Banner.defaultProps = {
  type: 'info',
  buttonText: null,
  onButtonClick: noop,
};

export default React.memo(Banner);
