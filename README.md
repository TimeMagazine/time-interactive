Guide to Time.com Interactives
====

[![Build Status](https://travis-ci.org/TimeMagazine/time-interactive.png)](https://travis-ci.org/TimeMagazine/time-interactive) 
[![Dependency Status](https://david-dm.org/TimeMagazine/time-interactive.svg)](https://david-dm.org/TimeMagazine/time-interactive)

v0.6.1

Our interactives at Time are developed independently from the CMS and bundled into self-assembling Javascript files using [webpack](https://webpack.github.io/). They are both discrete--requiring no dependencies--and discreet--interfering as little as possible with the rest of the page. 

You can also see the [wiki](https://github.com/TimeMagazine/time-interactive/wiki) for instructions on installation and usage. 

## Getting started

This repository provides both a [command-line script](https://github.com/TimeMagazine/time-interactive/blob/master/bin/generate.js) for generating new projects and a [client-side script](https://github.com/TimeMagazine/time-interactive/blob/master/index.js) with a few convenience functions.

## Compiling

You can compile your interactive with either `npm run build` (development), which is loaded by `index.html`, or `npm run minify`, which is loaded by `embed.html`.

### Webpack

As of v0.6.1, we're using the phenomenal Webpack 4.0, which requires minimal configuration. By default, Webpack supports [ES2015](https://kangax.github.io/compat-table/es5/). To fully support ES6 in development, we use [babel](https://babeljs.io/) to compile the JavaScript.

In cases were an old, "broken" module requires globals--here's looking at you, jQuery--the configuration file may need to be [shimmed](https://webpack.js.org/guides/shimming/) to execute correctly. This also may be required if [using underscore templates](https://github.com/difelice/ejs-loader#usage).

#### Loaders

The following types of files may be imported in `debug.js`:

+ *Text*: using [raw-loader](https://github.com/webpack-contrib/raw-loader)
+ *.css*: using [css-loader](https://webpack.js.org/loaders/css-loader). This currently _does_ resolve paths in `url()` calls. It allows uses the [autoprefixer](https://github.com/postcss/autoprefixer#webpack) plugin to ensure browser compatibility.
+ *.less* and *.scss*: You can import `.less` and `.scss` files as well using [less-loader](https://webpack.js.org/loaders/less-loader) and [sass-loader](https://webpack.js.org/loaders/sass-loader). These are also autoprefixed.
+ *.html* and *.ejs*: The [ejs-loader](https://github.com/difelice/ejs-loader) handles both `.ejs` templates and raw `.html`.
+ *.csv*, *.tsv*, *.dsv*: The [dsv-loader](https://github.com/wbkd/dsv-loader) can handle any delimited file.
+ *.png*, *.jpg*, *.jpg*, *.gif*: The [file-loader](https://webpack.js.org/loaders/file-loader) plug can import images.

#### Why is my `script-min.js` file so bug?

Of the various built-in npm commands, one, `npm run analyze`, shows you which packages are contributing the most to your minified script. This requires a global install of [webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)

	npm install -g webpack-bundle-size-analyzer