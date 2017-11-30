/**
 * @typedef _options - options
 * @prop {string} [url] - url
 * @prop {string} [title] - title
 * @prop {string} [description] - description
 * @prop {string} [image] - image url
 * @prop {string} [type] - type
 * @prop {string} [audio] - audio
 * @prop {string} [determiner] - determiner
 * @prop {string} [locale] - locale
 * @prop {string} [locale:alternate] - locale:alternate
 * @prop {string} [site_name] - site name
 * @prop {string} [video] -  video
 * @prop {string} [twitter:card] -  twitter:card
 * @prop {string} [twitter:site] -  twitter:site
 * @prop {string} [twitter:creator] -  twitter:creator
 */
const _options = {
  url: '',
  title: '',
  description: '',
  image: '',
  type: '',
  audio: '',
  determiner: '',
  locale: '',
  'locale:alternate': '',
  site_name: '',
  video: '',
  'twitter:card': '',
  'twitter:site': '',
  'twitter:creator': '',
};

/**
 * add open graph meta cards to html documents
 * @param {_options} [options] - options
 * @param {boolean} [autofill=false] - an option to fill all empty properties with 'no prefix'
 * @param {boolean} [override=false] - an option to override default options and add custom tags
 */
function addCards(options, autofill = false, override = false) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const parsedOptions = _parseOptions(options, autofill, override);
  Object.keys(parsedOptions).forEach((prop) => {
    const content = parsedOptions[prop];
    if (!content) return;
    const metaTag = document.createElement('meta');
    metaTag.setAttribute(
      prop.startsWith('twitter') ? 'name' : 'property',
      !prop.startsWith('twitter') && !prop.startsWith('og') ? `og:${prop}` : prop,
    );
    metaTag.content = content;
    head.appendChild(metaTag);
  });
}

/**
 * parse user options
 * @param {_options} options - options
 * @param {boolean} autofill - an option to fill all empty properties with 'no prefix'
 * @param {boolean} override - an option to add custom tags
 */
function _parseOptions(options, autofill, override) {
  const tempOptions = Object.assign({}, options);
  Object.keys(_options).forEach((prop) => {
    if (!tempOptions[prop]) {
      if (!autofill) tempOptions[prop] = undefined;
      else tempOptions[prop] = `no ${prop}`;
    }
  });

  Object.keys(tempOptions).forEach((prop) => {
    if (_options[prop] !== '' && !override) {
      delete tempOptions[prop];
    }
  });

  return tempOptions;
}

module.exports = {
  addCards,
  _parseOptions,
};
