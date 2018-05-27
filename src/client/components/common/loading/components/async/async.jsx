// @flow

import React from 'react';
import type { Node } from 'react';
import type { LoadableExport$LoadingComponentProps } from 'react-loadable';

import Loading from 'components/common/loading';

const AsyncLoading = (props: LoadableExport$LoadingComponentProps): Node => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <Loading />;
  }
  return null;
};

export default AsyncLoading;
