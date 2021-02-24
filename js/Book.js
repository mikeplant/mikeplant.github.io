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
		this.title = itemProperties.title;
		this.author = itemProperties.author;
		this.series = itemProperties.series;
		this.genre = itemProperties.genre;
		this.pages = itemProperties.pages;
		this.isbn = itemProperties.isbn;
	}

	updateStock(option, amount) {
        const options = {
            add: () => {this.inStock += amount;},
            remove: () => {this.inStock -= amount;}
        }
		options[option]();
    }

	/**
	 * Returns html content according to params
	 * @param {array} optionsArr - An array of options to create html from.
	 * Options include: 
	 * details - full book details.
	 * stockQuantity - stock quantity of book.
	 * button - button depending on stock and if user has a copy.
	 */
	getHTML(optionsArr, item, member) {
		let div = document.createElement('div');
		div.id = this.stockNum;
		div.className = 'item-div';
		let html = '';
		let userHasItem = false;
		let selectedMemberIsActive = false;

		if(member && data.activeMember) { 
			selectedMemberIsActive = (member.isActive());
			userHasItem = member.userHasItem(this);
		};
		

		const options = {
			details: () => {
				html += `
					<strong>Title: </strong><span id="item-title" class="item-property">${this.title}</span>
					<strong>Author: </strong><span id="item-author" class="item-property">${this.author}</span>
					<strong>Series: </strong><span id="item-series" class="item-property">${this.series}</span>
					<strong>Genre: </strong><span id="item-genre" class="item-property">${this.genre}</span>
					<strong>Pages: </strong><span id="item-pages" class="item-property">${this.pages}</span>
					<strong>ISBN: </strong><span id="item-isbn" class="item-property">${this.isbn}</span>
					`;
					if(member) {
						if(userHasItem && selectedMemberIsActive) {
							if(library.returnIsOverdue(member.getRentedItem(this))) {
								html += `<span class="user-has-span overdue">Return overdue</span>`;
							} else {
								html += `<span class="user-has-span">Checked out by active user</span>`;
							}
						}
					}
			},
			userCurrent: () => {
				html += `
					<strong>Title: </strong><span id="item-title" class="item-property">${this.title}</span>
					<strong>Author: </strong><span id="item-author" class="item-property">${this.author}</span>
					<strong>Checked Out: </strong><span>${library.getDateString(item.dateCheckedOut)}</span>
					<strong>Return Due: </strong><span>${library.getDateString(item.returnDue)}</span>
					`;
					if(userHasItem && library.returnIsOverdue(member.getRentedItem(this))) {
						html += `<span class="user-has-span overdue">Return overdue</span>`;
					}

					div.classList.add('current-item');
			},
			userPrevious: () => {
				html += `
					<strong>Title: </strong><span id="item-title" class="item-property">${this.title}</span>
					<strong>Author: </strong><span id="item-author" class="item-property">${this.author}</span>
					<strong>Rental Date: </strong><span>${library.getDateString(item.dateCheckedOut)}</span>
					`;
					if(userHasItem) {
						if(library.returnIsOverdue(member.getRentedItem(this))) {
							html += `<span class="user-has-span overdue">Return overdue by selected user</span>`;
						} else {
							html += `<span class="user-has-span">Checked out by selected user</span>`;
						}
					}
					div.classList.add('previous-item');
			},

			stockQuantity: () => {
				if(this.inStock > 0) {
					html += `<p class="available">${this.inStock} in stock</p>`;
				} else {
					html += `<p class="unavailable">Out of stock</p>`;
				}
			},
			button: () => {
				if(member) {
					if(selectedMemberIsActive && this.isInStock() && !userHasItem && !member.isBanned) {
						html += `<button class="selector-btn item-card-btn">Check Out</button>`;
					} else if(selectedMemberIsActive && userHasItem) {
						html += `<button class="selector-btn item-card-btn">Check In</button>`;
					}
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

