/*!
  Shoelace.css tabs {{version}}
  (c) A Beautiful Site, LLC

  Released under the MIT license
  Source: https://github.com/claviska/shoelace-css
*/
//
// This script is required to make tabs interactive. Before loading it, you must include either
// jQuery or Zepto. You can load them locally or via CDN. You only need one.
//
// jQuery via CDN (34.6KB)
//
//   <script
//     src="https://code.jquery.com/jquery-3.2.1.min.js"
//     integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
//     crossorigin="anonymous"></script>
//
// Zepto via CDN (9.7KB)
//
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
//
// Tabs not toggling?
//   - Make sure you've loaded jQuery or Zepto before this script
//   - Make sure your tabs are structured properly per the docs
//   - Make sure your tab navs and tab panes have the correct href and id attributes
//
(function() {
  /* eslint-env browser, jquery */
  /* global Zepto */
  'use strict';

  if(typeof jQuery === 'undefined' && typeof Zepto === 'undefined') {
    throw new Error('Shoelace tabs require either jQuery or Zepto.');
  }

  (window.jQuery || window.Zepto)(function($) {
    // Watch for mutations on tabs and show the appropriate tab pane
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Only observe class changes
        if(mutation.type === 'attributes' && mutation.attributeName === 'class') {
          var tab = $(mutation.target).get(0);
          var tabs = $(mutation.target).closest('.tabs').get(0);
          var tabsNav = $(mutation.target).closest('.tabs-nav').get(0);
          var tabPane = tab.tagName === 'A' ? $(tabs).find(tab.hash) : null;

          // The mutation must be on a tab
          if(!$(tab).is('a') || !tabs || !tabsNav) return;

          // Disabled tabs can't receive the active class, so we just remove it
          if($(tab).is('.disabled.active')) {
            $(tab).removeClass('active');
            return;
          }

          // Toggle the tab pane based on the tab's active state
          if($(tab).is('.active')) {
            // Remove the active class from other tabs
            $(tab).siblings('.active').removeClass('active');

            // Show the selected tab
            $(tabPane).addClass('active');
            $(tabs).trigger('show', tabPane);
          } else {
            // Hide the previously selected tab
            $(tabPane).removeClass('active');
            $(tabs).trigger('hide', tabPane);
          }
        }
      });
    });

    // Observe the body so we can handle dynamically created elements
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
      subtree: true
    });

    // Watch for clicks on tabs
    $(document).on('click', '.tabs-nav a', function(event) {
      // Make the selected tab active. No need to worry about disabled tabs, showing the tab pane,
      // or making other tabs inactive because the mutation observer handles everything.
      $(this).addClass('active');

      event.preventDefault();
    });
  });
})();
