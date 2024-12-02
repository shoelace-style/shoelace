import * as Turbo from 'https://cdn.jsdelivr.net/npm/@hotwired/turbo@8.0.10/+esm';

(() => {
  if (!window.scrollPositions) {
    window.scrollPositions = {};
  }

  function preserveScroll() {
    document.querySelectorAll('[data-preserve-scroll]').forEach(element => {
      scrollPositions[element.id] = element.scrollTop;
    });
  }

  function restoreScroll(event) {
    document.querySelectorAll('[data-preserve-scroll]').forEach(element => {
      element.scrollTop = scrollPositions[element.id];
    });

    if (event.detail && event.detail.newBody) {
      event.detail.newBody.querySelectorAll('[data-preserve-scroll').forEach(element => {
        element.scrollTop = scrollPositions[element.id];
      });
    }
  }

  window.addEventListener('turbo:before-cache', preserveScroll);
  window.addEventListener('turbo:before-render', restoreScroll);
  window.addEventListener('turbo:render', restoreScroll);
})();
