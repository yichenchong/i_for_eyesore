import all_settings from '../default_settings';
import { matcher_match } from '../utils/matcher_match';

const tryRemove = (queries: Removal[]) => {
  queries.forEach(query => {
    if (!((query as ConditionalRemoval)?.condition as Condition) || ((query as ConditionalRemoval)?.condition as Condition)(document)) {
      const querySelected = document.querySelectorAll((query as ConditionalRemoval)?.query ?? (query as UnconditionalRemoval));
      if (querySelected.length > 0) querySelected.forEach(elt => elt.remove());
    }
  });
  console.log('I For Eyesore: Tried to remove ', queries);
}

const settings = all_settings; // TODO: get exclusions from background
const queries: Removal[] = [];
settings.sites
  .filter(site => site.removals && site.matches.some(matcher => matcher_match(matcher)))
  .forEach(site => site.removals && queries.push(...site.removals))
const observer = new MutationObserver(() => tryRemove(queries));
observer.observe(document.body, { childList: true, subtree: true });
console.log('I For Eyesore: Registered removal observer');
