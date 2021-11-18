import React, { memo, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import {
  CheckIcon, AlertIcon, ErrorIcon, InfoIcon, CloseIcon,
} from 'static/icons';

import styles from './Toast.pcss';

const types = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const iconsList = {
  success: <CheckIcon />,
  warning: <AlertIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

const Toast = ({ type, message, onClose }) => {
  const [close, setClose] = useState(false);

  return (
    <div className={cn({
      [styles.close]: close,
    }, styles.container, styles[type])}
    >
      {iconsList[type]}
      <div className={styles.message}>{message}</div>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => {
          setClose(true);
          setTimeout(() => {
            onClose();
          }, 300);
        }}
      />
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(Object.keys(types)),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

Toast.defaultProps = {
  type: types.success,
  onClose: null,
};

export default memo(Toast);
