const apiBaseUrl = "https://swapi.py4e.com/api";
const serverBaseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? `http://localhost:8000`
    : "";

const URLS = {
  get_character_names: ({ endpoint, value, page = 1 }) =>
    `${apiBaseUrl}/${endpoint}/?search=${value}&page=${page}`,
  login: () => `${serverBaseUrl}/api/auth/login`,
  refresh: () => `${serverBaseUrl}/api/auth/refresh`,
  logout: () => `${serverBaseUrl}/api/auth/logout`,
};

export const getUrl = (urlName, params) => URLS[urlName](params);
