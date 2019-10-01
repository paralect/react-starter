import React, { Component } from 'react';

import { RoutesComponent } from 'routes';
import Toast from 'components/toast';

import Header from './components/header';
import Footer from './components/footer';
import styles from './layout.styles.pcss';


class Layout extends Component {
  render() {
    return (
      <div className={styles.page}>
        <Header />

        <div className={styles.main}>
          <div className={styles.content}>
            <RoutesComponent />
          </div>
        </div>

        <Footer />

        <Toast />
      </div>
    );
  }
}

export default Layout;
