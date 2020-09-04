import {
  getCookie,
  setCookie,
  removeAllCookies
} from './services/cookie';

/**
 * Root class for cookies-notification
 */
class CookiesNotification {
  /**
   * Instance of CookiesNotification
   * @param {object} options This parameter is an object, it is considered the options object.
   */
  constructor(options) {

    /**
     * @type {object} DOM element of plugin
     */
    this.elementDOM;

    /**
     * All default options to start plugin
     * @type {object}
     * @property {object} container Root element to container DOM of plugin
     * @property {string} message Define consent text to show in the dialog box
     * @property {string} confirmButton Accept button text value
     * @property {boolean} showCancelButton Enable render of the cancel button
     * @property {string} cancelButton Decline button text value
     * @property {string} position Set the default position to render on DOM element
     * @property {string} borderColor Custom DOM element border color
     * @property {number} remember Total days to remind the user renew consent
     * @property {function} onRender Callback function is executed after every CookiesNotification render
     * @property {function} onConfirm Callback function is executed after click event on confirm (accept) button
     * @property {function} onCancel Callback function is executed after click event on cancel (decline) button
     */
    this.defaults = {
      container: document.body,
      message: 'We use cookies and others technologies to make interactions with our services easy and meaningful. By continuing to use this site you are giving us your consent to do this.',
      confirmButton: 'Got it',
      showCancelButton: false,
      cancelButton: 'Decline',
      position: 'left',
      borderColor: '#333333',
      remember: 365,
      onRender: null,
      onConfirm: null,
      onCancel: null
    };

    /**
     * Merge all defaults with param options
     * @type {object}
     */
    this.settings = Object.assign({}, this.defaults, options);

    // Check if cookies was accepted to render DOM element
    if (!this.cookiesWasAccept()) {
      this.render(this.settings.container);
    }
  }

  /**
   * Set DOM element to visible
   * @return null
   */
  showElement() {
    const visibleClass = 'cookies-notification__element--visible';
    if (!this.elementDOM.classList.contains(visibleClass)) {
      this.elementDOM.classList.add(visibleClass);
    }
  }

  /**
   * Set DOM element to hidden
   * @return null
   */
  hideElement() {
    this.elementDOM.classList.remove('cookies-notification__element--visible');
  }

  /**
   * Check if local cookies was accepted by user
   * @return {boolean} cookie existence (false if cookie is not found)
   */
  cookiesWasAccept() {
    return getCookie('CookiesNotification') === 'accept';
  }

  /**
   * Define a cookie with accept value
   * @return {object} cookie value
   */
  setAcceptCookies() {
    return setCookie('CookiesNotification', 'accept', { expires: this.settings.remember });
  }

  /**
   * If decline terms, remove all local cookies and storage
   * @return null
   */
  removeAllCookies() {
    // Clear all cookies
    removeAllCookies();

    // Clear all LocalStorage data
    localStorage.clear();
  }

  /**
   * Handles confirm (accept) button click
   * @param {object} event Contains the event target
   */
  handleAcceptCookies(event) {
    event.preventDefault();

    this.setAcceptCookies();
    this.hideElement();

    this.onConfirm();
  }

  /**
   * Handles cancel (decline) button click
   * @param {object} event Contains the event target
   */
  handleDeclineCookies(event) {
    event.preventDefault();

    this.removeAllCookies();
    this.hideElement();

    this.onCancel();
  }

  /**
   * Executes after every CookiesNotification render
   * @return null
   */
  onRender() {
    if (typeof this.settings.onRender === 'function')
      this.settings.onRender(this.elementDOM);
  }

  /**
   * Executes after click event on confirm (accept) button
   * @return null
   */
  onConfirm() {
    if (typeof this.settings.onConfirm === 'function')
      this.settings.onConfirm(this.elementDOM);
  }

  /**
   * Executes after click event on cancel (decline) button
   * @return null
   */
  onCancel() {
    if (typeof this.settings.onCancel === 'function')
      this.settings.onCancel(this.elementDOM);
  }

  /**
   * Remove element instance from DOM
   * @return null
   */
  clear() {
    if (this.elementDOM) {
      this.elementDOM.remove();
      this.elementDOM = null;
    }
  }

  /**
   * Render notification as per options
   * @param {object} containerEl Root container (parent) to DOM element
   */
  render(containerEl) {
    this.clear();

    // Main element
    this.elementDOM = document.createElement('div');
    this.elementDOM.classList.add('cookies-notification__element');

    // Fix element position
    this.elementDOM.classList.add(this.settings.position === 'left' ? 'cookies-notification__element--position-left' : 'cookies-notification__element--position-right');

    // Set element border
    this.elementDOM.style.borderTopColor = this.settings.borderColor;

    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('cookies-notification__wrapper');

    // Message text to show on alert
    const messageEl = document.createElement('p');
    messageEl.classList.add('cookies-notification__message');
    messageEl.innerHTML = this.settings.message;

    wrapperEl.appendChild(messageEl);

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('cookies-notification__actions');

    // Confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.classList.add('cookies-notification__button', 'cookies-notification__button--confirm');
    confirmBtn.innerHTML = this.settings.confirmButton;
    confirmBtn.onclick = e => this.handleAcceptCookies(e);

    actionsEl.appendChild(confirmBtn);

    // Decline button
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.classList.add('cookies-notification__button', 'cookies-notification__button--cancel');
    cancelBtn.innerHTML = this.settings.cancelButton;
    cancelBtn.onclick = e => this.handleDeclineCookies(e);

    if (this.settings.showCancelButton) {
      actionsEl.appendChild(cancelBtn);
    }

    wrapperEl.appendChild(actionsEl);

    this.elementDOM.appendChild(wrapperEl);

    // Apply to container
    containerEl.appendChild(this.elementDOM);

    // Show element with a small delay
    setTimeout(() => {
      this.showElement();
      this.onRender();
    }, 750);
  }
}

export default CookiesNotification;
