export const replacer = (replacements) => {

  const tryReplace = () => {
    const querySelected = replacements.map(replacement => document.querySelectorAll(replacement[0]));
    console.log(querySelected);
    if (querySelected.some(q=>q.length > 0)) {
      querySelected.forEach((q, i) => q.forEach(elt => {
        const replacementElement = replacements[i][1].cloneNode(true);
        elt.parentNode.replaceChild(replacementElement, elt);
        console.log('Replaced', elt, 'with', replacementElement);
      }));
    }
  }

  const observer = new MutationObserver(tryReplace);
  observer.observe(document.body, { childList: true, subtree: true });
};

export const replacementLogoFlexible = () => {
  const elt = document.createElement('div');
  elt.classList.add('i-for-eyesore-replacement-logo-flexible');
  elt.style.width = '100%';
  elt.style.height = '100%';
  elt.style.display = 'flex';
  elt.style.justifyContent = 'center';
  elt.style.alignItems = 'center';
  const innerElt = document.createElement('div');
  innerElt.classList.add('i-for-eyesore-replacement-logo-flexible-inner');
  innerElt.style.fontSize = 'max(20px, min(3vw, 3vh))';
  innerElt.style.width = '100%';
  innerElt.style.textAlign = 'center';
  innerElt.textContent = 'Imperial College London';
  elt.appendChild(innerElt);
  return elt;
}