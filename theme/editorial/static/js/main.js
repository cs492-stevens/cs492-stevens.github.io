/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $wrapper = $('#wrapper');
		var $sidebar_toggle = $('#sidebar-toggle');

		$sidebar_toggle.on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			$wrapper.toggleClass('sidebar-active');
		});

		
	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});


	// TOC Sidebar.
		// Find TOC in content
		var $tocNav = $('#main-content nav[role="doc-toc"]');

		if ($tocNav.length > 0) {
			console.log("appending toc...");

			// Create TOC sidebar
			var $tocSidebar = $('<div id="toc-sidebar"></div>');
			var $tocSpacing = $('<div class="toc-spacing"></div>');
			var $tocToggle = $('<a href="#toc-sidebar" id="toc-sidebar-toggle"></a>');
			var $tocInner = $('<div class="inner"></div>');

			// Create TOC button
			$tocSpacing.append($tocToggle);

			// Clone and move TOC content
			var $tocContent = $tocNav.clone();
			$tocInner.append($tocContent);
			$tocSidebar.append($tocInner);

			// Insert TOC sidebar BEFORE the main sidebar in DOM
			// With row-reverse, this will make it appear on the right side visually
			$tocSpacing.insertAfter($('#main > .inner'));
			$tocSidebar.insertAfter($tocSpacing);

			var $tocSidebar_inner = $tocSidebar.children('.inner');

			// Toggle.
			$tocToggle
				.on('click', function (event) {

					// Prevent default.
					event.preventDefault();
					event.stopPropagation();

					// Toggle.
					$('#main').toggleClass('toc-active');

				});

			// Events.

			// Prevent certain events inside the panel from bubbling.
			$tocSidebar.on('click touchend touchstart touchmove', function (event) {

				// >large? Bail.
				if (breakpoints.active('>large'))
					return;

				// Prevent propagation.
				event.stopPropagation();

			});

			// Hide panel on body click/tap (only on mobile/tablet).
			$body.on('click touchend', function (event) {

				// >large? Bail.
				if (breakpoints.active('>large'))
					return;

				// Check if click was on TOC sidebar or its toggle.
				if ($(event.target).closest('#toc-sidebar').length)
					return;

				// Deactivate.
				$tocSidebar.removeClass('toc-active');

			});
		}


})(jQuery);