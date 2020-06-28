import focusLock from 'dom-focus-lock';

export default class Header {
  constructor(element) {
    this._element = element;
    this._isMenuOpen = false;

    this._menuButton = this._element.querySelector(`.menu-button`);
    this._nav = this._element.querySelector(`.header__nav`);

    this._init();
  }

  _init() {
    this._menuButton.addEventListener(`click`, () => {
      this._toogleMenu();
    });

    window.addEventListener('resize', () => {
      let viewport = document.documentElement.clientWidth;
      if (viewport >= 1200 && this._isMenuOpen) {
        this._toogleMenu();
      }
    });
  }

  _toogleMenu() {
    if (this._isMenuOpen) {
      this._menuButton.classList.remove(`menu-button--cross`);
      this._nav.classList.add(`header__nav--close`);
      this._removeFocusModal();
    } else {
      this._menuButton.classList.add(`menu-button--cross`);
      this._nav.classList.remove(`header__nav--close`);
      this._setFocusModal();
    }
  }

  _setFocusModal() {
    focusLock.on(this._element);
    document.body.classList.add(`block-modal`);
    this._isMenuOpen = true;
  }

  _removeFocusModal() {
    focusLock.off(this._element);
    document.body.classList.remove(`block-modal`);
    this._isMenuOpen = false;
  }
}