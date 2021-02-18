class Library {
    constructor() {
        this.items = [];
        this.users = new Users();
        this.rentCounter = {};
        this.usedStockNums = [99];
    }

    // Get item Functions

    getItemByStockNum(stockNum) {
        for (const item of this.items) {
            if(item.stockNum === stockNum) {
                return item;
            }
        } 
	}

    getItemsBySearchTerm(searchTerm) {
        const sTerm = searchTerm.toLowerCase().trim();
        let searchResults = [];
        for (const item of this.items) {
            if (Object.values(item).toString().toLowerCase().includes(sTerm)) {
                searchResults.push(item);
            };
        }
        return searchResults;
    }

    getInStockItems() {
        let inStockItems = [];
        for (const item of this.items) {
            if (item.inStock > 0) {
                inStockItems.push(item);
            }
        }
        return inStockItems;
    }

    getItemByPropertyValue(item, property) {
        return this.items.find(existingItem => existingItem[property] === item[property]);
    }

    itemExists(item) {
        if(item.isbn) {
            return this.items.some(existingItem => existingItem.isbn === item.isbn);
        }
    }

    // Add or remove item functions

    createItem(type, argsObj) {
        const newItem = new type();
        
        for (const [key, value] of Object.entries(argsObj)) {
            newItem[key] = value;
        }

        return newItem;
    }

    assignStockNum(newItem) {
        const prevRef = this.usedStockNums.slice(-1);
        const stockNum = prevRef[0] + 1;
        this.usedStockNums.push(stockNum);
        newItem.stockNum = stockNum;        
    }

    /**
     * Creates an item, adds a stockNum and adds it to the library.
     * @param {Class} type - A class type to be instantiated. eg Book
     * @param {Object} argsObj - The required arguments for the class.
     */
    addItem(type, itemToAdd) {
        if(this.itemExists(itemToAdd)) {
            this.getItemByPropertyValue(itemToAdd, 'isbn').inStock += itemToAdd.inStock;
        } else {
            const newItem = this.createItem(Book, itemToAdd);
            this.assignStockNum(newItem);
            this.items.push(newItem);
        }

        data.saveItems();
    }

    removeItem(item) {
        this.items = this.items.filter(itemToRemove => itemToRemove.stockNum !== item.stockNum);
    }

    // Date functions

    getReturnDate(rentalLength) {
        const date = new Date();
        date.setDate(date.getDate() + rentalLength);
	    return date;
    }

    returnIsOverdue(rentedItem) {
        const returnDate = rentedItem.returnDue;
        const today = new Date();
        return (today > returnDate)? true : false;
    }

    getDateString(date) {
        return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    }

    // Other functions

    updateRentCounter(item) {
        const itemStockNum = item.stockNum.toString();
        if(this.rentCounter.hasOwnProperty(itemStockNum)) {
            this.rentCounter[itemStockNum]++;
        } else {
            this.rentCounter[itemStockNum] = 1;
        }
        data.saveItems();
    }

    validateForm(form) {
        const children = form.children;
        let isValid = true;
        form.querySelector('.required-span').style.display = 'none';
        for (const child of children) {
            if (child.hasAttribute('required') && child.value.trim() === '') {
                form.querySelector('.required-span').style.display = 'block';
                child.classList.add('required');
                isValid = false;
            } else if(child.hasAttribute('required')) {
                child.classList.remove('required');
            }
        }
        return isValid;
    }
}