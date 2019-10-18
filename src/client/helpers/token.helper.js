import { ACCESS_TOKEN_COOKIE_NAME } from 'helpers/constants';


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }

  return null;
};

export const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN_COOKIE_NAME);
};
