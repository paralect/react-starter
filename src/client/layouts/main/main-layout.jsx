import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as loaderService from 'services/loader.service';
import * as socketService from 'services/socketIo.service';

import * as userSelectors from 'resources/user/user.selectors';

import Toast from 'components/toast';

import Header from './header';
import Footer from './footer';

import styles from './main-layout.pcss';


function MainLayout({ children }) {
  const authenticated = useSelector(userSelectors.getAuthenticated);

  React.useEffect(() => {
    loaderService.hide();
    if (socketService.disconnected()) socketService.connect();
  }, []);

  if (!authenticated) {
    const searchParams = new URLSearchParams({ to: window.location.pathname });
    return (
      <Redirect
        to={routes.signIn.url({
          search: searchParams.toString(),
        })}
      />
    );
  }

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

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(MainLayout);
