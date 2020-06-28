import AbstractComponent from './abstract-component';

const ESC_CODE = `Escape`;

export default class Modal extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  removeElement() {
    this._removeListeners();

    this._element.remove();
    this._element = null;
  }

  getTemplate() {
    const {
      id,
      title,
      img,
      tags,
      content,
    } = this._data;

    const tagsMarkup = tags
      .map((tag) => `<span class="modal__tag tag">${tag}</span>`)
      .join(`\n`);

    const modalMarkup = (
      `<div class="overlay" data-id="${id}">
        <div class="modal">
          <button class="modal__button-close">
            <svg width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4239 10.5172L20.6009 2.33999C21.1331 1.80809 21.1331 0.948089 20.6009 0.416194C20.069 -0.115701 19.209 -0.115701 18.6771 0.416194L10.4999 8.59343L2.3229 0.416194C1.79076 -0.115701 0.931004 -0.115701 0.399108 0.416194C-0.133036 0.948089 -0.133036 1.80809 0.399108 2.33999L8.5761 10.5172L0.399108 18.6945C-0.133036 19.2263 -0.133036 20.0863 0.399108 20.6182C0.664184 20.8836 1.01272 21.0169 1.361 21.0169C1.70929 21.0169 2.05758 20.8836 2.3229 20.6182L10.4999 12.441L18.6771 20.6182C18.9425 20.8836 19.2907 21.0169 19.639 21.0169C19.9873 21.0169 20.3356 20.8836 20.6009 20.6182C21.1331 20.0863 21.1331 19.2263 20.6009 18.6945L12.4239 10.5172Z"/>
              </svg>
            <span class="visually-hidden">Закрыть</span>
          </button>
          <picture>
            <img
              class="modal__img" 
              src="${img.jpg_x1}" 
              srcset="${img.jpg_x2} 2x" 
              width="675" 
              height="357" 
              alt="strategies images"
            >
          </picture>
          <div class="modal__content">
            <p class="modal__date">12/12/2020</p>
            <h3 class="modal__title">${title}</h3>
            <p class="modal__text">${content}</p>
            <div class="modal__tag-list">${tagsMarkup}</div>
          </div>
        </div>
      </div>`
    )

    return modalMarkup;
  }

  setListeners() {
    this.getElement().querySelector(`.modal__button-close`).addEventListener(`click`, this._closeButtonClickHandler);
    this.getElement().addEventListener(`click`, this._overlayClickHandler);
    document.addEventListener(`keydown`, this._escKeydownHandler)
  }

  _removeListeners() {
    this.getElement().querySelector(`.modal__button-close`).removeEventListener(`click`, this._closeButtonClickHandler);
    this.getElement().removeEventListener(`click`, this._overlayClickHandler);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }

  _closeButtonClickHandler(){
    this.removeElement();
  }

  _overlayClickHandler(evt) {
    if (evt.target.classList.contains('overlay')) {
      this.removeElement();
    }
  }

  _escKeydownHandler(evt) {
    if (evt.key === ESC_CODE) {
      evt.preventDefault();
      this.removeElement();
    }
  }
}