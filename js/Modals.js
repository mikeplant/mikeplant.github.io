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

	getManualAddConfirmModal(item) {
		const html = this.createElement('div', 'className', 'add-book-manual-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<span class="confirm-check-in-out">${item[0]} by ${item[1]} added to library.</span>
			</div>`
		return html;
	}

	getAddBookModal() {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
		<div class="add-book-modal-content">
            <form>
              <h3>Confirm:</h3>
              <label for="add-book-title">Title: </label>
                <input type="text" id="add-book-title" required>
              <label for="add-book-author">Author: </label>
                <input type="text" id="add-book-author" required>
              <label for="add-book-series">Series: </label>
                <input type="text" id="add-book-series">
              <label for="add-book-genre">Genre: </label>
                <input type="text" id="add-book-genre">
              <label for="add-book-pages">Pages: </label>
                <input type="text" id="add-book-pages">
              <label for="add-book-isbn">ISBN: </label>
                <input type="text" id="add-book-isbn" required>
              <label for="add-book-stock-quantity">Add Stock: </label>
                <input type="text" id="add-book-stock-quantity" required>
				<button id="add-book-cancel-btn" class="selector-btn add-item-card-btn">Cancel</button><button id="add-book-confirm-btn" class="selector-btn add-item-card-btn">Confirm</button>
				<span class="required-span">Highlighted fields required</span>
              </form>
            </div>`;
		return html;
	}

	updateInnerHTML(action, element, item, user, rentalLength) {
		const html = {
			confirmCheckout: () => {
				element.innerHTML = `<span class="confirm-check-in-out">${item.title} by ${item.author} checked out by ${user.name} for ${rentalLength} days.</span>`;
			},
			confirmAddBook: () => {
				element.innerHTML = `<span class="confirm-add-item">${item[0]} by ${item[1]} added to library</span>`;
			}
		};
		html[action]();
	}	
}