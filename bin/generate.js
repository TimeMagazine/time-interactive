#!/usr/bin/env node

var fs = require("fs");
var mkdirp = require("mkdirp");
var ejs = require("ejs");
var ncp = require('ncp').ncp;

var args = require('minimist')(process.argv.slice(2));
var opts = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8"));

if (args.v || args.version) {
	console.log("v" + opts.version);
	return;
}

if (!args._.length) {
	console.log("Please enter an id.");
	return false;
}

var app_dir = "./";  // default to the the current directory
if (args._.length > 1) {
	app_dir = args._[1];

    // make sure app_dir ends with a / delimiter
    if (app_dir.slice(-1) != '/') {
        app_dir += '/';
    }
}

var data = {
	interactive_id: args._[0],
	version: opts.version || "*"
};

var templates = {
	index: fs.readFileSync(__dirname + "/../prototype/index.html", "utf8"),
	embed: fs.readFileSync(__dirname + "/../prototype/embed.html", "utf8"),
	debug: fs.readFileSync(__dirname + "/../prototype/debug.js", "utf8"),
	styles: fs.readFileSync(__dirname + "/../prototype/src/styles.scss", "utf8"),
	pkg: fs.readFileSync(__dirname + "/../prototype/package.json", "utf8"),
	readme: fs.readFileSync(__dirname + "/../prototype/README.md", "utf8")
};

var path = app_dir + data.interactive_id;

if (fs.existsSync(path)) {
    console.error("The path " + path + " already exists!");
    console.error("Program execution aborted!");
}

mkdirp(path, function() {
	fs.writeFileSync(path + "/index.html", ejs.render(templates.index, data));
	fs.writeFileSync(path + "/embed.html", ejs.render(templates.embed, data));
	fs.writeFileSync(path + "/debug.js", ejs.render(templates.debug, data));
	fs.writeFileSync(path + "/package.json", ejs.render(templates.pkg, data));
	fs.writeFileSync(path + "/README.md", ejs.render(templates.readme, data));
	fs.copyFileSync(__dirname + "/../prototype/screenshot.png", path + "/screenshot.png");

	mkdirp(path + "/src", function() {
		fs.writeFileSync(path + "/src/styles.scss", ejs.render(templates.styles, data));
		fs.copyFileSync(__dirname + "/../prototype/src/time-interactive.scss", path + "/src/time-interactive.scss");

		ncp(__dirname + "/../prototype/src/base.html", path + "/src/base.html", function (err) {
		 	if (err) {
		   		return console.error(err);
		 	}
		});
	});

	// copy over webpack files
	mkdirp(path + "/webpack", function() {
		ncp(__dirname + "/../prototype/webpack/webpack.config.js", path + "/webpack/webpack.config.js", function (err) {
		 	if (err) {
		   		return console.error(err);
		 	}
		});

		ncp(__dirname + "/../prototype/webpack/webpack.dev.js", path + "/webpack/webpack.dev.js", function (err) {
		 	if (err) {
		   		return console.error(err);
		 	}
		});

		ncp(__dirname + "/../prototype/webpack/webpack.prod.js", path + "/webpack/webpack.prod.js", function (err) {
		 	if (err) {
		   		return console.error(err);
		 	}
		});
	});

	mkdirp(path + "/data", function() {});
	mkdirp(path + "/code", function() {});
	mkdirp(path + "/docs", function() {});
	mkdirp(path + "/img", function() {});

	ncp(__dirname + "/../prototype/gitignore", path + "/.gitignore", function (err) {
		if (err) {
			return console.error(err);
		}
	});
});