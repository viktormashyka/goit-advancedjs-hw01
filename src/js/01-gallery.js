// Add imports above this line
import { galleryItems } from './gallery-items';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    el =>
      `<li class="gallery__item">
  <a class="gallery__link" href=${el.original}>
    <img class="gallery__image" src=${el.preview} alt=${el.description} title=${el.description}/>
  </a>
</li>`
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', markup);

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captions: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});
