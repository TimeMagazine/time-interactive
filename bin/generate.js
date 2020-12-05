#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const yesno = require('yesno');
const chalk = require('chalk');

const args = require('minimist')(process.argv.slice(2));
const settings = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8"));
const config = JSON.parse(fs.readFileSync(__dirname + "/../config.json", "utf8"));

if (args.v || args.version) {
	console.log("v" + settings.version);
	return;
}

if (!args._.length) {
	console.log("Please enter an id.");
	return false;
}

const templates = {
	index: fs.readFileSync(__dirname + "/../prototype/index.html", "utf8"),
	embed: fs.readFileSync(__dirname + "/../prototype/embed.html", "utf8"),
	debug: fs.readFileSync(__dirname + "/../prototype/debug.js", "utf8"),
	styles: fs.readFileSync(__dirname + "/../prototype/src/styles.scss", "utf8"),
	pkg: fs.readFileSync(__dirname + "/../prototype/package.json", "utf8"),
	readme: fs.readFileSync(__dirname + "/../prototype/README.md", "utf8")
};

const app_dir = "./";  // default to the the current directory

if (args._.length > 1) {
	app_dir = args._[1];

	// make sure app_dir ends with a / delimiter
	if (app_dir.slice(-1) != '/') {
		app_dir += '/';
	}
}

// make sure interactive_id DOESN'T end with a / delimiter
let interactive_id = args._[0];

if (interactive_id.slice(-1) === '/') {
	interactive_id = interactive_id.slice(0,-1);
}

// to be fed to templates
const data = {
	interactive_id: interactive_id,
	version: settings.version || "*",
	config: config
};

const PROJECT_DIR = path.resolve(app_dir, data.interactive_id);

// if this is an update, this will hold the old settings
let package_old = null;

async function checkIfUpdating() {
	if (fs.existsSync(PROJECT_DIR)) {
		let version_old = null;

		if (fs.existsSync(path.resolve(PROJECT_DIR, "package.json"))) {
			package_old = JSON.parse(fs.readFileSync(path.resolve(PROJECT_DIR, "package.json"), "utf8"));
			if (package_old.hasOwnProperty("dependencies") && package_old.dependencies.hasOwnProperty("time-interactive")) {
				version_old = package_old.dependencies["time-interactive"];
			}
		}

		if (!version_old) {
			console.log(chalk.red("Oops!") + " " + chalk.blue.bold(data.interactive_id) + " already exists in this directory but is not a " + chalk.bold("time-interactive") + " project.");
			return;
		}

		if (settings.version === version_old) {
			console.log(chalk.red("FYI: ") + chalk.blue.bold(data.interactive_id) + " already exists in this directory and is already at version " + chalk.green(version_old) + ".");
			console.log("Do you want to update it anyway?");
		} else {
			console.log(chalk.red("FYI:") + " The project " + chalk.blue.bold(data.interactive_id) + " already exists in this directory.");
			console.log("Do you want to update it to version " + chalk.green(settings.version) + " from version " + chalk.red(version_old) + "?");			
		}

		const ok = await yesno({
			question: "(y/n)"
		});

		if (!ok) {
			process.exit();
		}
	}
}

checkIfUpdating().then(() => {
	if (!package_old) {
		generateNewProject();
	} else {
		updateOldProject();
	}
});

function addOrgScripts(package) {
	// add any organization-specific scripts
	Object.keys(config.package).forEach(property => {
		// console.log("Adding property", property);
		if (!package.hasOwnProperty(property)) {
			package[property] = config.package[property];
			return;
		}
		if (typeof package[property] == "object") {
			let joined = Object.assign(package[property], config.package[property]);
		} else {
			package[property] = config.package[property];
		}
	});
}


function generateNewProject() {
	mkdirp(PROJECT_DIR).then(function() {
		let package = JSON.parse(ejs.render(templates.pkg, data));

		addOrgScripts(package);

		// re-render
		package = ejs.render(JSON.stringify(package, null, 2), data);

		fs.writeFileSync(PROJECT_DIR + "/index.html", ejs.render(templates.index, data));
		fs.writeFileSync(PROJECT_DIR + "/embed.html", ejs.render(templates.embed, data));
		fs.writeFileSync(PROJECT_DIR + "/debug.js", ejs.render(templates.debug, data));
		fs.writeFileSync(PROJECT_DIR + "/package.json", package);
		fs.writeFileSync(PROJECT_DIR + "/README.md", ejs.render(templates.readme, data));
		fs.copyFileSync(__dirname + "/../prototype/screenshot.png", PROJECT_DIR + "/screenshot.png");

		if (args.test) {
			let package = fs.readFileSync(PROJECT_DIR + "/package.json", "utf8");
			package = package.replace(/"time-interactive": ".*?"/,  `"time-interactive": "../.."`);
			fs.writeFileSync(PROJECT_DIR + "/package.json", package);
		}

		mkdirp(PROJECT_DIR + "/src").then(function() {
			fs.writeFileSync(PROJECT_DIR + "/src/styles.scss", ejs.render(templates.styles, data));
			fs.copyFileSync(__dirname + "/../prototype/src/time-interactive.scss", PROJECT_DIR + "/src/time-interactive.scss");

			ncp(__dirname + "/../prototype/src/base.html", PROJECT_DIR + "/src/base.html", function (err) {
			 	if (err) {
			   		return console.error(err);
			 	}
			});
		});

		mkdirp(PROJECT_DIR + "/data").then(function() {});
		mkdirp(PROJECT_DIR + "/code").then(function() {});
		mkdirp(PROJECT_DIR + "/docs").then(function() {});
		mkdirp(PROJECT_DIR + "/img").then(function() {});

		ncp(__dirname + "/../prototype/gitignore", PROJECT_DIR + "/.gitignore", function (err) {
			if (err) {
				return console.error(err);
			}
		});
	});
}

function updateOldProject() {
	// Now that we've moved Webpack to an external module, we no longer need any of these old development dependencies.

	let DEPRECATED = [ 'autoprefixer', '@babel/core', '@babel/plugin-transform-runtime', '@babel/preset-env', '@babel/runtime', 'babel-core', 'babel-loader', 'babel-plugin-add-module-exports', 'babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-runtime', 'babel-polyfill', 'babel-preset-es2015', 'browserify', 'css-loader', 'cssnano', 'dsv-loader', 'ejs-loader', 'extract-text-webpack-plugin', 'file-loader', 'fs-extra', 'less', 'less-loader', 'node-csvify', 'node-lessify', 'node-sass', 'node-underscorify', 'postcss-loader', 'postcss-preset-env', 'raw-loader', 'sass-loader', 'style-loader', 'underscore-template-loader', 'url-loader', 'webpack', 'webpack-cli', 'webpack-dev-server', 'webpack-merge' ];

	let package_new = JSON.parse(ejs.render(templates.pkg, data));
	addOrgScripts(package_new);

	// we're going to delicately include the old package here

	// don't touch any other prod dependencies
	Object.keys(package_old.dependencies).forEach(package_name => {
		if (!package_new.dependencies.hasOwnProperty(package_name)) {
			package_new.dependencies[package_name] = package_old.dependencies[package_name];
			console.log(`Keeping the dependency for '${ package_name }'`);
		} else {
			console.log(`Updating the dependency for '${ package_name }' to ${ package_new.dependencies[package_name] }`);
		}
	});

	// delete package_old.browserify;

	// update pre-packaged scripts
	// Object.keys(package_new.scripts).forEach(key => {
	// 	package_old.scripts[key] = package_new.scripts[key];
	// });

	// add any old dev dependencies unrelated to Webpack

	if (package_old.hasOwnProperty("devDependencies")) {
		Object.keys(package_old.devDependencies).forEach(package_name => {
			if (DEPRECATED.indexOf(package_name) === -1) {
				package_new.devDependencies[package_name] = package_old.devDependencies[package_name];
				console.log(`Transferring devDependency '${ package_name }'`)
			}
		});
	}
	// package_old.main = "debug.js";

	// we'll overwrite these .html files since they're rarely edited and since very old ones have font calls no longer used

	console.log(data);

	fs.writeFileSync(PROJECT_DIR + "/index.html", ejs.render(templates.index, data));
	fs.writeFileSync(PROJECT_DIR + "/embed.html", ejs.render(templates.embed, data));


	fs.writeFileSync(PROJECT_DIR + "/package_original.json", JSON.stringify(package_old, null, 2));
	fs.writeFileSync(PROJECT_DIR + "/package.json", JSON.stringify(package_new, null, 2));

	fs.copyFileSync(__dirname + "/../prototype/src/time-interactive.scss", PROJECT_DIR + "/src/time-interactive.scss");

	mkdirp(PROJECT_DIR + "/data").then(made => {});
	mkdirp(PROJECT_DIR + "/code").then(made => {});
	mkdirp(PROJECT_DIR + "/docs").then(made => {});
	mkdirp(PROJECT_DIR + "/img").then(made => {});

	ncp(__dirname + "/../prototype/gitignore", PROJECT_DIR + "/.gitignore", function (err) {
		if (err) {
			return console.error(err);
		}
	});

	rimraf(path.resolve(PROJECT_DIR, "webpack"), function() {
		console.log("Finished upgrading " + chalk.blue.bold(data.interactive_id) + " to version " + chalk.green(data.version));
	});
}