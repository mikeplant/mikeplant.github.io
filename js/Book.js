class Book {
	constructor(title, author, series, genre, pages, isbn, inStock=true) {
		this.title = title;
		this.author = author;
		this.series = series;
		this.genre = genre;
		this.pages = pages;
		this.isbn = isbn;
        this.inStock = inStock;
		this.withMember;
    }
    
	getString() {
		console.log('test');
	}
}

