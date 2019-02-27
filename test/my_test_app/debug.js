/*global require,console*/

const time = require('../../index');
// import { select, selectAll, event } from 'd3-selection'; // Common convenience. Requires `npm install d3 --save`

require("./src/time-interactive.scss");	// default styles for all interactives. Change if necessary.
require("./src/styles.scss");			// project-specific styling

time("my_test_app", function(interactive) {
	"use strict";

	if (!interactive) {
		console.log("Interactive my_test_app not initiated. Exiting.");
		return;
	}

	//MARKUP
	interactive.el.innerHTML = require("./src/base.html")();

	console.log("Is touch device?", time.is_touch_device);

	let arr = [1,2,3,4,5];

	console.log(shuffle(arr));

}, true); // change this last param to true if you want to skip the DOM checks