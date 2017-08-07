/*!
  Shoelace.css tabs {version}
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
//   - Make sure your tab navs and tab panes have the correct IDs
//
(function() {
  /* eslint-env browser, jquery */
  /* global Zepto */
  'use strict';

  if(typeof jQuery === 'undefined' && typeof Zepto === 'undefined') {
    throw new Error('Shoelace tabs require either jQuery or Zepto.');
  } else {
    (window.jQuery || window.Zepto)(function($) {
      // Watch for clicks on tabs
      $(document).on('click', '.tabs-nav a', function(event) {
        var tabs = $(this).closest('.tabs');
        var tabNav = this;
        var selectedPane = $(tabs).find(tabNav.hash).get(0);

        event.preventDefault();

        // Ignore tabs without an href or with the "disabled" class
        if(!tabNav.hash || $(tabNav).is('.disabled')) {
          return;
        }

        // Make the selected tab active
        $(tabNav).siblings().removeClass('active');
        $(tabNav).addClass('active');

        // Hide active tab panes that aren't getting selected
        $(tabs).find('.tabs-pane.active').not(selectedPane).each(function() {
          $(this).removeClass('active');
          $(tabs).trigger('hide', this);
        });

        // Show the selected tab pane
        if(selectedPane && !$(selectedPane).is('.active')) {
          $(selectedPane).addClass('active');
          $(tabs).trigger('show', selectedPane);
        }
      });
    });
  }
})();
