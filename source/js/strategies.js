import Card from './card';
import Modal from './modal';

const renderElement = (container, component) => {
  container.append(component.getElement());
};

export default class Strategies {
  constructor(element) {
    this.element = element;
    this.data = null;

    this.tagListElement = this.element.querySelector('.strategies__tag-list');
    this.cardListElement = this.element.querySelector('.strategies__cards-list');

    this.setTagListListener();
  }

  renderCards(data) {
    this.data = data;

    this.cardListElement.innerHTML = '';
    this.data.forEach((dataItem) => {
      renderElement(this.cardListElement, new Card(dataItem));
    });

    this.setCardListListener();
  }

  setTagListListener() {
    this.tagListElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('tag')) {
        const selectedTag = evt.target;
        this.removeActiveClassTags();
        this.addActiveClassTags(selectedTag);
        this.filterCardsByTag(selectedTag);
      }
    });
  }

  removeActiveClassTags() {
    const tags = this.tagListElement.querySelectorAll('.tag');
    tags.forEach((tag) => {
      tag.classList.remove('tag--active');
      tag.classList.add('tag--border');
    });
  }

  addActiveClassTags(selectedTag) {
    selectedTag.classList.remove('tag--border');
    selectedTag.classList.add('tag--active');
  }

  filterCardsByTag(selectedTag) {
    const cards = this.cardListElement.querySelectorAll('.card');
    cards.forEach((card) => {
      if (selectedTag.innerText === 'All') {
        card.classList.remove('strategies__card--hidden');
      } else {
        card.classList.add('strategies__card--hidden');
        card.querySelectorAll('.tag').forEach((tag) => {
          if (tag.innerText === selectedTag.innerText) {
            card.classList.remove('strategies__card--hidden');
          }
        });
      }
    });
  }

  setCardListListener() {
    this.cardListElement.addEventListener('click', (evt) => {
      if (evt.target.closest('.strategies__card')) {
        const cardId = evt.target.closest('.strategies__card').getAttribute('data-id');
        const cardData = this.data.find((dataItem) => dataItem.id === cardId);

        renderElement(document.body, new Modal(cardData));
      }
    });
  }
}
