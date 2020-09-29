export function set(name, value) {
  window.localStorage.setItem(name, value);
}

export function get(name, subst = null) {
  return window.localStorage.getItem(name) || subst;
}

export function del(name) {
  localStorage.removeItem(name);
}
