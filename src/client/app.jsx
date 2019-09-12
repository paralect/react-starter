import React from 'react';
import routes from './routes';
import Layout from './components/layout';

const App = () => (
  <Layout>
    {routes()}
  </Layout>
);

export default App;
