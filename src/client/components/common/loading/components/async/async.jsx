// @flow

import React from 'react';
import type { Node } from 'react';
import type { LoadingProps } from 'react-loadable';

import Loading from 'components/common/loading/loading';

const AsyncLoading = ({ error, pastDelay }: LoadingProps): Node => {
  if (error) {
    return (
      <div>
        {'Error!'}
      </div>
    );
  }
  if (pastDelay) {
    return <Loading />;
  }
  return null;
};

export default AsyncLoading;
