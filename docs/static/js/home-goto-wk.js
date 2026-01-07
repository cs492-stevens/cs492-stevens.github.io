window.onload = function() {
  const weeks = {
    "wk1": [2026, 0, 24],
    "wk2": [2026, 0, 31],
    "wk3": [2026, 1, 7],
    "wk4": [2026, 1, 14],
    "wk5": [2026, 1, 21],
    "wk6": [2026, 1, 28],
    "wk7": [2026, 2, 7],
    "wk8": [2026, 2, 14],
    "wk9": [2026, 2, 21],
    "wk10":[2026, 2, 28], 
    "wk11": [2026, 3, 4],
    "wk12": [2026, 3, 11],
    "wk13": [2026, 3, 18],
    "wk14": [2026, 3, 25],
    "wk15": [2026, 4, 2],
    "wk16": [2026, 4, 9],
  }

  const today = new Date();
  let anchor = "wk17";
  for (const [wk, date] of Object.entries(weeks)) {
    const wkdate = new Date(...date)
    if (today < wkdate) {
      anchor = wk;
      break;
    }
  }

  // document.getElementById("goto-wk").href = "#" + anchor;
  const btn = document.querySelector('#goto-wk')
  btn.addEventListener('click', function() {
    const target = document.getElementById(anchor);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
};