import AbstractComponent from './abstract-component';

export default class Article extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    const {
      id,
      title,
      img,
      tags,
      size,
    } = this._data;

    const classElementMarkup = size
      ? `strategies__card strategies__card--long card` 
      : `strategies__card card`;

    const tagsMarkup = tags
      .map((tag) => `<span class="card__tag tag">${tag}</span>`)
      .join(`\n`);

    const cardMarkup = (
      `<div 
        class="${classElementMarkup}"
        data-id="${id}"
      >
        <picture>
          <img 
            class="card__img"
            src="${img.jpg_x1}"
            srcset="${img.jpg_x2} 2x"
            width="377"
            height="200"
            alt="strategies images"
          >
        </picture>
        <div class="card__content">
          <h3 class="card__title">${title}</h3>
          <div class="card__tag-list">${tagsMarkup}</div>
        </div>
      </div>`
    )

    return cardMarkup;
  }
}