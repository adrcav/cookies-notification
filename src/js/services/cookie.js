import Cookies from 'js-cookie';

export const getAllCookies = () => Cookies.get();

export const getCookie = (name) => Cookies.get(name);

export const setCookie = (name, value, options = {}) => {
  if (!name || !name.length)
    return false;

  if (!value || !value.length)
    return false;

  return Cookies.set(name, value, options);
};

export const removeAllCookies = () => {
  const cookies = Cookies.get();
  for (let cookie in cookies) {
    Cookies.remove(cookie);
  }
}
