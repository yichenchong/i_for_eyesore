let removalList = ['img#bannerLogo'];

if (window.location.href.includes('domain_hint=ic.ac.uk'))
  (async () => import(chrome.runtime.getURL("src/remover.mjs")).then(module => module.remover(removalList)))();
