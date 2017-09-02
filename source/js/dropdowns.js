/*!
  Shoelace.css dropdowns {{version}}
  (c) A Beautiful Site, LLC

  Released under the MIT license
  Source: https://github.com/claviska/shoelace-css
*/
//
// This script is required to make dropdowns interactive. Before loading it, you must include either
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
// Dropdowns not working?
//   - Make sure you've loaded jQuery or Zepto before this script
//   - Make sure your dropdowns are structured properly per the docs
//   - Make sure your dropdown triggers are inside the dropdown container
//
(function() {
  /* eslint-env browser, jquery */
  /* global Zepto */
  'use strict';

  if(typeof jQuery === 'undefined' && typeof Zepto === 'undefined') {
    throw new Error('Shoelace dropdowns require either jQuery or Zepto.');
  }

  (typeof jQuery === 'function' ? jQuery : Zepto)(function($) {
    $(document)
      .on('click', function(event) {
        var dropdown = $(event.target).closest('.dropdown').get(0);
        var trigger = dropdown ? $(event.target).closest('.dropdown-trigger').get(0) : null;
        var menu = dropdown ? $(event.target).closest('.dropdown-menu').get(0) : null;
        var selectedItem = menu ? $(event.target).closest('a').get(0) : null;

        // Watch for clicks on dropdown triggers
        if(trigger) {
          // Close other dropdowns
          $('.dropdown.active')
            .not(dropdown)
            .removeClass('active')
            .trigger('hide');

          // Ignore dropdowns that have the disabled class
          if($(trigger).is('.disabled, :disabled')) {
            return;
          }

          // Toggle this dropdown
          $(dropdown)
            .toggleClass('active')
            .trigger($(dropdown).is('.active') ? 'show' : 'hide');

          return;
        }

        // If the user selected a menu item, close the dropdown and fire the select event
        if(selectedItem) {
          // Don't select disabled menu items
          if($(selectedItem).is('.disabled')) {
            event.preventDefault();
            return;
          }

          // Close the dropdown and trigger the select event. The original click event is exposed to
          // the handler so it can be prevented as needed.
          $(dropdown)
            .removeClass('active')
            .trigger('hide')
            .trigger($.Event('select', event), selectedItem);

          return;
        }

        // If the click wasn't in a dropdown, hide any active dropdowns
        if(!dropdown) {
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
})();
