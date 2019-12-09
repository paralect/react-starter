import React, { PureComponent } from 'react';

import Routes from 'routes';
import Toast from 'components/toast';

import Header from './components/header';
import Footer from './components/footer';
import styles from './layout.styles';


class Layout extends PureComponent {
  render() {
    return (
      <div className={styles.page}>
        <Header />

        <div className={styles.main}>
          <div className={styles.content}>
            <Routes />
          </div>
        </div>

        <Footer />

        <Toast />
      </div>
    );
  }
}

export default Layout;
