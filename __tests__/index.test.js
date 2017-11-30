const metaCards = require('../index');

describe('meta-cards', () => {
  it('should parse user options correctly', () => {
    const testOptions = {
      title: 'test title',
      urls: 'some url value that its property name dont match',
    };

    // parse with no autofill
    let parsedOptions = metaCards._parseOptions(testOptions, false);
    expect(parsedOptions.title).toBe('test title');
    expect(parsedOptions.urls).toBeUndefined();
    expect(parsedOptions.image).toBeFalsy();

    // parse with autofill and override
    parsedOptions = metaCards._parseOptions(testOptions, true, true);
    expect(parsedOptions.image).toBe('no image');
    expect(parsedOptions.urls.startsWith('some')).toBeTruthy();
  });

  it('should add meta cards to the document', () => {
    const headContent = '<title>Test Page</title>';
    document.head.innerHTML = headContent;

    const testOptions = {
      url: 'www.jestrocks.com',
      description: 'mocking DOM',
      image: 'http://i0.kym-cdn.com/photos/images/original/000/234/739/fa5.jpg',
      title: 'test title',
      customTag: 'custom tag',
    };

    // parse with no autofill
    metaCards.addCards(testOptions);

    const metaTags = document.getElementsByTagName('meta');
    expect(metaTags[0].getAttribute('property')).toBe('og:url');
    expect(metaTags[0].getAttribute('content')).toBe('www.jestrocks.com');

    // parse with autofill and override
    document.head.innerHTML = headContent;
    metaCards.addCards(testOptions, true, true);

    let metaTagsV2 = Array.from(document.getElementsByTagName('meta')).filter(tag => tag.getAttribute('name') === 'twitter:card');
    expect(metaTagsV2.length).toBe(1);
    
    metaTagsV2 = Array.from(document.getElementsByTagName('meta')).filter(tag => tag.getAttribute('property') === 'og:customTag');
    expect(metaTagsV2.length).toBe(1);
  });
});
