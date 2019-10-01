import React from 'react';
import Loadable from 'react-loadable';

import { LoadingAsync } from 'components/loading';


const LoadableComponent = loader => Loadable({
  loader,
  loading: LoadingAsync,
  render(loaded, props) {
    const LoadedComponent = loaded.default;
    return <LoadedComponent {...props} />;
  },
});

export default LoadableComponent;
