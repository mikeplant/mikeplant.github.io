class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
        this.mainHeading = document.querySelector('#main-heading');
		this.main = document.querySelector('main');
        this.itemsDiv = document.querySelector('.main-content');
        this.prevDisplay = 'allItems';
    }

    displayActiveMember() {
        if(data.activeMember) {
            this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
        }
    }

    displayItems(option = this.prevDisplay, searchItems) {
        
		if(document.querySelector('#search-results')) {
			document.querySelector('#search-results').remove();
		}

        let content = ``;
        const displayOptions = {
            allItems: () => {
				this.itemsDiv.innerHTML = '';
                this.mainHeading.textContent = 'All Items';
                library.items.forEach(item => {
					this.itemsDiv.appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
                });
                this.prevDisplay = 'allItems';
            },
            inStock: () => {
				this.itemsDiv.innerHTML = '';
                this.mainHeading.textContent = 'In Stock Items';
                library.items.forEach(item => {
                    if (item.inStock > 0) {
						this.itemsDiv.appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
                    }
                });
                this.prevDisplay = 'inStock';
            },
            addItem: () => {
				this.itemsDiv.innerHTML = '';
                this.mainHeading.textContent = 'Add Items'
				let addItemsDiv = document.createElement('div');
				addItemsDiv.id = "add-items-div";
                addItemsDiv.innerHTML = `
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
                  	<form class="add-book-search-form">
						<input type="text" id="add-book-search-input"><button class="selector-btn item-search-div-btn">Search</button>
					</form>
                  <p>Find a book to add to the library by any of it's properties.<br>
                     For best results use the book's title, author, or ISBN number.</p>
                </div>`;
                this.prevDisplay = 'addItem';
				this.itemsDiv.appendChild(addItemsDiv);
            },
            editItem: () => {
				this.itemsDiv.innerHTML = '';
                this.mainHeading.textContent = 'Edit Items';
                this.prevDisplay = 'editItem';
            },
			searchResults: (searchItems) => {
				const searchContentHTML = document.createElement('div');
				searchContentHTML.id = 'search-results';
				searchContentHTML.className = 'main-content';
				searchContentHTML.innerHTML = `<h2>Search Results</h2>`;
				this.main.appendChild(searchContentHTML);

				searchItems.forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'addButton']));
				});
			}
        };
        
        displayOptions[option](searchItems);
    }

	updateItemCard(div) {
		const stockNum = parseInt(div.id);
		const item = library.items.filter(item => item.stockNum === stockNum);
		const updatedDiv = item[0].getHTML(['details', 'stockQuantity', 'button']);
		div.parentNode.insertBefore(updatedDiv, div);
		div.remove();
	}

	updateDisplayAll(timeout) {
		window.setTimeout(() => {
			this.displayActiveMember();
			this.displayItems();
		}, timeout);
    }

	clearModalAndUpdateItemCard = (modal, modalTimeout, itemCardElement, cardTimeout) => {
		modals.fadeOutModal(modal, modalTimeout);
		window.setTimeout(() => {
			if(!isNaN(itemCardElement.id) && itemCardElement.id !== '')	{
				this.updateItemCard(itemCardElement);
			} else {
				itemCardElement.remove();
			}
		}, cardTimeout);
	}

    handleItemCardBtnClick(btnText, div) {
		const item = (!isNaN(parseInt(div.id))) ? library.getItemByStockNum(parseInt(div.id)) : library.getItemByStockNum(parseInt(div.parentNode.parentNode.id));
      	const action = btnText.replace(/\s+/g, '').toLowerCase();

      	const buttonAction = {
			checkout: () => {
        		modals.fadeInModal(modals.getCheckOutModalHTML(), div, '100');
			},
			checkin: () => {
				modals.fadeInModal(modals.getCheckInModalHTML(item, data.activeMember), div, '100');
				library.users.checkInItem(data.activeMember, item);
				this.clearModalAndUpdateItemCard(div.querySelector('div'), '2000', div, '2500');
			},
			confirm: () => {
				const input = div.querySelector('#days-input');
				let rentalLength = parseInt(input.value);
				if (isNaN(rentalLength) || rentalLength <= 0) {
					input.style.border = 'red solid 1px';
					div.querySelector('.invalid-days').style.display = 'grid';
				} else {
					modals.updateInnerHTML('confirmCheckout', div, item, data.activeMember, rentalLength);
					library.users.checkOutItem(data.activeMember, item, rentalLength);
					this.clearModalAndUpdateItemCard(div.parentNode, '2000', div.parentNode.parentNode, '2500');
				}			
			},
			cancel: () => {
				this.clearModalAndUpdateItemCard(div.parentNode, '100', div.parentNode.parentNode, '150');
			}
      	};
      	buttonAction[action]();
    }

	handleAddBookSearch(data) {
		const books = data.items;
		let searchItems = [];
		for (const book of books) {
			if(book.volumeInfo.hasOwnProperty('industryIdentifiers')) {
				for (const isbnId of book.volumeInfo.industryIdentifiers) {
					if(isbnId.type === 'ISBN_13') {
						let args = [
							book.volumeInfo.title,
							book.volumeInfo.authors,
							book.volumeInfo.subtitle,
							book.volumeInfo.categories,
							book.volumeInfo.pageCount,
							isbnId.identifier
						];
						for(const property of args) {
							if(property === undefined) {
								let index = args.indexOf(property);
								args.splice(index, 1, '');
							}	
						}
						searchItems.push(new Book(...args));
					}
				}
			}
		}
		viewHandler.displayItems('searchResults', searchItems);
		document.querySelector('#search-results').addEventListener('click', (e) => {
			if(e.target.classList.contains('add-item-card-btn')) {
				e.preventDefault();
				viewHandler.handleAddItemCardBtnClick(e);
			}
		});
	}

	handleAddItemCardBtnClick(event) {
		const action = event.target.textContent.replace(/\s+/g, '').toLowerCase();
    	const parent = event.target.parentNode;
		const buttonAction = {
			add: () => {
				modals.fadeInModal(modals.getAddBookModal(), parent, '100');
			},
			cancel: () => {
				this.clearModalAndUpdateItemCard(parent.parentNode.parentNode, '100', parent.parentNode.parentNode, '150');
			},
			confirm: () => {
				console.log('confirm')
			}
		}
		buttonAction[action]();
	}
}