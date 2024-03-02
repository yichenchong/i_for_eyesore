import all_settings from '../default_settings';
import { matcher_match } from '../utils/matcher_match';


const tryReplace = (replacements: Replacement[]) => {
  const querySelected = replacements.map(replacement => document.querySelectorAll(replacement.query));
  console.log('I For Eyesore: Tried to replace ', querySelected);
  if (querySelected.some(q=>q.length > 0)) {
    querySelected.forEach((q, i) => q.forEach(elt => {
      // get file at replacements[i].replacement
      const replacementFile = replacements[i].replacement;
      fetch(chrome.runtime.getURL(replacementFile))
        .then(response => response.text())
        .then(text => {
          if (elt.parentNode) {
            console.log(elt.parentNode);
            // insert and remove
            elt.insertAdjacentHTML('afterend', text);
            elt.remove();
            // OR use replace
            console.log('Replaced', elt, 'with', text);
          }
        })
        .catch(err => console.error('Failed to fetch replacement file', replacementFile, JSON.stringify(err)));
    }));
  }
}

const settings = all_settings; // TODO: get exclusions from background
const replacements: Replacement[] = [];
settings.sites
  .filter(site => site.replacements && site.matches.some(matcher => matcher_match(matcher)))
  .forEach(site => site.replacements && replacements.push(...site.replacements))
const observer = new MutationObserver(() => tryReplace(replacements));
observer.observe(document.body, { childList: true, subtree: true });
console.log('I For Eyesore: Registered replacement observer');