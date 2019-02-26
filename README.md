Guide to Time.com Interactives
====

[![Build Status](https://travis-ci.org/TimeMagazine/time-interactive.png)](https://travis-ci.org/TimeMagazine/time-interactive) 
[![Dependency Status](https://david-dm.org/TimeMagazine/time-interactive.svg)](https://david-dm.org/TimeMagazine/time-interactive)

v0.5.7

Our interactives at Time are developed independently from the CMS and bundled into self-assembling Javascript files using [webpack](https://webpack.github.io/). They are both discrete--requiring no dependencies--and discreet--interfering as little as possible with the rest of the page. 

The use of webpack loaders, including [babel](https://babeljs.io/), allows developers to include all the (reasonably-sized) files they need in `debug.js`: HTML, CSS, LESS, SASS, images, and any modern Javascript conventions.

This repository provides both a [command-line script](https://github.com/TimeMagazine/time-interactive/blob/master/bin/generate.js) for generating new projects and a [client-side script](https://github.com/TimeMagazine/time-interactive/blob/master/index.js) with a few convenience functions.

Please see the [wiki](https://github.com/TimeMagazine/time-interactive/wiki) for instructions on installation and usage. 

Of the various built-in npm commands, one, `npm run analyze`, shows you which packages are contributing the most to your minified script. This requires a global install of [webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)

	npm install -g webpack-bundle-size-analyzer