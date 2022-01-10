export default class Loader {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

      if (!hidden) {
        this.hidden();
        
    }
  }

  getRefs(selector) {
    return {
      loadMoreButton: document.querySelector(selector),
      loadMoreText: document.querySelector('.load-more__text'),
      loadMoreIcon: document.querySelector('.loader'),
    };
  }

  enabled() {
    this.refs.loadMoreButton.disabled = false;
    this.refs.loadMoreText.textContent = 'Load more...';
    this.refs.loadMoreIcon.classList.add('is-hidden');
  }

  disabled() {
    this.refs.loadMoreButton.disabled = true;
    this.refs.loadMoreText.textContent = 'Loading...';
    this.refs.loadMoreIcon.classList.remove('is-hidden');
  }

  show() {
    this.refs.loadMoreButton.classList.remove('is-hidden');
  }

    hidden() {
        this.refs.loadMoreButton.classList.add('is-hidden');
  }
}
