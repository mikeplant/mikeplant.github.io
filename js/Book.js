class Book {
	constructor(title, author, series, genre, pages, isbn, inStock=1) {
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

	/**
	 * Returns html content according to params
	 * @param {array} optionsArr - An array of options to create html from.
	 * Options include: 
	 * details - full book details.
	 * stockQuantity - stock quantity of book.
	 * button - button depending on stock and if user has a copy.
	 */
	getHTML(optionsArr) {
		let html = `<div id="${this.stockNum}" class="item-div">`;
		const userHasItem = library.users.userHasItem(data.activeMember, this);

		const options = {
			details: () => {
				html += `
				<p>
				<strong>Title: </strong>${this.title}<br>
				<strong>Author: </strong><span class="searchByClick">${this.author}</span><br>
				<strong>Series: </strong>${this.series}<br>
				<strong>Genre: </strong>${this.genre}<br>
				<strong>Pages: </strong>${this.pages}<br>
				<strong>ISBN: </strong>${this.isbn}<br>
				</p>
				`;
			},
			stockQuantity: () => {
				if(this.inStock > 0) {
					html += `
						<p class="available">${this.inStock} in stock</p>
					`;
				} else {
					html += `
						<p class="unavailable">Out of stock</p>
					`;
				}
			},
			button: () => {
				if(this.isInStock() && !userHasItem) {
					html += `<button class="selector-btn">Check Out</button>`;
				} else if(userHasItem) {
					html += `<button class="selector-btn">Check In</button><span class="user-has-span">Checked out by active user</span>`;
				}
			}
		}

		for (const option of optionsArr) {
			options[option]();
		}
		
		html += `</div>`;
		return html;
	}
}

