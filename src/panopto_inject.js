(async () => import(chrome.runtime.getURL("src/replacer.mjs")).then(module => {
  let headerLogoReplacement = document.createTextNode('Imperial College London');
  let replacementList = [
    ['a#siteLogo_customerLogoLink img', headerLogoReplacement],
  ];
  module.replacer(replacementList);
}))();
