## aframe-lounge-component

[![Version](http://img.shields.io/npm/v/aframe-lounge-component.svg?style=flat-square)](https://npmjs.org/package/aframe-lounge-component)
[![License](http://img.shields.io/npm/l/aframe-lounge-component.svg?style=flat-square)](https://npmjs.org/package/aframe-lounge-component)

A [Lounge component for A-Frame](https://jgbarah.github.io/aframe-lounge-component).

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-lounge-component@1.0.0/dist/aframe-lounge-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity lounge="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-lounge-component
```

Then require and use.

```js
require('aframe');
require('aframe-lounge-component');
```

## Tests, screenshots, and screencasts

For producing screenshots and running tests, run, in a terminal
(to launch a web server for serving the examples and tests):

```
$ npm start
```

And in another terminal (to actually run the tests):

```
$ npm run test
```

This command will also produce screenshots, in `tests/screenshots`

For producing the screencasts (in `cypress/movies`),
run (while also having the web server running):

```
$ npx cypress-movie
```

To produce screencasts for a single test file (`test.js`), run:

```
$ npx cypress-movie --spec tests/test.js
```

## Credits
### Textures

* [Floor-lounge texture](https://www.flickr.com/photos/seier/4342331255),
by seier+seier in Flickr (license: CC by 2.0).

![](assets/floor-texture.jpg)

### 360 images

* [360 panorama](https://www.flickr.com/photos/songularity/29966901235/),
by Erythro Asimov in Flickr (license: CC by-sa 2.0).

![](assets/360-panorama.jpg)
