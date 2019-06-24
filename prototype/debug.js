/*global require,console*/

const time = require('time-interactive');
// import { select, selectAll, event } from 'd3-selection'; // Common convenience. Requires `npm install d3 --save`

require("./src/time-interactive.scss");	// default styles for all interactives. Change if necessary.
require("./src/styles.scss");			// project-specific styling

time("<%= interactive_id %>", function(interactive) {
	"use strict";

	if (!interactive) {
		console.log("Interactive <%= interactive_id %> not initiated. Exiting.");
		return;
	}

	// const PREFIX = "http://time-static-shared.s3-website-us-east-1.amazonaws.com/interactives/<%= interactive_id %>/";
	// const PREFIX = "//assets.time.com/interactives/<%= interactive_id %>/";
	const PREFIX = "./";

	//MARKUP
	interactive.el.innerHTML = require("./src/base.html")();
	// let el = select(interactive.el); // useful if you've included d3 select

}, true); // change this last param to true if you want to skip the DOM checks