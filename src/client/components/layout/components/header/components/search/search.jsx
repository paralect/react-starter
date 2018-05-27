// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import FaSearch from 'react-icons/lib/fa/search';

import styles from './search.styles.pcss';

type PropsType = {
  className: string,
};

type StateType = {
  open: boolean,
  active: boolean,
  search: string,
};

class Search extends Component<PropsType, StateType> {
  state = {
    active: false,
    open: false,
    search: '',
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = (e: MouseEvent) => {
    const el = e.target;
    if (!(this.wrap && el instanceof Node && this.wrap.contains(el))) {
      this.onCloseSearch();
    }
  }

  onChangeSearchState = () => {
    if (!this.state.active) {
      this.setState({ active: true }, () => {
        setTimeout(this.openAndFocus, 200);
      });
    } else {
      this.onCloseSearch();
    }
  }

  onChangeSearchValue = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  }

  onCloseSearch() {
    this.setState({ open: false }, () => {
      setTimeout(() => {
        if (!this.state.open) {
          this.setState({ active: false });
        }
      }, 300);
    });
  }

  wrap: ?HTMLDivElement;
  input: ?HTMLInputElement;

  openAndFocus = () => {
    if (this.state.active) {
      this.setState({ open: true }, () => {
        setTimeout(() => {
          if (this.state.open && this.input) {
            this.input.focus();
          }
        }, 500);
      });
    }
  }

  render(): React$Node {
    const { className } = this.props;
    const { active, open, search } = this.state;

    return (
      <div
        className={classnames(styles.wrap, {
          [styles.active]: active,
          [styles.open]: open,
        }, className)}
        ref={(wrap: ?HTMLDivElement) => { this.wrap = wrap; }}
      >
        <input
          className={styles.input}
          type="search"
          ref={(input: ?HTMLInputElement) => { this.input = input; }}
          value={search}
          onChange={this.onChangeSearchValue}
        />

        <FaSearch
          size={20}
          className={styles.icon}
          onClick={this.onChangeSearchState}
        />
      </div>
    );
  }
}

export default Search;
