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
	 * @param {boolean} details - Prints full book details.
	 * @param {boolean} stockQuantity - Prints stock quantity.
	 * @param {boolean} button - Prints button depending on if in stock and if user has book.
	 */
	getHTML(details, stockQuantity, button) {
		let toPrint = '';

		if(details) {
			toPrint += `
				<p>
				<strong>Title: </strong>${this.title}<br>
				<strong>Author: </strong><span class="searchByClick">${this.author}</span><br>
				<strong>Series: </strong>${this.series}<br>
				<strong>Genre: </strong>${this.genre}<br>
				<strong>Pages: </strong>${this.pages}<br>
				<strong>ISBN: </strong>${this.isbn}<br>
				</p>
				`;
		}

		if(stockQuantity) {
			if(this.inStock > 0) {
				toPrint += `
					<p class="available">${this.inStock} in stock</p>
				`;
			} else {
				toPrint += `
					<p class="unavailable">Out of stock</p>
				`;
			}
		}

		if(button) {
			if(this.inStock > 0) {
				toPrint += `
					<button class="selector-btn">Check Out</button>
				`;
			}
		}

		return toPrint;
	}
}

