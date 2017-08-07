/* eslint-env browser, jquery */
/* eslint prefer-arrow-callback: "off" */
//
// Example tabs plugin for Shoelace
//
// This plugin demonstrates one way to add interactivity to Shoelace tabs. You don't need to
// initialize it. Just include jQuery along with this script and everything will just work.
//
// If you don't have a local copy of jQuery, you can load it via CDN:
//
// <script
//   src="https://code.jquery.com/jquery-3.2.1.min.js"
//   integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
//   crossorigin="anonymous"></script>
//
// Don't want to use jQuery? No problem! This is a just sample script to demonstrate how tabs can be
// made interactive. You can write your own to replace it using vanilla JS or any other library you
// want.
//
// Tabs not toggling?
//   - Make sure you've included this script: <script src="tabs.js"></script>
//   - Make sure your tabs are structured properly per the docs
//   - Make sure your tab navs and tab panes have the correct IDs
//
// To disable a tab, add the "disabled" class to the appropriate tab nav.
//
if(typeof jQuery === 'undefined') {
  throw new Error('The Shoelace tabs script requires jQuery.');
} else {
  jQuery(function($) {
    'use strict';

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
      $(tabNav)
        .siblings().removeClass('active').end()
        .addClass('active');

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
