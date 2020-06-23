import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'routes';

import * as loaderService from 'services/loader.service';
import * as socketService from 'services/socketIo.service';

import styles from './notFound.styles';

function NotFound() {
  React.useEffect(() => {
    loaderService.hide();
    if (socketService.connected()) socketService.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Ah shit, here we go again.</p>
      <p>
        <Link to={routes.signUp.url()}>
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
