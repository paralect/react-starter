const incstr = require('incstr');

// @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const getComponentName = (resourcePath, separator) => {
  return resourcePath.split(separator).slice(-5, -1).join(separator);
};

const generateScopedName = (localName, resourcePath) => {
  const componentUnixName = getComponentName(resourcePath, '/');
  const componentWindowsName = getComponentName(resourcePath, '\\');

  const componentName = componentUnixName > componentWindowsName
    ? componentUnixName
    : componentWindowsName;

  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`;
};

module.exports = generateScopedName;
