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
// To programmatically show or hide a tab, apply the "active" class to the appropriate tab nav and
// tab pane. (Make sure to remove the "active" class from other active navs/panes first!)
//
$(function() {
  'use strict';

  // Watch for clicks on tabs
  $('.tabs-nav').on('click', 'a', function(event) {
    var tabset = $(this).closest('.tabs');
    var tab = this;

    event.preventDefault();

    // Ignore tabs without an href or with the "disabled" class
    if(!tab.hash || $(tab).is('.disabled')) return;

    // Make the selected tab active
    $(tab)
      .siblings().removeClass('active').end()
      .addClass('active');

    // Make the appropriate tab pane active
    $(tabset)
      .find('.tabs-pane').removeClass('active').end()
      .find(tab.hash).addClass('active');
  });
});
