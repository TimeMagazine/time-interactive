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

	//MARKUP
	interactive.el.innerHTML = require("./src/base.html")();

}, true); // change this last param to true if you want to skip the DOM checks