let removalList = ['bb-theme-css-injector', 'img.site-logo'];

(async () => import(chrome.runtime.getURL("src/remover.mjs")).then(module => module.remover(removalList)))();
