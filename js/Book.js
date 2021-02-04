class Book {
	constructor(title, author, series, genre, pages, isbn, inStock=true) {
		this.title = title;
		this.author = author;
		this.series = series;
		this.genre = genre;
		this.pages = pages;
		this.isbn = isbn;
        this.inStock = inStock;
        this.itemId = this.assignItemId();
    }
    
    assignItemId() {
        const prevRef = library.usedItemIds.slice(-1);
        const itemId = prevRef[0] + 1;
        library.usedItemIds.push(itemId);
        return itemId;
    }
}

