
    function show_tab_class(evt, tabcls, tabname) {
      // get elements with class "tab-content <tabcls>"
      let elems = document.getElementsByClassName("tab-content " + tabcls);
      for (let i = 0; i < elems.length; i++) {
        elems[i].className = elems[i].className.replace(" selected", "");
        if (elems[i].className.includes(tabname)) {
          elems[i].className += " selected";
        }
      }

      // get elements with class "tab-link <tabcls>"
      let buttons = document.getElementsByClassName("btn tab-btn " + tabcls);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" selected", "");
        if (buttons[i].className.includes(tabname)) {
          buttons[i].className += " selected";
        }
      }
    }
    