import { generatePath } from 'react-router-dom';


export const routesList = [{
  name: 'home',
  path: '/',
  exact: true,
}, {
  name: 'profile',
  path: '/profile',
  exact: false,
}, {
  name: 'notFound',
  path: '/not-found',
  exact: false,
}];

export default routesList.reduce((routes, route) => {
  return {
    ...routes,
    [route.name]: (options = {}) => ({
      ...options,
      pathname: generatePath(route.path, options.params) || '/',
    }),
  };
}, {});
