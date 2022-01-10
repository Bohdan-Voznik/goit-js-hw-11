import './sass/main.scss';
import ImagesApiService from './js/fetchImages';
import markupForDOM from './js/markup';
import Loader from './js/loder';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();
const loader = new Loader({ selector: '[data-action="load-more"]' });
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 150,
  animationSpeed: 150,
  fadeSpeed: 100,
});

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick(e) {
  loader.disabled();
  const markupInDom = await createMarkup(e);
  refs.gallery.insertAdjacentHTML('beforeend', markupInDom);
  scrollPage();
  loader.enabled();
  lightbox.refresh();
}

async function onFormSubmit(e) {
  e.preventDefault();
  loader.disabled();
  loader.show();
  const tag = e.target.searchQuery.value.trim();
  imagesApiService.resetSerch(tag);

  const markup = await createMarkup(e);
  refs.gallery.innerHTML = markup;
  loader.enabled();
  lightbox.refresh();
}

async function createMarkup(e) {
  const serchImages = await imagesApiService.fetchImagesByTag();
  if (serchImages.totalHits === 0) {
    Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    loader.hidden();
    return '';
  }

  if (e.type === 'submit') {
    Notify.success(`Hooray! We found ${serchImages.totalHits} images.`);
  }

  if (imagesApiService.hits >= serchImages.totalHits) {
    if (e.type !== 'submit') {
      Notify.info('We&#146;re sorry, but you&#146;ve reached the end of search results.');
    }
    loader.hidden();
  }

  return markupForDOM(serchImages.hits);
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
