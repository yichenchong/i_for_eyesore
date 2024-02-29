let companyName = JSON.parse(document.getElementById('userEntitlements')?.innerText)?.CompanyDisplayName;
console.log(companyName);
if (companyName.includes('Imperial College London')) {
  let removalList = ['img#O365_MainLink_TenantLogoImg'];
  (async () => import(chrome.runtime.getURL("src/remover.mjs")).then(module => module.remover(removalList)))();
}