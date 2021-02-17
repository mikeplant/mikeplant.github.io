class HTMLContent {
    constructor() {
    }

    createElement(element, propertiesValues) {
        const newElement = document.createElement(element);
        for (const [key, value] of Object.entries(propertiesValues)) {
            newElement[key] = value;
        }
        return newElement;
    }

    getSearchResultHTML() {
        const searchContentHTML = this.createElement('div', {id: 'search-results', className: 'main-content', innerHTML: `<h2>Search Results</h2>`});
        return searchContentHTML;
    }

    getAddItemPageHTML() {
        const addItemsDiv = this.createElement('div', {
            className: 'sub-content', 
            innerHTML: `
                <div class="add-item-form-div">
                    <form class="manual-add-book-form">
                    <h3>Add a book manually:</h3>
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
                    <button class="selector-btn manual-add-book-btn">Confirm</button>
                    <span class="required-span">Highlighted fields required</span>
                    </form>
                </div>

                <div class="item-search-div add-item-search-div">
                    <h2>Search for a book:</h2>
                    <form class="add-item-search-form">
                        <input type="text" class="add-item-search-input"><button class="selector-btn item-search-div-btn">Search</button>
                    </form>
                    <p>Find a book to add to the library by any of it's properties.<br>
                        For best results use the book's title, author, or ISBN number.</p>
                </div>`
        });
        return addItemsDiv;
    }

    getEditItemPageHTML() {
        const editItemsDiv = this.createElement('div', {
            className: 'sub-content', 
            innerHTML: `
                <div class="item-search-div">
                    <h2>Search for an item:</h2>
                    <form class="item-search-form">
                        <input type="text" class="add-item-search-input"><button class="selector-btn item-search-div-btn">Search</button>
                    </form>
                    <p>Find an item in the library by any of it's properties.<br>
                        For best results use an item's title, author, or ISBN number.</p>
                </div>`
        });
        return editItemsDiv;
    }
}