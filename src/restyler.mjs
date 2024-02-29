export const restyler = (restyles) => {
  const tryRestyle = () => {
    const querySelected = restyles.map(restyle => document.querySelectorAll(restyle[0] + ":not(.i-for-eyesore-restyled"));
    if (querySelected.some(q=>q.length > 0)) {
      querySelected.forEach((q, i) => q.forEach(elt => {
        const newStyles = restyles[i][1];
        elt.classList.add('i-for-eyesore-restyled');
        for (const [key, value] of Object.entries(newStyles)) {
          elt.style[key] = value;
        }
      }));
    }
  }

  const observer = new MutationObserver(tryRestyle);
  observer.observe(document.body, { childList: true, subtree: true });
};