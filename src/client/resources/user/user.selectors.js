export function getUser({ user }) {
  return user;
}

export function getUsername({ user }) {
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
}

export function getUserId({ user }) {
  return user._id;
}

export function getAuthenticated({ user }) {
  return user !== null;
}
