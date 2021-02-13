class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
        this.mainHeading = document.querySelector('#main-heading');
        this.itemsDiv = document.querySelector('.main-content');
        this.prevDisplay = 'allItems';
    }

    displayActiveMember() {
        if(data.activeMember) {
            this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
        }
    }

    displayItems(option = this.prevDisplay) {
        this.itemsDiv.innerHTML = '';
        let content = ``;

        const displayOptions = {
            allItems: () => {
                this.mainHeading.textContent = 'All Items';
                library.items.forEach(item => {
                  content += item.getHTML(['details', 'stockQuantity', 'button']);
                });
                this.prevDisplay = 'allItems';
            },
            inStock: () => {
                this.mainHeading.textContent = 'In Stock Items';
                library.items.forEach(item => {
                    if (item.inStock > 0) {
                      content += item.getHTML(['details', 'stockQuantity', 'button']);
                    }
                });
                this.prevDisplay = 'inStock';
            },
            addItem: () => {
                this.mainHeading.textContent = 'Add Items'
                content = `<div id="add-items-div">
                <div class="add-item-form-div">
                  <form>
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
                    <button formaction="submit" class="selector-btn">Add</button>
                  </form>
                </div>
      
                <div class="add-book-search-div">
                  <h2>Search for a book:</h2>
                  <input type="text"><button class="selector-btn">Search</button>
                  <p>Find a book to add to the library by any of it's properties.<br>
                     For best results use the book's title, author, or ISBN number.</p>
                </div>`;
                this.prevDisplay = 'addItem';
            },
            editItem: () => {
                this.mainHeading.textContent = 'Edit Items';
                this.prevDisplay = 'editItem';
            }
        };
        
        displayOptions[option]();
        this.itemsDiv.innerHTML = content;
    }

    handleSelectorBtnClick(btnText, div) {
      	const action = btnText.replace(/\s+/g, '').toLowerCase();
      	const buttonAction = {
			checkout: () => {
				const modal = modals.getCheckOutModalHTML();
				div.appendChild(modal);
				window.setTimeout(() => {
					modal.classList.add('show-modal');
				}, '100')
			},
			checkin: () => {
				library.users.checkInItem(data.activeMember, parseInt(div.id));
				this.updateDisplay();
			},
			confirm: () => {
				const modal = document.querySelector('.item-card-modal');
				const rentalLength = parseInt(document.querySelector('#days-input').value);
				const stockNum = parseInt(div.parentNode.parentNode.id);
				modal.classList.remove('show-modal');
				window.setTimeout(() => {
					library.users.checkOutItem(data.activeMember, stockNum, rentalLength);
					div.remove(document.querySelector('.item-card-modal'));
					this.updateDisplay();
				}, '100')	
			},
			cancel: () => {
				const modal = document.querySelector('.item-card-modal');
				modal.classList.remove('show-modal');
				window.setTimeout(() => {
					div.remove(document.querySelector('.item-card-modal'));
					this.updateDisplay();
				}, '100')	
			}
      	};
      	buttonAction[action]();
    }

    updateDisplay() {
		this.displayActiveMember();
		this.displayItems();
    }
}