class Member {
    constructor(accNum, name, age, address, phone, email, joinDate = new Date(), lateReturns = 0, isBanned = this.isOverLateReturnLimit()) {
        this.accNum = accNum;
        this.name = name;
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.joinDate = joinDate;
        this.lateReturns = lateReturns;
        this.isBanned = isBanned;
        this.currentRentals = [];
        this.previousRentals = [];
    }

    //Get data functions

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

    getHTML() {
        let div = document.createElement('div');
		div.id = this.accNum;
		div.className = 'member-div';
		let html = `
            <strong>AccNum: </strong><span>${this.accNum}</span>
            <strong>Name: </strong><span>${this.name}</span>
            <strong>Account Status: </strong><span>${this.getMemberStatusString()}</span>
            <strong>Member Since: </strong><span>${library.getDateString(this.joinDate)}</span>`;
        if(this.accNum === data.activeMember.accNum) {
            html += `<span class="user-active available">Active</span>`;
        }

        html += `<button class="selector-btn member-card-btn">Details</button>`;
        div.innerHTML = html;
        return div;
    }

    getMemberStatusString() {
        if(this.isBanned) {
            return `Banned`;
        } else {
            return `Open`;
        }
    }

    getRentedItem(item) {
        return this.currentRentals.find(rentedItem => rentedItem['item'].stockNum === item.stockNum);
    }

    userHasAnyItem() {
        return (this.currentRentals.length > 0) ? true : false;
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

    updateDetails(updatedProperties) {
        this.name = updatedProperties.name;
        this.age = updatedProperties.age;
        this.address = updatedProperties.address;
        this.phone = updatedProperties.phone;
        this.email = updatedProperties.email;
    }

    // Item checking in/out functions ---

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

    addToRentals(itemToCheckOut, rentalLength) {
        itemToCheckOut['dateCheckedOut'] = new Date();
        itemToCheckOut['returnDue'] = library.getReturnDate(rentalLength);
        this.previousRentals.push(itemToCheckOut);
        this.currentRentals.push(itemToCheckOut);
    }

    //Late return handlers

    handleLateReturn() {
        this.lateReturns++;
        if(this.isOverLateReturnLimit()) { this.isBanned = true; }
    }

    isOverLateReturnLimit() {
        return (this.lateReturns >= library.lateReturnLimit ? true : false);
    }
}