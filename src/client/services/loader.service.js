function getLoader() {
  return document.querySelector('.loader');
}

export function show() {
  const loader = getLoader();
  loader.classList.remove('loader_hidden');
}

export function hide() {
  const loader = getLoader();
  loader.classList.add('loader_hidden');
}
