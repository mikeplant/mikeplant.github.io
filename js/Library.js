class Library {
    constructor() {
        this.items = [];
        this.users = new Users();
        this.rentCounter = {};
        this.usedStockNums = [99];
    }

    setActiveStaff() {
        
    }

    /**
     * Creates an item, adds a stockNum and adds it to the library.
     * @param {Class} type - A class type to be instantiated. eg Book
     * @param {Array} argsArr - The required arguments for the class.
     */
    addItem(type, argsArr) {
        const item = new type(...argsArr);
        const items = this.items;
        const usedStockNums = this.usedStockNums;
        let existingItemArr;

        function assignStockNum() {
            for(let i=0;i<items.length;i++) {
                if(items[i][0].isbn === item.isbn) {
                    item.stockNum = items[i][0].stockNum;
                    existingItemArr = items[i];
                } 
            }
            if(!item.stockNum) {
                const prevRef = usedStockNums.slice(-1);
                const stockNum = prevRef[0] + 1;
                usedStockNums.push(stockNum);
                item.stockNum = stockNum;
                
            }   
        }

        assignStockNum();

        if(existingItemArr) {
            existingItemArr.push(item);
        } else {
            items.push([item]);
        }
    }
}