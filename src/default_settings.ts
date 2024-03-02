const all_settings: AllSettings = {
  sites: [
    {
      name: "BlackBoard",
      matches: ["https://bb.imperial.ac.uk/*"],
      removals: [
        "bb-theme-css-injector",
        "img.site-logo"
      ]
    },
    {
      name: "Microsoft Login",
      matches: ["https://login.microsoftonline.com/*"],
      removals: ["img#bannerLogo"],
    },
    {
      name: "Imperial Website",
      matches: ["https://*.imperial.ac.uk/*"],
      css: ["static/css/injected_css/imperial_web.css"],
      replacements: [
        {
          condition: (document) => {
            const userEntitlements = document.getElementById('userEntitlements')?.innerText;
            if (!userEntitlements) return false;
            return JSON.parse(userEntitlements)?.CompanyDisplayName?.includes('Imperial College London')
          },
          query: "svg.header-logo",
          replacement: "static/html/replacements/replacementLogoFlexible.html"
        }
      ]
    },
    {
      name: "Office",
      matches: ["https://*.office.com/*", "https://outlook.office.com/*"],
      removals: ["img#O365_MainLink_TenantLogoImg"]
    },
    {
      name: "Panopto",
      matches: ["https://imperial.cloud.panopto.eu/*"],
      css: ["static/css/injected_css/panopto.css"],
      replacements: [
        {
          query: "a#siteLogo_customerLogoLink img",
          replacement: "static/html/replacements/iclText.html"
        }
      ]
    }
  ]
}

export default all_settings;