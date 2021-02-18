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

    getItemSearchDiv() {
        return `
        <div class="item-search-div">
            <h2>Search for an item:</h2>
            <form class="item-search-form">
                <input type="text" class="add-item-search-input"><button class="selector-btn item-search-div-btn">Search</button>
            </form>
            <p>Find an item in the library by any of it's properties.<br>
                For best results use an item's title, author, or ISBN number.</p>
        </div>`
    }

    getSearchHTML(type) {
        const searchHTML = this.createElement('div', {
            className: 'sub-content', 
            innerHTML: `${this.getItemSearchDiv()}`
        });
        searchHTML.querySelector('form').classList.add(type);
        return searchHTML;
    }
}