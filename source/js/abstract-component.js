export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }

    this.element = null;
  }

  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  getElement() {
    if (!this.element) {
      this.element = this.createElement(this.getTemplate());
    }

    return this.element;
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }
}
