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

    updateRentCounter(item) {
        const itemStockNum = item.stockNum.toString();
        if(this.rentCounter.hasOwnProperty(itemStockNum)) {
            this.rentCounter[itemStockNum]++;
        } else {
            this.rentCounter[itemStockNum] = 1;
        }
        data.saveItems();
    }
}