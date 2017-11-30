# meta-cards [![Build Status](https://travis-ci.org/erdembircan/meta-cards.svg?branch=master)](https://travis-ci.org/erdembircan/meta-cards)

---

## A library to add open graph meta cards to HTML documents.

## Installation

`npm install meta-cards --save`

---

## Usage

```
const metaCards = require('meta-cards');

const cardOptions = {
      url: 'www.jestrocks.com',
      description: 'mocking DOM',
      image: 'http://i0.kym-cdn.com/photos/images/original/000/234/739/fa5.jpg',
      title: 'test title',
      'twitter:card' : 'summary',
      'twitter:site' : '@site',
      'twitter:creator' : '@admin',
      'custom:tag': 'very custom'
    };

metaCards.addCards(cardOptions, true, true)
```

---

# API

## addCards(options,[autofill] ,[override])

add open graph meta cards to HTML documents


#### options

Type: `object` <br>
options object containing meta properties. <br>
sub properties are documented with jsdoc for IDE auto completion.


#### [autofill=false] 

Type: `boolean`<br> 
autofill not included tags with 'no' prefix


#### [override=false]

Type: `boolean` <br>
override tags with custom properties

---

## License

Copyright © 2017, Erdem Bircan. Released under the MIT License.
