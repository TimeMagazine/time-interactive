The TIME.com Interactive Bootstrapper
====

v0.7.8

This repository provides both a [command-line script](https://github.com/TimeMagazine/time-interactive/blob/master/bin/generate.js) for generating new projects and a [client-side script](https://github.com/TimeMagazine/time-interactive/blob/master/index.js) with a few convenience functions.

This framework is extensively documented in the [Wiki](https://github.com/TimeMagazine/time-interactive/wiki), but here's a reminder of the base commands when getting started. Let's assume you have a directory called `apps`:

	serve

This will [fire up a mini HTTPS server](https://github.com/TimeMagazine/time-interactive/wiki/Previewing-and-Deploying#https), which I recommend redirecting to `https://local.time.com`.

	# Cmd+T for a new Terminal tab
	time-interactive my_awesome_app_2021 # creates the bootstrapped new app
	cd my_awesome_app_2021
	npm install # install base dependencies

(I use [PNPM](https://pnpm.io/) to avoid a lot of rendundant `node_modules` files).

	npm run watch

Now, every time you modify a file, you'll be able to reload `https://local.time.com/my_awesome_app/index.html`.

Again, it's all in the [Wiki]((https://github.com/TimeMagazine/time-interactive/wiki))!

# LICENSE

Copyright (C) TIME, LLC - All Rights Reserved
By Chris Wilson (@wilson428), 2021