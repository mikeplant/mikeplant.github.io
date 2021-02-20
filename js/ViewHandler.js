class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
        this.mainHeading = document.querySelector('#main-heading');
		this.main = document.querySelector('main');
        this.itemsDiv = document.querySelector('.main-content');
        this.prevDisplay = 'allItems';
    }

	// Main Display Functions -----

    displayActiveMember() {
        if(data.activeMember) {
            this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
        }
    }

	clearCurrentContent() {
		this.itemsDiv.innerHTML = '';
	}

	updateMainHeading(heading) {
		this.mainHeading.textContent = heading;
	}

	prepareMainDisplay(heading, prevDisplay) {
		this.clearCurrentContent();
		this.updateMainHeading(heading);
		this.prevDisplay = prevDisplay;
	}

	clearSearchResultsDisplay() {
		if(document.querySelector('#search-results')) {
			document.querySelector('#search-results').remove();
		}
	}

	// Update Display Functions -----

	updateItemCard(div, option) {
		const stockNum = parseInt(div.id);
		const item = library.items.filter(item => item.stockNum === stockNum);
		let updatedCard;
		const options = {
			main: () => {updatedCard = item[0].getHTML(['details', 'stockQuantity', 'button'])},
			edit: () => {updatedCard = item[0].getHTML(['details', 'editButtons'])}
		};
		options[option]();
		div.parentNode.insertBefore(updatedCard, div);
		div.remove();
	}

	updateDisplayAll(timeout) {
		window.setTimeout(() => {
			this.displayActiveMember();
			this.handleNavbarClick();
		}, timeout);
    }

	clearModalAndUpdateItemCard = (modal, modalTimeout, itemCardElement, cardTimeout, option) => {
		modals.fadeOutModal(modal, modalTimeout);
		window.setTimeout(() => {
			if(!isNaN(itemCardElement.id) && itemCardElement.id !== '')	{
				this.updateItemCard(itemCardElement, option);
			} else {
				itemCardElement.remove();
			}
		}, cardTimeout);
	}

	updateSearchResultsDisplay(option, searchItems) {
		this.clearSearchResultsDisplay();
		const displayOptions = {
			add: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'addButton']));
				});
			},
			edit: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'editButtons']));
				});
			},
			itemSearch: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
				});
			},
			inStockSearch: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.filter(item => item.isInStock()).forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
				});
			}
		}

		displayOptions[option](searchItems);
	}

	// Event Handler Functions -----

	handleNavbarClick(option = this.prevDisplay) {
        
		this.clearSearchResultsDisplay();

        const displayOptions = {
            allItems: () => {
                this.prepareMainDisplay('All Items', 'allItems');
                library.items.forEach(item => {
					this.itemsDiv.appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
                });
            },
            inStock: () => {
                this.prepareMainDisplay('All In Stock', 'inStock');
                library.getInStockItems().forEach(item => {
					this.itemsDiv.appendChild(item.getHTML(['details', 'stockQuantity', 'button']));
                });
            },
            addItem: () => {
				this.prepareMainDisplay('Add Items', 'addItem');
				this.itemsDiv.appendChild(htmlContent.getAddItemPageHTML());
            },
            editItem: () => {
                this.prepareMainDisplay('Edit Items', 'editItem');
				this.itemsDiv.appendChild(htmlContent.getSearchHTML('editSearch'));
				this.getSearchDivListener();
				
            },
			itemSearch: () => {
				this.prepareMainDisplay('Item Search', 'itemSearch');
				this.itemsDiv.appendChild(htmlContent.getSearchHTML('itemSearch'));
				this.getSearchDivListener();
			},
			inStockSearch: () => {
				this.prepareMainDisplay('In Stock Search', 'inStockSearch');
				this.itemsDiv.appendChild(htmlContent.getSearchHTML('inStockSearch'));
				this.getSearchDivListener();
			}
        };
        displayOptions[option]();
    }

	//Item Card Handlers

    handleItemCardBtnClick(e) {
		const parent = e.target.parentNode;
		const item = (!isNaN(parseInt(parent.id))) ? library.getItemByStockNum(parseInt(parent.id)) : library.getItemByStockNum(parseInt(parent.parentNode.parentNode.id));
      	const action = e.target.textContent.replace(/\s+/g, '').toLowerCase();

      	const buttonAction = {
			checkout: () => {
				if (!data.activeMember.isBanned) { 
					modals.fadeInModal(modals.getCheckOutModalHTML(), parent, '100'); 
				} else {
					alert('Member banned!');
				}
			},
			checkin: () => {
				modals.fadeInModal(modals.getCheckInModalHTML(item, data.activeMember), parent, '100');
				data.activeMember.checkInItem(item);
				this.clearModalAndUpdateItemCard(parent.querySelector('div'), '2000', parent, '2500', 'main');
			},
			confirm: () => {
				const input = parent.querySelector('#days-input');
				let rentalLength = parseInt(input.value);
				if (isNaN(rentalLength) || rentalLength <= 0) {
					input.style.border = 'red solid 1px';
					parent.querySelector('.invalid-days').style.display = 'grid';
				} else {
					modals.updateInnerHTML('confirmCheckout', parent, item, data.activeMember, rentalLength);
					data.activeMember.checkOutItem(item, rentalLength);
					this.clearModalAndUpdateItemCard(parent.parentNode, '2000', parent.parentNode.parentNode, '2500', 'main');
				}			
			},
			cancel: () => {
				this.clearModalAndUpdateItemCard(parent.parentNode, '100', parent.parentNode.parentNode, '150', 'main');
			}
      	};
      	buttonAction[action]();
    }

	handleAddItemCardBtnClick(event) {
		const action = event.target.textContent.replace(/\s+/g, '').toLowerCase();
    	const parent = event.target.parentNode;
		const buttonAction = {
			add: () => {
				const itemProperties = this.getPropertiesFromItemCard(parent);
				modals.fadeInModal(modals.getAddBookModal(), parent, '100');
				this.populateAddItemForm(parent.querySelector('form'), itemProperties);
			},
			cancel: () => {
				this.clearModalAndUpdateItemCard(parent.parentNode.parentNode, '100', parent.parentNode.parentNode, '150', 'main');
			},
			confirm: () => {
				const div = parent.parentNode.parentNode;
				const itemProperties = this.getPropertiesFromItemCard(parent);
				if(library.validateForm(parent)) {
					library.addItem(Book, itemProperties);
					if(div.classList.contains('item-card-modal')){
						modals.updateInnerHTML('confirmAddBook', parent.parentNode, itemProperties);
						this.clearModalAndUpdateItemCard(div, '2000', div, '2500', 'main');	
					} else {
						modals.fadeInModal(modals.getManualAddConfirmModal(itemProperties), parent.parentNode, '100');
						this.clearModalAndUpdateItemCard(div.querySelector('.add-book-manual-modal'), '2000', div.querySelector('.add-book-manual-modal'), '2500', 'main');
					}
				}	
			}
		}
		buttonAction[action]();
	}

	handleEditItemCardBtnClick(e) {
		const action = e.target.textContent.replace(/\s+/g, '').toLowerCase();
    	const parent = e.target.parentNode;
		const buttonAction = {
			edit: () => {
				const itemProperties = this.getPropertiesFromItemCard(parent);
				modals.fadeInModal(modals.getEditBookModal(), parent, '100');
				this.populateAddItemForm(parent.querySelector('form'), itemProperties);
			},
			remove: () => {
				const item = library.getItemByStockNum(parseInt(parent.id));
				this.handleRemoveItem(parent, item);
			},
			delete: () => {
				const itemToRemove = library.getItemByStockNum(parseInt(parent.parentNode.parentNode.id));
				library.removeItem(itemToRemove);
				modals.updateInnerHTML('confirmDeleteItem', parent, itemToRemove);
			},
			confirm: () => {
				const div = parent.parentNode.parentNode;
				const itemCardID = div.parentNode;
				const itemProperties = this.getPropertiesFromItemCard(parent);
				if(library.validateForm(parent)) {
					const item = library.getItemByStockNum(parseInt(itemCardID.id))
					item.updateDetails(itemProperties);
					modals.updateInnerHTML('confirmEditBook', parent.parentNode, itemProperties);
					this.clearModalAndUpdateItemCard(div, '2000', itemCardID, '2500', 'edit');	
				}	
			},
			cancel: () => {
				this.clearModalAndUpdateItemCard(parent.parentNode.parentNode, '100', parent.parentNode.parentNode, '150', 'edit');
			}
		};
		buttonAction[action]();
	}

	//Search Handlers

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
		viewHandler.updateSearchResultsDisplay('add', searchItems);
		document.querySelector('#search-results').addEventListener('click', (e) => {
			e.preventDefault();
			if(e.target.classList.contains('add-item-card-btn')) {
				viewHandler.handleAddItemCardBtnClick(e);
			} else if(e.target.classList.contains('edit-item-card-btn')) {
				viewHandler.handleEditItemCardBtnClick(e);
			}
		});
	}

	handleItemSearchEvent(searchTerm, event) {
		const parentClassList = [...event.target.parentNode.classList];
		let option = '';

		const eventOptions = {
			itemSearch: () => {
				viewHandler.updateSearchResultsDisplay('itemSearch', library.getItemsBySearchTerm(searchTerm));
			},
			inStockSearch: () => {
				viewHandler.updateSearchResultsDisplay('inStockSearch', library.getItemsBySearchTerm(searchTerm));
			},
			editSearch: () => {
				viewHandler.updateSearchResultsDisplay('edit', library.getItemsBySearchTerm(searchTerm));
			}
		};

		for (const clas of parentClassList) {
			if (Object.keys(eventOptions).includes(clas)) {
				option = parentClassList[parentClassList.indexOf(clas)];
			}
		}

		eventOptions[option]();
	}

	handleItemSearch(searchTerm, event) {
		this.handleItemSearchEvent(searchTerm, event);
		document.querySelector('#search-results').addEventListener('click', (e) => {
			e.preventDefault();
			if(e.target.classList.contains('edit-item-card-btn')) {
				viewHandler.handleEditItemCardBtnClick(e);
			} else if (e.target.classList.contains('item-card-btn')) {
				viewHandler.handleItemCardBtnClick(e);
			}
		});
	}

	getSearchDivListener() {
		document.querySelector('.item-search-div').addEventListener('keyup', (e) => {
			if(e.target.classList.contains('add-item-search-input')) { 
				viewHandler.handleItemSearch(document.querySelector('.add-item-search-input').value, e);
			}
		});
	}

	//Remove Handlers

	handleRemoveItem(parent, item) {
		if(!library.itemIsCurrentlyRented(item)) {
			modals.fadeInModal(modals.getConfirmRemoveModal(item), parent, '100');
		} else {
			modals.fadeInModal(modals.getRemoveNotAllowedModal(), parent, '100');
			this.clearModalAndUpdateItemCard(parent.querySelector('div'), '2500', parent, '3000', 'edit');
		}
	}

	// Other Functions -----

	getPropertiesFromItemCard(element) {
		let itemProperties = {};
		const children = Array.from(element.children);

		children.filter(child => child.classList.contains('item-property'))
			.forEach(property => itemProperties[property.id.split('-')[1]] = (property.tagName === 'SPAN') ? property.textContent : property.value);
		if (itemProperties.inStock) itemProperties.inStock = parseInt(itemProperties.inStock);
		return itemProperties;
	}

	populateAddItemForm(element, itemProperties) {
		const children = Array.from(element.children);
		children.filter(child => child.classList.contains('item-property'))
			.forEach(input => {
				if(itemProperties[input.id.split('-')[1]]) {
					element.querySelector(`#${input.id}`).value = itemProperties[input.id.split('-')[1]];
				}
			});
	}
}