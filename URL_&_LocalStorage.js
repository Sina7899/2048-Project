function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function localStorageKeyValues() {
  let localStorageKeyValues = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    localStorageKeyValues.push([key, localStorage.getItem(key)]);
  }
  return localStorageKeyValues;
}

function getKeyByValue(value) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedValue = localStorage.getItem(key);
    if (storedValue === value) {
      return key;
    }
  }
  return null;
}

function changeURL(newPagePath, params) {
  const currentURL = window.location.href;
  let parsedURL = new URL(currentURL);
  parsedURL.pathname = newPagePath;
  parsedURL.searchParams.set("player", params);
  return parsedURL.href;
}

export {
  addToLocalStorage,
  getFromLocalStorage,
  localStorageKeyValues,
  getKeyByValue,
  changeURL,
};
