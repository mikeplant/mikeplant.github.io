class Library {
    constructor() {
        this.items = [];
        this.users = new Users();
        this.rentCounter = {};
        this.usedStockNums = [99];
    }

    /**
     * Creates an item, adds a stockNum and adds it to the library.
     * @param {Class} type - A class type to be instantiated. eg Book
     * @param {Array} argsArr - The required arguments for the class.
     */
    addItem(type, argsArr) {
        const item = new type(...argsArr);

        for(let i=0;i<this.items.length;i++) {
            if(this.items[i][0].isbn === item.isbn) {
                item.stockNum = this.items[i][0].stockNum;
                this.items[i].push(item);
            } 
        }
        if(!item.stockNum) {
            const prevRef = this.usedStockNums.slice(-1);
            const stockNum = prevRef[0] + 1;
            this.usedStockNums.push(stockNum);
            item.stockNum = stockNum;
            this.items.push([item]);
        }   
    }
}