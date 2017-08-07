/* eslint-env browser, jquery */
/* eslint prefer-arrow-callback: "off" */
//
// Example dropdowns plugin for Shoelace
//
// This plugin demonstrates one way to add interactivity to Shoelace dropdowns. You don't need to
// initialize it. Just include jQuery along with this script and everything will just work.
//
// If you don't have a local copy of jQuery, you can load it via CDN:
//
// <script
//   src="https://code.jquery.com/jquery-3.2.1.min.js"
//   integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
//   crossorigin="anonymous"></script>
//
// Don't want to use jQuery? No problem! This is a just sample script to demonstrate how dropdowns
// can be made interactive. You can write your own to replace it using vanilla JS or any other
// library you want.
//
// Dropdowns not working?
//   - Make sure you've included this script: <script src="dropdowns.js"></script>
//   - Make sure your dropdowns are structured properly per the docs
//   - Make sure your dropdown triggers are inside the dropdown container
//
// To disable a dropdown, add the "disabled" property to <button> dropdown triggers or the
// "disabled" class to <a> and all other dropdown triggers.
//
// To programmatically show or hide a dropdown, apply the "active" class to the appropriate dropdown
// container.
//
// Dropdown containers will receive "show" and "hide" events when dropdowns are shown and hidden.
// They will also receive "select" events when a menu item is selected, where the second argument is
// the selected item.
//
if(typeof jQuery === 'undefined') {
  throw new Error('The Shoelace dropdown script requires jQuery.');
} else {
  jQuery(function($) {
    'use strict';

    $(document)
      .on('click', function(event) {
        var dropdown;
        var menu;
        var selectedItem;
        var trigger;

        // Watch for clicks on dropdown triggers
        if($(event.target).is('.dropdown-trigger')) {
          dropdown = $(event.target).closest('.dropdown');
          trigger = event.target;

          // Close other dropdowns
          $('.dropdown.active')
            .not(dropdown)
            .removeClass('active')
            .trigger('hide');

          // Ignore dropdowns that have the disabled class
          if($(trigger).is('.disabled, :disabled')) return;

          // Toggle this dropdown
          $(dropdown)
            .toggleClass('active')
            .trigger($(dropdown).is('.active') ? 'show' : 'hide');
        } else {
          menu = $(event.target).closest('.dropdown-menu');

          // Watch for clicks on menu items
          if(menu.length) {
            dropdown = $(event.target).closest('.dropdown');
            selectedItem = $(event.target).closest('a').get(0);

            // If the user selected a menu item and it's not disabled, fire the select event
            if(selectedItem && !$(selectedItem).is('.disabled')) {
              $(dropdown).trigger('select', selectedItem);
            }

            // Prevent the page from scrolling since menu items are #links
            event.preventDefault();
          }

          // Close dropdowns on all other clicks
          $('.dropdown.active')
            .removeClass('active')
            .trigger('hide');
        }
      })
      .on('keydown', function(event) {
        // Close dropdowns on escape
        if(event.keyCode === 27) {
          $('.dropdown.active')
            .removeClass('active')
            .trigger('hide');
        }
      });
  });
}
