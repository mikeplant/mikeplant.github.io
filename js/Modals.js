class Modals {
    constructor() {
    }

    createElement(elementName, property, value) {
      const newElement = document.createElement(elementName);
      newElement[property] = value;
      return newElement;
  }

    getCheckOutModalHTML() {
        const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="check-out-modal-content">
			<h3>Confirm Check Out</h3>
			<label for="days-input">Rental length in days:</label>
			<input type="text" id="days-input">
			<button id="cancel-checkout-btn" class="selector-btn">Cancel</button>
			<button id="confirm-checkout-btn" class="selector-btn">Confirm</button>
			</div>`
		return html;
    }
}