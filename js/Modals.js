class Modals {
    constructor() {
    }

	fadeInModal(modal, element, timeout) {
		element.appendChild(modal);
		  window.setTimeout(() => {
			  modal.classList.add('show-modal');
		  }, timeout);
  	}

	fadeOutModal(modal, timeout) {
		
		window.setTimeout(() => {
			modal.classList.remove('show-modal');
			//element.removeChild(modal);
		}, timeout);
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
			<p></p>
			<label for="days-input">Rental length in days:</label>
			<input type="text" id="days-input">
			<span class="invalid-days">Please enter a rental length</span>
			<button id="cancel-checkout-btn" class="selector-btn item-card-btn">Cancel</button>
			<button id="confirm-checkout-btn" class="selector-btn item-card-btn">Confirm</button>
			</div>`
		return html;
    }

	getCheckInModalHTML(item, user) {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<span class="confirm-check-in-out">${item.title} returned to library.</span>
			</div>`
		return html;
	}

	updateInnerHTML(action, element, item, user, rentalLength) {
		const html = {
			confirmCheckout: () => {
				element.innerHTML = `<span class="confirm-check-in-out">${item.title} by ${item.author} checked out by ${user.name} for ${rentalLength} days.</span>`;
			}
		};
		html[action]();
	}	
}