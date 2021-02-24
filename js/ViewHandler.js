class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
        this.mainHeading = document.querySelector('#main-heading');
		this.main = document.querySelector('main');
        this.mainContent = document.querySelector('.main-content');
        this.prevDisplay = 'allItems';
		this.prevMember = data.activeMember;
    }

	// Display Functions -----

    displayActiveMember() {
        if(data.activeMember) {
            this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
        } else {
			this.activeMemberSpan.textContent = ``;
		}
    }

	//Display Preparation

	clearCurrentContent() {
		this.mainContent.innerHTML = '';
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

	clearUserItemsDisplay() {
		if(document.querySelector('#current-rentals')) {
			document.querySelector('#current-rentals').remove();
		}
		if(document.querySelector('#previous-rentals')) {
			document.querySelector('#previous-rentals').remove();
		}
	}

	//Handle Display

	handleMainDisplay(option = this.prevDisplay) {
        
		this.clearUserItemsDisplay();
		this.clearSearchResultsDisplay();
		this.prevMember = data.activeMember;

        const displayOptions = {
			welcome: () => {
				this.prepareMainDisplay('Welcome', 'welcome');
			},
            allItems: () => {
                this.prepareMainDisplay('All Items', 'allItems');
                library.items.forEach(item => this.mainContent.appendChild(item.getHTML(['details', 'stockQuantity', 'button'], undefined, data.activeMember)));
            },
            inStock: () => {
                this.prepareMainDisplay('All In Stock', 'inStock');
                library.getInStockItems().forEach(item => this.mainContent.appendChild(item.getHTML(['details', 'stockQuantity', 'button'], undefined, data.activeMember)));
            },
            addItem: () => {
				this.prepareMainDisplay('Add Items', 'addItem');
				this.mainContent.appendChild(htmlContent.getAddItemPageHTML());
            },
            editItem: () => {
                this.prepareMainDisplay('Edit Items', 'editItem');
				this.mainContent.appendChild(htmlContent.getSearchHTML('editSearch'));
				this.getSearchDivListener();	
            },
			activeMember: () => {
				this.prevMember = data.activeMember;
				this.displayMemberDetails(data.activeMember, 'Member Details', 'activeMember');
			},
			allMembers: () => {
				this.prepareMainDisplay('All Members', 'allMembers');
				library.users.members.forEach(member => mainContent.appendChild(member.getHTML()));
			},
			addMember: () => {
				this.prepareMainDisplay('Add Member', 'addMember');
				this.mainContent.appendChild(htmlContent.getAddMemberPageHTML());
			},
			itemSearch: () => {
				this.prepareMainDisplay('Item Search', 'itemSearch');
				this.mainContent.appendChild(htmlContent.getSearchHTML('itemSearch'));
				this.getSearchDivListener();
			},
			inStockSearch: () => {
				this.prepareMainDisplay('In Stock Search', 'inStockSearch');
				this.mainContent.appendChild(htmlContent.getSearchHTML('inStockSearch'));
				this.getSearchDivListener();
			},
			memberSearch: () => {
				this.prepareMainDisplay('Member Search', 'memberSearch');
				this.mainContent.appendChild(htmlContent.getSearchHTML('memberSearch'));
				this.getSearchDivListener();
			},
			changeActiveMember: () => {
				library.users.changeActiveMember();
			},
			clearActiveMember: () => {
				library.users.clearActiveMember();
			},
			memberDetails: () => {
				this.displayMemberDetails(this.prevMember, 'Member Details', 'memberDetails');
			}
        };
        displayOptions[option]();
    }

	displayMemberDetails(member, heading, prevDisplay) {
		this.clearUserItemsDisplay();
		this.prepareMainDisplay(heading, prevDisplay);
		this.mainContent.appendChild(htmlContent.getUserDetailsPageHTML(member));
		this.displayMemberItems(member);
	}

	displayMemberItems(member) {
		if(member) {
		this.main.appendChild(htmlContent.getCurrentRentalsDiv());
		this.main.appendChild(htmlContent.getPreviousRentalsDiv());
		member.currentRentals.forEach(item => {
			document.querySelector('#current-rentals').appendChild(item['item'].getHTML(['userCurrent', 'button'], item, member));
		});
		member.previousRentals.forEach(item => {
			document.querySelector('#previous-rentals').appendChild(item['item'].getHTML(['userPrevious', 'stockQuantity', 'button'], item, member));
		});
		}
	}

	//Update Display

	updateItemCard(div, option) {
		const stockNum = parseInt(div.id);
		const item = library.items.filter(item => item.stockNum === stockNum);
		let updatedCard;
		const options = {
			main: () => {updatedCard = item[0].getHTML(['details', 'stockQuantity', 'button'], undefined, this.prevMember)},
			edit: () => {updatedCard = item[0].getHTML(['details', 'editButtons'])}
		};
		options[option]();
		div.parentNode.insertBefore(updatedCard, div);
		div.remove();
	}

	updateDisplayAll(timeout) {
		window.setTimeout(() => {
			this.displayActiveMember();
			this.handleMainDisplay();
		}, timeout);
    }

	clearModalAndUpdateDisplay = (modal, modalTimeout, itemCardElement, cardTimeout, option) => {
		modals.fadeOutModal(modal, modalTimeout);
		window.setTimeout(() => {
			if(!isNaN(itemCardElement.id) && itemCardElement.id !== '')	{
				if(itemCardElement.classList.contains('previous-item') || itemCardElement.classList.contains('current-item')) {
					this.clearUserItemsDisplay();
					this.displayMemberDetails(this.prevMember, 'Member Details', 'allMembers');
				} else {
					this.updateItemCard(itemCardElement, option);
				}
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
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'stockQuantity', 'button',], undefined, data.activeMember));
				});
			},
			inStockSearch: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.filter(item => item.isInStock()).forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML(['details', 'stockQuantity', 'button'], undefined, data.activeMember));
				});
			},
			memberSearch: () => {
				this.main.appendChild(htmlContent.getSearchResultHTML());
				searchItems.forEach(item => {
					document.querySelector('#search-results').appendChild(item.getHTML());
				});
			}
		}

		displayOptions[option](searchItems);
	}

	// Event Handler Functions -----

	//Card Handlers

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
				this.clearModalAndUpdateDisplay(parent.querySelector('div'), '2000', parent, '2050', 'main');
				setTimeout (() => {if (data.activeMember.isBanned) { this.handleMainDisplay(); }}, 2050);
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
					this.clearModalAndUpdateDisplay(parent.parentNode, '2000', parent.parentNode.parentNode, '2050', 'main');
				}			
			},
			cancel: () => {
				this.clearModalAndUpdateDisplay(parent.parentNode, '100', parent.parentNode.parentNode, '150', 'main');
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
				this.clearModalAndUpdateDisplay(parent.parentNode.parentNode, '100', parent.parentNode.parentNode, '150', 'main');
			},
			confirm: () => {
				const div = parent.parentNode.parentNode;
				const itemProperties = this.getPropertiesFromItemCard(parent);
				if(library.validateForm(parent)) {
					library.addItem(Book, itemProperties);
					if(div.classList.contains('item-card-modal')){
						modals.updateInnerHTML('confirmAddBook', parent.parentNode, itemProperties);
						this.clearModalAndUpdateDisplay(div, '2000', div, '2500', 'main');	
					} else {
						modals.fadeInModal(modals.getManualAddConfirmModal(itemProperties), parent.parentNode, '100');
						this.clearModalAndUpdateDisplay(div.querySelector('.add-book-manual-modal'), '2000', div.querySelector('.add-book-manual-modal'), '2500', 'main');
						this.clearAllInputs('input', 150);
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
					this.clearModalAndUpdateDisplay(div, '2000', itemCardID, '2050', 'edit');	
				}	
			},
			cancel: () => {
				this.clearModalAndUpdateDisplay(parent.parentNode.parentNode, '100', parent.parentNode.parentNode, '150', 'edit');
			}
		};
		buttonAction[action]();
	}

	handleMemberCardBtnClick(e) {
		if(!isNaN(e.target.parentNode.id)) {			
			const member = library.users.getMemberByAccNum(parseInt(e.target.parentNode.id))
			this.prevMember = member;
			this.displayMemberDetails(member, 'Member Details', 'memberDetails');
		} else {
			this.displayMemberDetails(this.prevMember, 'Member Details', 'memberDetails');
		}
	}

	handleEditMemberClick(e) {
		const action = e.target.textContent.replace(/\s+/g, '').toLowerCase();
    	const parent = e.target.parentNode;
		const modal = document.querySelector('.item-card-modal');
		let member = library.users.getMemberByAccNum(parseInt(document.querySelector('#user-accNum').textContent));
		const buttonAction = {
			edit: () => {
				const userProperties = this.getPropertiesFromUserDiv(parent);
				modals.fadeInModal(modals.getEditMemberModal(), parent, '100');
				this.populateEditMemberForm(parent.querySelector('form'), userProperties);
			},
			remove: () => {
				this.handleRemoveMemberClick(parent, member);
			},
			close: () => {
				library.users.removeMember(member);
				modals.fadeInModal(modals.getRemoveMemberSuccessModal(), parent, '100');
				this.prevDisplay = 'allMembers';
				setTimeout(() => this.handleMainDisplay(), 2000);
			},
			confirm: () => {
				const userProperties = this.getPropertiesFromUserDiv(parent);
				const div = parent.parentNode.parentNode;
				if(library.validateForm(parent)) {
					member.updateDetails(userProperties);
					modals.fadeInModal(modals.getEditMemberConfirmModal(member), parent, '100');
					setTimeout(() => {
						this.clearModalAndUpdateDisplay(div, '2000', div, '2500');
						this.displayMemberDetails(member, 'Member Details', 'allMembers');
					}, '2000');
				 }	
			},
			cancel: () => {	
				this.clearModalAndUpdateDisplay(modal, '100', modal, '150');
				setTimeout(() => this.displayMemberDetails(member, 'Member Details', 'memberDetails'), 150);
			}
		};
		buttonAction[action]();
	}

	handleAddMemberBtnClick(e) {
		const form = e.target.parentNode;
		const userProperties = this.getPropertiesFromUserDiv(form);
		if (library.validateForm(form)) {
			library.users.addUser(Member, userProperties);
			modals.fadeInModal(modals.getAddMemberConfirmModal(userProperties), document.querySelector('.add-member-form-div'), 100);
			this.clearModalAndUpdateDisplay(document.querySelector('.item-card-modal'), 2000, document.querySelector('.item-card-modal'), 2100);
			this.clearAllInputs('input', 150);	
		}
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

	handleSearchEvent(searchTerm, event) {
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
			},
			memberSearch: () => {
				viewHandler.updateSearchResultsDisplay('memberSearch', library.users.getMembersBySearchTerm(searchTerm));
			}
		};

		for (const clas of parentClassList) {
			if (Object.keys(eventOptions).includes(clas)) {
				option = parentClassList[parentClassList.indexOf(clas)];
			}
		}

		eventOptions[option]();
	}

	handleSearch(searchTerm, event) {
		this.handleSearchEvent(searchTerm, event);
		document.querySelector('#search-results').addEventListener('click', (e) => {
			e.preventDefault();
			if(e.target.classList.contains('edit-item-card-btn')) {
				viewHandler.handleEditItemCardBtnClick(e);
			} else if (e.target.classList.contains('item-card-btn')) {
				viewHandler.handleItemCardBtnClick(e);
			} else if (e.target.classList.contains('member-card-btn')) {
				viewHandler.clearSearchResultsDisplay();
				viewHandler.handleMemberCardBtnClick(e);
			}
		});
	}

	getSearchDivListener() {
		document.querySelector('.search-div').addEventListener('keyup', (e) => {
			if (e.target.classList.contains('search-input')) {
				viewHandler.handleSearch(document.querySelector('.search-input').value, e);
			}
		});
	}

	//Remove Handlers

	handleRemoveItem(parent, item) {
		if(!library.itemIsCurrentlyRented(item)) {
			modals.fadeInModal(modals.getConfirmRemoveModal(item), parent, '100');
		} else {
			modals.fadeInModal(modals.getRemoveNotAllowedModal(), parent, '100');
			this.clearModalAndUpdateDisplay(parent.querySelector('div'), '2500', parent, '3000', 'edit');
		}
	}

	handleRemoveMemberClick(parent, member) {
		// if(data.activeMember) {
		// 	if(member.isActive()) {
		// 		modals.fadeInModal(modals.getRemoveMemberDisallowedModal(), parent, '100');
		// 		this.clearModalAndUpdateDisplay(document.querySelector('.item-card-modal'), '3000', document.querySelector('.item-card-modal'), '3100');
		// 	}
		// }
		if(!member.userHasAnyItem() && !member.isActive()) {
			modals.fadeInModal(modals.getConfirmRemoveMemberModal(member), parent, '100');
		} else {
			modals.fadeInModal(modals.getRemoveMemberDisallowedModal(), parent, '100');
			this.clearModalAndUpdateDisplay(document.querySelector('.item-card-modal'), '3000', document.querySelector('.item-card-modal'), '3100');
		}
	}

	// Form Handler Functions -----

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

	getPropertiesFromUserDiv(element) {
		let userProperties = {};
		const children = Array.from(element.children);

		children.filter(child => child.classList.contains('user-property'))
			.forEach(property => userProperties[property.id.split('-')[1]] = (property.tagName === 'P') ? property.textContent : property.value);
		
		return userProperties;
	}
	
	populateEditMemberForm(element, userProperties) {
		const children = Array.from(element.children);
		children.filter(child => child.classList.contains('user-property'))
			.forEach(input => {
				if(userProperties[input.id.split('-')[1]]) {
					element.querySelector(`#${input.id}`).value = userProperties[input.id.split('-')[1]];
				}
			});
	}

	clearAllInputs(inputSelector, timeout) {
		setTimeout(() => {
			const inputs = mainContent.querySelectorAll(inputSelector);
			inputs.forEach(input => input.value = '');
		}, timeout);
	}
}