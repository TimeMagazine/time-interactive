// `legend_data` is an Object of keys -> colors

module.exports = function(container_selector, legend_data) {
	var el = document.querySelector(container_selector);
	Object.keys(legend_data).forEach(label => {
		var div = document.createElement("div");
		div.classList.add("legend_item");
		div.style.borderLeft = "16px solid " + legend_data[label];
		div.innerHTML = label;
		el.appendChild(div);
	});
}