Source files for <%= interactive_id %>
=====

## Building

You must have [`bundle-module`](https://www.npmjs.com/package/bundle-module) globally installed:

	npm install -g bundle-module

While developing, you can run

	npm run watch

And when ready to minify:

	npm run minify

## Local hosting

To spin up a local server, you have two options: 

###HTTP

If you're not making any external calls that require https, a vanilla localhost like [http-server](https://www.npmjs.com/package/http-server) should work fine:
	
	npm install http-server -g
	http-server -p 8081 -a 127.0.0.1

###HTTPS

If you needs to simulate an HTTPS environment, use [https-localhost](https://www.npmjs.com/package/https-localhost)

	sudo serve ./apps

## Sources, Scripts and Notes

Please list:

+ Links to any external data used, 
+ Any CLI commands used or descriptions of code for cleaning and analyzing that data, all of which should live in the `/code` directory.
+ All thank yous to open-source modules used, StackOverflow posts consulted, and so forth