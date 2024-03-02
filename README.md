# I for Eyesore

In February 2024, a major university that I attend decided to rebrand.
This rebrand was sudden, drastic, and unpopular, and the aesthetic appeal of the new designs has become the subject of many a discussion and one 4,000-strong petition.

This is a Chrome extension that attempts to correct some of the more egregious changes on the client side of many of the university's web pages. It's just too bad that Chrome extensions don't work on the face of buildings.

## Getting Started

If you are not planning to actively develop, please try to install the extension from the Chrome Web Store.

(This is not currently published yet, but pending approval)

To run this repository from its source code, run `node build.mjs` or `npm run build`, which should convert this root directory into a valid unpacked extension, which can then be loaded via `chrome://extensions` in Developer Mode.

### Prerequisites

| Browser  | Required Version |
|----------|------------------|
| Chrome   | >= 105           |
| Edge     | >=120            |
| Chromium | >= 105           |

## Contribution Guidelines

Any contributions to this project should be made through pull request, subject to the following guidelines:
- Obviously, the changes are meant only for sites for this particular university. It shouldn't change site data on any sites unless it contains parts of the rebrand
- Unless I can confirm otherwise, we should not use any brand logos or icons designed by or directly associated with the university
- Changes should not be made to the semantic meaning or navigation flow of webpages - for example, changing logos to roughly semantically equivalent text is allowed, but changing the text content of an article or removing a link would not be

### Development Roadmap
- [x] Refactor the static content script injections into a more dynamic content script injection, and refactor to remove duplication
- [ ] Automate reversioning and add some simple CI
- [ ] Work on replacing favicons
- [ ] Add customisability options (user settings to turn off/on items, maintaining everything as a sensible default)
- [ ] Look into developing for alternative non-Chromium browsers (Safari, Firefox, Opera)


### Contributor FAQs

**How does the extension work on a high level?**

The extension uses the Chrome extension content script functionality to inject scripts to modify the DOM and CSS on certain sites.

**Why use pure TypeScript and not &lt;insert web technology here&gt;?**

The extension is insanely simple, and is meant to be easy to understand. I don't want a low bus factor on this. That being said, TypeScript, in my opinion, has a low learning curve once you know JavaScript, and the build process is simple enough.

**I'm not too sure how to code well, but I would like something to change on this webpage.**
Create an issue on this repository, and put the details of the site you'd like for the extension to modify.

