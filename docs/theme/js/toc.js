/*
    Table of Contents Sidebar
*/

(function ($) {

    var $window = $(window),
        $head = $('head'),
        $body = $('body'),
        $wrapper = $('#wrapper');

    // Find TOC in content
    var $tocNav = $('#main-content nav[role="doc-toc"]');

    if ($tocNav.length > 0) {

        // Create TOC sidebar
        var $tocSidebar = $('<div id="toc-sidebar"></div>');
        var $tocInner = $('<div class="inner"></div>');

        // Clone and move TOC content
        var $tocContent = $tocNav.clone();
        $tocInner.append($tocContent);
        $tocSidebar.append($tocInner);

        // Insert TOC sidebar BEFORE the main sidebar in DOM
        // With row-reverse, this will make it appear on the right side visually
        $tocSidebar.insertBefore($wrapper.children('#sidebar'));

        var $tocSidebar_inner = $tocSidebar.children('.inner');

        // Start inactive by default (even in fullscreen)
        $tocSidebar.addClass('inactive');

        // Inactive by default on <= large.
        breakpoints.on('<=large', function () {
            $tocSidebar.addClass('inactive');
        });

        breakpoints.on('>large', function () {
            // Keep it inactive by default, user can toggle it
            // Don't auto-remove inactive class
        });

        // Hack: Workaround for Chrome/Android scrollbar position bug.
        if (browser.os == 'android'
            && browser.name == 'chrome')
            $('<style>#toc-sidebar .inner::-webkit-scrollbar { display: none; }</style>')
                .appendTo($head);

        // Toggle.
        $('<a href="#toc-sidebar" class="toggle"></a>')
            .appendTo($tocSidebar)
            .on('click', function (event) {

                // Prevent default.
                event.preventDefault();
                event.stopPropagation();

                // Toggle.
                $tocSidebar.toggleClass('inactive');

            });

        // Events.

        // Link clicks.
        $tocSidebar.on('click', 'a', function (event) {

            // Vars.
            var $a = $(this),
                href = $a.attr('href'),
                target = $a.attr('target');

            // Skip toggle button clicks (already handled above)
            if ($a.hasClass('toggle'))
                return;

            // Prevent default only for anchor links within the page.
            if (href && href.startsWith('#')) {
                event.preventDefault();
                event.stopPropagation();

                // Hide sidebar on mobile/tablet.
                if (breakpoints.active('<=large')) {
                    $tocSidebar.addClass('inactive');
                }

                // Scroll to target.
                var $target = $(href);
                if ($target.length) {
                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $target.offset().top - 100
                        }, 500);
                    }, 500);
                }
            } else if (href && href !== '#' && href !== '') {
                // External links - hide sidebar and navigate
                event.preventDefault();
                event.stopPropagation();

                // Hide sidebar.
                if (breakpoints.active('<=large')) {
                    $tocSidebar.addClass('inactive');
                }

                // Redirect to href.
                setTimeout(function () {

                    if (target == '_blank')
                        window.open(href);
                    else
                        window.location.href = href;

                }, 500);
            }

        });

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
            $tocSidebar.addClass('inactive');

        });

        // Scroll lock.
        // Note: If you do anything to change the height of the sidebar's content, be sure to
        // trigger 'resize.toc-sidebar-lock' on $window so stuff doesn't get out of sync.

        $window.on('load.toc-sidebar-lock', function () {

            var sh, wh, st;

            // Reset scroll position to 0 if it's 1.
            if ($window.scrollTop() == 1)
                $window.scrollTop(0);

            $window
                .on('scroll.toc-sidebar-lock', function () {

                    var x, y;

                    // <=large? Bail.
                    if (breakpoints.active('<=large')) {

                        $tocSidebar_inner
                            .data('locked', 0)
                            .css('position', '')
                            .css('top', '');

                        return;

                    }

                    // Calculate positions.
                    x = Math.max(sh - wh, 0);
                    y = Math.max(0, $window.scrollTop() - x);

                    // Lock/unlock.
                    if ($tocSidebar_inner.data('locked') == 1) {

                        if (y <= 0)
                            $tocSidebar_inner
                                .data('locked', 0)
                                .css('position', '')
                                .css('top', '');
                        else
                            $tocSidebar_inner
                                .css('top', -1 * x);

                    }
                    else {

                        if (y > 0)
                            $tocSidebar_inner
                                .data('locked', 1)
                                .css('position', 'fixed')
                                .css('top', -1 * x);

                    }

                })
                .on('resize.toc-sidebar-lock', function () {

                    // Calculate heights.
                    wh = $window.height();
                    sh = $tocSidebar_inner.outerHeight() + 30;

                    // Trigger scroll.
                    $window.trigger('scroll.toc-sidebar-lock');

                })
                .trigger('resize.toc-sidebar-lock');

        });

    }

})(jQuery);