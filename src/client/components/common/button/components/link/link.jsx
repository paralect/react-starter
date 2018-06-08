// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';

import styles from './link.styles.pcss';

type PropsType = {
  onClick?: (e: SyntheticEvent<HTMLDivElement>) => void,
  text: string,
  to: string,
  tabIndex: number | string,
};

const noop = () => {};

class ButtonLink extends Component<PropsType> {
  static defaultProps = {
    onClick: noop,
  };

  onKeyDown = (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13 && this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render(): React$Node {
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

export default ButtonLink;
