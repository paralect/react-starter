import React from 'react';
import PropTypes from 'prop-types';

import Toast from 'components/toast';

import styles from './auth-layout.pcss';

function AuthLayout({ children }) {
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
