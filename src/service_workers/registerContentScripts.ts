import all_settings from '../default_settings';

const registerContentScripts = async () => {
  if (!(await chrome.storage.session.get('registered')).registered) {
    chrome.storage.session.set({ registered: true });
    const cssScripts = all_settings.sites
      .filter(site => site.css)
      .map(site => {
        chrome.scripting.registerContentScripts([{
          id: site.name.replace(/\s/g, '_').toLowerCase() + '_css',
          css: site.css,
          matches: ["<all_urls>"],
          runAt: "document_start"
        }]);
      });

    const removerScript = chrome.scripting.registerContentScripts([{
      id: 'remover',
      js: ['dist/content_scripts/remover.js'],
      matches: all_settings.sites.flatMap(site => site.matches),
      runAt: "document_end"
    }])
      .then(_ => console.log('Registered remover content scripts'))
      .catch(err => console.error('Failed to register remover content scripts', err));

    const replacerScript = chrome.scripting.registerContentScripts([{
      id: 'replacer',
      js: ['dist/content_scripts/replacer.js'],
      matches: all_settings.sites.flatMap(site => site.matches),
      runAt: "document_end"
    }])
      .then(_ => console.log('Registered replacer content scripts'))
      .catch(err => console.error('Failed to register replacer content scripts', err));
    
    await Promise.all([...cssScripts, removerScript, replacerScript])
      .then(_ => console.log('Registered content scripts'))
      .catch(err => console.error('Failed to register content scripts', err));
  }
};

chrome.runtime.onInstalled.addListener(
  () => registerContentScripts().then(
    _ => chrome.scripting.getRegisteredContentScripts().then(
      scripts => console.log(scripts)
    )
  )
);