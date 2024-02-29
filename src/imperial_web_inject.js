(async () => import(chrome.runtime.getURL("src/replacer.mjs")).then(module => {
  let headerLogoReplacement = module.replacementLogoFlexible();
  headerLogoReplacement.classList.add('header-logo');
  let replacementList = [
    ['svg.header-logo', headerLogoReplacement]
  ];
  module.replacer(replacementList);
}))();
