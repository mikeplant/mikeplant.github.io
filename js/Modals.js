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

	getConfirmRemoveModal(item) {
        const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="confirm-remove-modal-content">
			<h3>Confirm Item Removal</h3>
			<span>Are you sure you want to permanently remove ${item.title} from the library?</span>
			<button id="cancel-remove-btn" class="selector-btn edit-item-card-btn">Cancel</button>
			<button id="confirm-remove-btn" class="selector-btn edit-item-card-btn">DELETE</button>
			</div>`
		return html;
    }

	getConfirmRemoveMemberModal(user) {
        const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="confirm-remove-modal-content">
			<h3>Confirm Account Closure</h3>
			<p>Are you sure you want to close ${user.name}'s account?</p>
			<button id="cancel-remove-btn" class="selector-btn edit-member-btn">Cancel</button>
			<button id="confirm-remove-btn" class="selector-btn edit-member-btn">CLOSE</button>
			</div>`
		return html;
    }

	getRemoveMemberSuccessModal() {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="confirm-remove-modal-content">
			<p>Account closed successfully</p>
			</div>`
		return html;
	}

	getRemoveMemberDisallowedModal() {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="confirm-remove-modal-content">
			<p>A Member can not be removed while they are active or have items checked out</p>
			</div>`
		return html;
	}

	getManualAddConfirmModal(item) {
		const html = this.createElement('div', 'className', 'add-book-manual-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<span class="confirm-check-in-out">${item.title} by ${item.author} added to library.</span>
			</div>`
		return html;
	}

	getAddBookModal() {
		const addBookModal = htmlContent.createElement('div', {
			className: 'item-card-modal', 
			innerHTML: `
				<div class="add-book-modal-content">
					<form>
						<h3>Confirm:</h3>
						<label for="item-title">Title: </label>
						<input type="text" id="item-title" class="item-property" required>
						<label for="item-author">Author: </label>
						<input type="text" id="item-author" class="item-property" required>
						<label for="item-series">Series: </label>
						<input type="text" id="item-series" class="item-property">
						<label for="item-genre">Genre: </label>
						<input type="text" id="item-genre" class="item-property">
						<label for="item-pages">Pages: </label>
						<input type="text" id="item-pages" class="item-property">
						<label for="item-isbn">ISBN: </label>
						<input type="text" id="item-isbn" class="item-property" required>
						<label for="item-inStock">Add Stock: </label>
						<input type="text" id="item-inStock" class="item-property" required>
						<button id="add-book-cancel-btn" class="selector-btn add-item-card-btn">Cancel</button><button id="add-book-confirm-btn" class="selector-btn add-item-card-btn">Confirm</button>
						<span class="required-span">Highlighted fields required</span>
					</form>
				</div>`
		});
		return addBookModal;
	}

	getEditBookModal() {
		const editBookModal = htmlContent.createElement('div', {
			className: 'item-card-modal', 
			innerHTML: `
				<div class="add-book-modal-content">
					<form>
						<h3>Confirm details:</h3>
						<label for="item-title">Title: </label>
						<input type="text" id="item-title" class="item-property" required>
						<label for="item-author">Author: </label>
						<input type="text" id="item-author" class="item-property" required>
						<label for="item-series">Series: </label>
						<input type="text" id="item-series" class="item-property">
						<label for="item-genre">Genre: </label>
						<input type="text" id="item-genre" class="item-property">
						<label for="item-pages">Pages: </label>
						<input type="text" id="item-pages" class="item-property">
						<label for="item-isbn">ISBN: </label>
						<input type="text" id="item-isbn" class="item-property" required>
						<span class="required-span">Highlighted fields required</span>
						<button id="add-book-cancel-btn" class="selector-btn edit-item-card-btn">Cancel</button><button id="add-book-confirm-btn" class="selector-btn edit-item-card-btn">Confirm</button>
						
					</form>
				</div>`
		});
		return editBookModal;
	}

	getEditMemberModal() {
		const editMemberModal = htmlContent.createElement('div', {
			className: 'item-card-modal edit-member-modal', 
			innerHTML: `
				<div class="add-book-modal-content">
					<form>
						<h3>Confirm details:</h3>
						<label for="user-name">Name: </label>
						<input type="text" id="user-name" class="user-property" required>
						<label for="user-age">Age: </label>
						<input type="text" id="user-age" class="user-property" required>
						<label for="user-phone">Phone: </label>
						<input type="text" id="user-phone" class="user-property" required>
						<label for="user-email">Email: </label>
						<input type="text" id="user-email" class="user-property" required>
						<label for="user-address">Address: </label>
						<input type="text" id="user-address" class="user-property" required>
						<span class="required-span">Highlighted fields required</span>
						<button id="add-book-cancel-btn" class="selector-btn edit-member-btn">Cancel</button><button id="add-book-confirm-btn" class="selector-btn edit-member-btn">Confirm</button>
						
					</form>
				</div>`
		});
		return editMemberModal;
	}

	getRemoveNotAllowedModal() {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<span class="confirm-add-item">This item can not be removed as stock is currently checked out</span>
			</div>`;
		return html;
	}

	getEditMemberConfirmModal(user) {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<p class="confirm-add-item">${user.name}'s details have been updated</p>
			</div>`;
		return html;
	}

	getAddMemberConfirmModal(user) {
		const html = this.createElement('div', 'className', 'item-card-modal');
		html.innerHTML = `
			<div class="check-in-modal-content">
			<p class="confirm-add-item">${user.name}'s account has been created</p>
			</div>`;
		return html;
	}

	updateInnerHTML(action, element, item, user, rentalLength) {
		const html = {
			confirmCheckout: () => {
				element.innerHTML = `<span class="confirm-check-in-out">${item.title} by ${item.author} checked out by ${user.name} for ${rentalLength} days.</span>`;
			},
			confirmAddBook: () => {
				element.innerHTML = `<span class="confirm-add-item">${item.title} by ${item.author} added to the library</span>`;
			},
			confirmEditBook: () => {
				element.innerHTML = `<span class="confirm-add-item">${item.title} by ${item.author} has been updated</span>`;
			},
			confirmDeleteItem: () => {
				element.innerHTML = `<span class="confirm-add-item">${item.title} has been removed from the library</span>`;
			}
		};
		html[action]();
	}	
}