import Card from './card';
import Modal from './modal';

const renderElement = (container, component) => {
  container.append(component.getElement());
};

export default class Strategies {
  constructor(element) {
    this._element = element;
    this._data = null;

    this._tagListElement = this._element.querySelector(`.strategies__tag-list`);
    this._cardListElement = this._element.querySelector(`.strategies__cards-list`);

    this._setTagListListener();
  }

  renderCards(data) {
    this._data = data;

    this._cardListElement.innerHTML = ``;
    this._data.forEach((dataItem) => {
      renderElement(this._cardListElement, new Card(dataItem));
    });

    this._setCardListListener();
  };

  _setTagListListener() {
    this._tagListElement.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`tag`)) {
        const selectedTag = evt.target;
        this._removeActiveClassTags();
        this._addActiveClassTags(selectedTag)
        this._filterCardsByTag(selectedTag);
      }
    })
  }

  _removeActiveClassTags() {
    const tags = this._tagListElement.querySelectorAll(`.tag`);
    tags.forEach((tag) => {
      tag.classList.remove(`tag--active`);
      tag.classList.add(`tag--border`);
    })
  }

  _addActiveClassTags (selectedTag) {
    selectedTag.classList.remove(`tag--border`);
    selectedTag.classList.add(`tag--active`);
  }

  _filterCardsByTag(selectedTag) {
    const cards = this._cardListElement.querySelectorAll(`.card`);
    cards.forEach((card) => {
      if (selectedTag.innerText === `All`) {
        card.classList.remove(`strategies__card--hidden`);
      } else {
        card.classList.add(`strategies__card--hidden`);
        card.querySelectorAll(`.tag`).forEach((tag) => {
          if (tag.innerText === selectedTag.innerText) {
            card.classList.remove(`strategies__card--hidden`);
          }
        })
      }
    })
  }

  _setCardListListener() {
    this._cardListElement.addEventListener('click', (evt) => {
      if (evt.target.closest('.strategies__card'))  {
        const cardId = evt.target.closest('.strategies__card').getAttribute('data-id');
        const cardData = this._data.find((dataItem) => dataItem.id === cardId);

        renderElement(document.body, new Modal(cardData))
      }
    })
  };
}