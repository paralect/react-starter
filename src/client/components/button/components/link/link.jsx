import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/button/button';

import styles from './link.styles';


const noop = () => {};

class ButtonLink extends PureComponent {
  onKeyDown = (e) => {
    const { onClick } = this.props;
    if (e.keyCode === 13 && onClick) {
      onClick(e);
    }
  };

  render() {
    const {
      to, text, onClick, tabIndex,
    } = this.props;

    return (
      <Link to={to} className={styles.link}>
        <Button onClick={onClick} onKeyDown={this.onKeyDown} tabIndex={tabIndex}>
          {text}
        </Button>
      </Link>
    );
  }
}

ButtonLink.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

ButtonLink.defaultProps = {
  onClick: noop,
};

export default ButtonLink;
