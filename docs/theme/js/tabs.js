function show_tab_class(evt, tabcls, tabname) {
	// get elements with class "tab-content <tabcls>"
	console.log(evt, tabcls, tabname)
	let elems = document.getElementsByClassName("tab-content " + tabcls);
	for (let i = 0; i < elems.length; i++) {
		elems[i].className = elems[i].className.replace(" active", "");
		if (elems[i].className.includes(tabname)) {
			elems[i].className += " active";
		}
		console.log(elems[i].className)
	}

	// get elements with class "tab-link <tabcls>"
	let buttons = document.getElementsByClassName("tab-link " + tabcls);
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].className = buttons[i].className.replace(" active", "");
		if (buttons[i].className.includes(tabname)) {
			buttons[i].className += " active";
		}
	}
}
