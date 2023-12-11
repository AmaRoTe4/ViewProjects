export const getLocal = (name) => {
  return localStorage.getItem(name);
};

export const setLocal = (name, value) => {
  return localStorage.setItem(name, value);
};
