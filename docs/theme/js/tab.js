function show_tab_class(evt, tabcls, tabname) {
	// get elements with class "tab-content <tabcls>"
	let elems = document.getElementsByClassName("tab-content " + tabcls);
	for (let i = 0; i < elems.length; i++) {
		elems[i].style.display = "none";
	}

	// get elements with class "tab-link <tabcls>"
	let buttons = document.getElementsByClassName("tab-link " + tabcls);
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].className = buttons[i].className.replace(" active", "");
	}

	// show current tab and set corresponding button active
	let active_tab = document.getElementByClassName("tab-content " + tabcls + " " + tabname);
	active_tab.style.display = "block";
	evt.currentTarget.className += " active";
}
