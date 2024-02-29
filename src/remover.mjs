export const tryRemove = (queries) => {
  const querySelected = queries.map(query => document.querySelectorAll(query));
  if (querySelected.some(q=>q.length > 0)) {
    console.log(querySelected);
    querySelected.forEach(q => q.forEach(elt=>elt.remove()));
  }
}

export const remover = (queries) => {
  const observer = new MutationObserver(() => tryRemove(queries));
  observer.observe(document.body, { childList: true, subtree: true });
};