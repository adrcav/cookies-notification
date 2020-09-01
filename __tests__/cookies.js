import {
  getAllCookies,
  setCookie,
  getCookie,
  removeAllCookies
} from '../src/js/services/cookie';

describe("Cookies validation", () => {

  test("it should returns empty cookies object", () => {
    expect(getAllCookies()).toEqual({});
  });

  test("should try set a invalid cookie", () => {
    expect(setCookie('', '')).toBeFalsy();
    expect(setCookie(null, '')).toBeFalsy();
    expect(setCookie(undefined, null)).toBeFalsy();
  });

  test("should set and check default cookie", () => {
    setCookie('CookiesNotification', 'accept');
    expect(getCookie('CookiesNotification')).toEqual("accept");
  });

  test("should delete all local cookies", () => {
    removeAllCookies();
    expect(getAllCookies()).toEqual({});
  });

});
