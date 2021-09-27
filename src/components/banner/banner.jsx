import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import RoundCheckIcon from 'static/icons/round-check.svg';
import RoundErrorIcon from 'static/icons/round-error.svg';
import RoundInfoIcon from 'static/icons/round-info.svg';
import CloseIcon from 'static/icons/close.svg';

import Button from 'components/button';

import styles from './banner.styles.pcss';

function getIconProps(type) {
  switch (type) {
    case 'success':
      return <RoundCheckIcon />;
    case 'warning':
      return <RoundCheckIcon />;
    case 'error':
      return <RoundErrorIcon />;
    case 'info':
      return <RoundInfoIcon />;
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
