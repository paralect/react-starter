import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toast from 'components/common/toast';
import Header from './components/header';
import Footer from './components/footer';

import styles from './layout.styles.pcss';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.page}>
        <Header />

        <div className={styles.main}>
          <div className={styles.content}>
            {children}
          </div>
        </div>

        <Footer />

        <Toast />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
