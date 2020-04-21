import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as loaderService from 'services/loader.service';
import * as socketService from 'services/socketIo.service';

import * as userSelectors from 'resources/user/user.selectors';

import Toast from 'components/toast';

import styles from './auth-layout.pcss';

function AuthLayout({ children }) {
  const authenticated = useSelector(userSelectors.getAuthenticated);

  React.useEffect(() => {
    loaderService.hide();
    if (socketService.connected()) socketService.disconnect();
  }, []);

  if (authenticated) {
    return (
      <Redirect
        to={routes.home.url()}
      />
    );
  }

  return (
    <div className={styles.page}>
      {children}

      <Toast />
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(AuthLayout);
