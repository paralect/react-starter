# Koa React starter

[![Stack](https://raw.githubusercontent.com/paralect/stack/master/stack-component-template/stack.png)](https://github.com/paralect/stack)

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](http://product-stack-ci.paralect.com/api/badges/paralect/koa-react-starter/status.svg)](http://product-stack-ci.paralect.com/paralect/koa-react-starter)
[![David Dependancy Status](https://david-dm.org/paralect/koa-react-starter.svg)](https://david-dm.org/paralect/koa-react-starter)

[![Watch on GitHub](https://img.shields.io/github/watchers/paralect/koa-react-starter.svg?style=social&label=Watch)](https://github.com/paralect/koa-react-starter/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/paralect/koa-react-starter.svg?style=social&label=Stars)](https://github.com/paralect/koa-react-starter/stargazers)
[![Follow](https://img.shields.io/twitter/follow/paralect.svg?style=social&label=Follow)](https://twitter.com/paralect)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/paralect/koa-react-starter.svg?style=social)](https://twitter.com/intent/tweet?text=I%27m%20using%20Stack%20components%20to%20build%20my%20next%20product%20🚀.%20Check%20it%20out:%20https://github.com/paralect/stack)

Koa React starter is what we think an ideal starting point for the most React.JS frontend applications. It is based on the following primary technologies:

- react
- react-router
- redux
- webpack
- postcss
- eslint
- koa

Application structured in a way, which we find most efficient in both short and long term projects. The main intention of the current structure is to keep logical components close to each other and define clear structure for the common things, such as routers, store, api wrappers, reducers, action creators, store selectors.

### Explanations of the files structure.

1. **[src/client/components](./src/client/components)** - this folder consist all UI components. Root level folders (such as [profile](./src/components/profile), [index](./src/client/components/index)) are typically pages of your application. Every such component should have all files related to the page: images, style files, jsx files, sub components. This folder also consist two none page components: [common](./src/client/components/common) and [layout](./src/client/components/common). *Common* folder should have all common components which are reused in **at least two** root level components. Layout - represent a layout of your application and should consist all layout related logic and other components, such as headers, footers, sidebars.
2. **[src/client/components/routes.jsx](./src/client/components/routes.jsx)** - this file should consist all routes for your client side application.
3. **[src/client/helpers](./src/client/helpers)** - this folder should consist of common helpers used in other components, such as date formatters, api wrappers, validation functions, common functions and all other files that does not fit current structure. If you don't know where to put certain file - put it into this folder and we will eventually figure out the right place for it.
4. **[src/client/resources](./src/client/resources/user)** - a folder consist of all redux/api related things. Typically resource maps 1 to 1 to the api endpoint, but not limited to only api endpoints. Every resource is responsible for management certain part of the redux store. If you need keep something client specific in the redux store, you can create separate resource for it. For example: navigation resource may contain some history of the all opened pages without 1 to 1 connection to the rest api. Main moving parts of resource:
    - **[src/client/resources/store.js](./src/client/resources/store.js)** - initialization logic for the redux store. Adds redux middlewares.
    - **[src/client/resources/reducer.js](./src/client/resources/reducer.js)** - combines all reducers.
    - **[src/client/resources/\*/\*.actions.js](./src/client/resources/user/user.actions.js)** - consist redux action creators for the given resource. Also here you can find validation schema created using [yup](https://github.com/jquense/yup) which is similar to the Joi schema validation.
    - **[src/client/resources/\*/\*.api.js](./src/client/resources/user/user.api.js)** - consist all api methods of the given resource. Optional.
    - **[src/client/resources/\*/\*.reducer.js](./src/client/resources/user/user.reducer.js)** - consist reducer for the give resource. All reducers combined together in the [reducer.js](./src/client/resources/reducer.js).
    - **[src/client/resource/\*/\*.selectors.js](./src/client/resources/user/user.selectors.js)** - consist selectors for the given resource. You should never access store directly, but always use selectors instead. That would simplify things when structure of the store data changes.
5. **[src/client/services](./src/client/services)** - folder should consist the logic for the the third party service integrations (such as Intercom, Segment, etc). Not limited only to the third party services, but could consist some standalone application related services.

### Important things to keep in mind

1. Logical components should be tightly coupled. Keep all component related files, such as images, styles, sub components as close as possible to the component. Do not put component into the `common` folder for the *future use*.
2. Two separate page components should be loosely coupled. If there is two page components which use same image - keep two copies of every image within every page. Do not create generic images folder, as all images belong to some ui components.

### Conventions

1. Name of all files for components should start from lowercase letter and words should be separated by a dash (`date-range`, `multi-action-button`).
2. Code style (eslint).

### List of planned improvements

1. Make two current pages stylish.

## License

Koa react starter is released under the [MIT License](LICENSE).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Join us and share something developers need 👌.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ezhivitsa"><img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;" alt="Evgeny Zhivitsa"/><br /><sub><b>Evgeny Zhivitsa</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=ezhivitsa" title="Code">💻</a> <a href="https://github.com/paralect/koa-react-starter/commits?author=ezhivitsa" title="Documentation">📖</a> <a href="#ideas-ezhivitsa" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-ezhivitsa" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://paralect.com"><img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;" alt="Andrew Orsich"/><br /><sub><b>Andrew Orsich</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=anorsich" title="Documentation">📖</a> <a href="#ideas-anorsich" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-anorsich" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/umitskevich"><img src="https://avatars2.githubusercontent.com/u/2989199?v=4" width="100px;" alt="Uladzimir Mitskevich"/><br /><sub><b>Uladzimir Mitskevich</b></sub></a><br /><a href="#ideas-umitskevich" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-umitskevich" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/NesterenkoNikita"><img src="https://avatars1.githubusercontent.com/u/12069883?v=4" width="100px;" alt="NesterenkoNikita"/><br /><sub><b>NesterenkoNikita</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=NesterenkoNikita" title="Code">💻</a> <a href="#review-NesterenkoNikita" title="Reviewed Pull Requests">👀</a> <a href="#ideas-NesterenkoNikita" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/SobakaSlava"><img src="https://avatars1.githubusercontent.com/u/23057064?v=4" width="100px;" alt="Nikita Solosnuk"/><br /><sub><b>Nikita Solosnuk</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=SobakaSlava" title="Code">💻</a> <a href="#review-SobakaSlava" title="Reviewed Pull Requests">👀</a> <a href="#ideas-SobakaSlava" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Mar1nka"><img src="https://avatars1.githubusercontent.com/u/25400321?v=4" width="100px;" alt="Mar1nka"/><br /><sub><b>Mar1nka</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=Mar1nka" title="Code">💻</a> <a href="#ideas-Mar1nka" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/scherbenokk"><img src="https://avatars1.githubusercontent.com/u/11193538?v=4" width="100px;" alt="Kirill Scherbenok"/><br /><sub><b>Kirill Scherbenok</b></sub></a><br /><a href="https://github.com/paralect/koa-react-starter/commits?author=scherbenokk" title="Code">💻</a> <a href="#ideas-scherbenokk" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
