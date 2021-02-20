class Member {
    constructor(accNum, name, age, address, phone, email, lateReturns = 0, isBanned = this.isOverLateReturnLimit()) {
        this.accNum = accNum;
        this.name = name;
        this.age = age;
        this.address = address;
        this.contactDetails = {phone: `${phone}`, email: `${email}`};
        this.lateReturns = lateReturns;
        this.isBanned = isBanned;
        this.currentRentals = [];
        this.previousRentals = [];
    }

    getJSON() {
        let data = {};
        data.accNum = this.accNum;
        data.name = this.name;
        data.age = this.age;
        data.address = this.address;
        data.contactDetails = this.contactDetails;
        data.currentRentals = this.currentRentals;
        data.previousRentals = this.previousRentals;

        return JSON.stringify(data);
    }

    isOverLateReturnLimit() {
        return (this.lateReturns >= library.lateReturnLimit ? true : false);
    }

    userHasItem(item) {
        const itemToCheck = item.stockNum;
        let hasItem = false;
        for (let rentedItem of this.currentRentals) {
            if (rentedItem['item'].stockNum === itemToCheck) {
                hasItem = true;
            }
        }
        return hasItem;
    }

    getRentedItem(item) {
        return this.currentRentals.find(rentedItem => rentedItem['item'].stockNum === item.stockNum);
    }

    addToRentals(itemToCheckOut, rentalLength) {
        itemToCheckOut['dateCheckedOut'] = new Date();
        itemToCheckOut['returnDue'] = library.getReturnDate(rentalLength);
        this.previousRentals.push(itemToCheckOut);
        this.currentRentals.push(itemToCheckOut);
    }

    checkOutItem(item, rentalLength) {
        const itemToCheckOut = {item: item};

        if(!this.isBanned && !this.userHasItem(item) && item.isInStock()) {
            this.addToRentals(itemToCheckOut, rentalLength);
            item.updateStock('remove', 1);
            library.updateRentCounter(item);
        } 
    }

    checkInItem(item) {
        if (library.returnIsOverdue(this.getRentedItem(item))) { this.handleLateReturn() }
        this.currentRentals = this.currentRentals.filter(rentedItem => rentedItem['item'].stockNum !== item.stockNum);
        item.updateStock('add', 1);
    }

    handleLateReturn() {
        this.lateReturns++;
        if(this.isOverLateReturnLimit()) { this.isBanned = true; }
    }
}