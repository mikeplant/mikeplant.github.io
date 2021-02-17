class Library {
    constructor() {
        this.items = [];
        this.users = new Users();
        this.rentCounter = {};
        this.usedStockNums = [99];
    }

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

    /**
     * Creates an item, adds a stockNum and adds it to the library.
     * @param {Class} type - A class type to be instantiated. eg Book
     * @param {Array} argsArr - The required arguments for the class.
     */
    addItem(type, argsArr) {
        const newItem = new type(...argsArr);
        const items = this.items;
        const usedStockNums = this.usedStockNums;

        function assignStockNum() {
            let isNewItem = true;
            for(let i=0;i<items.length;i++) {
                if(items[i].isbn === newItem.isbn) {
                    items[i].inStock += newItem.inStock;
                    isNewItem = false;
                } 
            }
            if(isNewItem) {
                const prevRef = usedStockNums.slice(-1);
                const stockNum = prevRef[0] + 1;
                usedStockNums.push(stockNum);
                newItem.stockNum = stockNum;   
                items.push(newItem);  
            }   
        }

        assignStockNum();
        data.saveItems();
    }

    removeItem(item) {
        this.items = this.items.filter(itemToRemove => itemToRemove.stockNum !== item.stockNum);
    }

    updateRentCounter(item) {
        const itemStockNum = item.stockNum.toString();
        if(this.rentCounter.hasOwnProperty(itemStockNum)) {
            this.rentCounter[itemStockNum]++;
        } else {
            this.rentCounter[itemStockNum] = 1;
        }
        data.saveItems();
    }

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