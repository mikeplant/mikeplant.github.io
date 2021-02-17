class Book {
	constructor(title, author, series, genre, pages, isbn, inStock=0) {
		this.title = title;
		this.author = author;
		this.series = series;
		this.genre = genre;
		this.pages = pages;
		this.isbn = isbn;
        this.inStock = inStock;
		this.stockNum;
    }

	isInStock() {
		return (this.inStock > 0 ? true : false);
	}

	getJSON() {
        let data = {};
        data.title = this.title;
		data.author = this.author;
		data.series = this.series;
		data.genre = this.genre;
		data.pages = this.pages;
		data.isbn = this.isbn;
        data.inStock = this.inStock;
		data.stockNum = this.stockNum;

        return JSON.stringify(data);
    }

	updateDetails(itemProperties) {
		this.title = itemProperties[0];
		this.author = itemProperties[1];
		this.series = itemProperties[2];
		this.genre = itemProperties[3];
		this.pages = itemProperties[4];
		this.isbn = itemProperties[5];
	}

	/**
	 * Returns html content according to params
	 * @param {array} optionsArr - An array of options to create html from.
	 * Options include: 
	 * details - full book details.
	 * stockQuantity - stock quantity of book.
	 * button - button depending on stock and if user has a copy.
	 */
	getHTML(optionsArr) {
		let div = document.createElement('div');
		div.id = this.stockNum;
		div.className = 'item-div';
		let html = '';
		const userHasItem = library.users.userHasItem(data.activeMember, this);

		const options = {
			details: () => {
				html += `
					<strong>Title: </strong><span>${this.title}</span>
					<strong>Author: </strong><span>${this.author}</span>
					<strong>Series: </strong><span>${this.series}</span>
					<strong>Genre: </strong><span>${this.genre}</span>
					<strong>Pages: </strong><span>${this.pages}</span>
					<strong>ISBN: </strong><span>${this.isbn}</span>
					`;
					if(userHasItem) {
						if(library.returnIsOverdue(library.users.getRentedItem(data.activeMember, this))) {
							html += `<span class="user-has-span overdue">Return overdue</span>`;
						} else {
							html += `<span class="user-has-span">Checked out by active user</span>`;
						}
					}
			},
			stockQuantity: () => {
				if(this.inStock > 0) {
					html += `<p class="available">${this.inStock} in stock</p>`;
				} else {
					html += `<p class="unavailable">Out of stock</p>`;
				}
			},
			button: () => {
				if(this.isInStock() && !userHasItem) {
					html += `<button class="selector-btn item-card-btn">Check Out</button>`;
				} else if(userHasItem) {
					html += `<button class="selector-btn item-card-btn">Check In</button>`;
				}
			},
			addButton: () => {
				html += `<button class="selector-btn add-item-card-btn">Add</button>`;
			},
			editButtons: () => {
				html += `<button id="remove-item-btn" class="selector-btn edit-item-card-btn">Remove</button><button id="edit-item-btn" class="selector-btn edit-item-card-btn">Edit</button>`;
			}
		}

		for (const option of optionsArr) {
			if(options.hasOwnProperty(option)) {
				options[option]();
			}
		}

		div.innerHTML = html;
		return div;
	}
}

