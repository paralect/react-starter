export function getUser({ user }) {
  return user;
}

export function getAuthenticated({ user }) {
  return user !== null;
}
