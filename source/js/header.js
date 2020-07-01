import focusLock from 'dom-focus-lock';

export default class Header {
  constructor(element) {
    this.element = element;
    this.isMenuOpen = false;

    this.menuButton = this.element.querySelector('.menu-button');
    this.nav = this.element.querySelector('.header__nav');

    this.init();
  }

  init() {
    this.menuButton.addEventListener('click', () => {
      this.toogleMenu();
    });

    window.addEventListener('resize', () => {
      const viewport = document.documentElement.clientWidth;
      if (viewport >= 1200 && this.isMenuOpen) {
        this.toogleMenu();
      }
    });
  }

  toogleMenu() {
    if (this.isMenuOpen) {
      this.menuButton.classList.remove('menu-button--cross');
      this.nav.classList.add('header__nav--close');
      this.removeFocusModal();
    } else {
      this.menuButton.classList.add('menu-button--cross');
      this.nav.classList.remove('header__nav--close');
      this.setFocusModal();
    }
  }

  setFocusModal() {
    focusLock.on(this.element);
    document.body.classList.add('block-modal');
    this.isMenuOpen = true;
  }

  removeFocusModal() {
    focusLock.off(this.element);
    document.body.classList.remove('block-modal');
    this.isMenuOpen = false;
  }
}
