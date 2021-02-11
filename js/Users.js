class Users {
    constructor() {
        this.staff = [];
        this.members = [];
    }

    /**
     * Changes the active member
     */
    changeActiveMember() {
        let accNum = parseInt(document.querySelector('.change-member-input').value);
        if(this.validateAccNum(accNum)) {
            data.activeMember = undefined;
            const newActiveMember = this.members.find(member => member.accNum === accNum);
            data.activeMember = newActiveMember;
            viewHandler.updateDisplay();
            data.saveUsers();
        } else {
            alert(`Please enter a valid account number e.g. "9000"`)
        }
    }

    /**
     * Checks if user input is an integer and if accNum exists
     * @return {boolean} - is valid.
     */
    validateAccNum(accNum) {
        if(isNaN(accNum) || this.members.find(member => member.accNum === accNum) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    userHasItem(user, item) {
        const itemToCheck = item.stockNum;
        let hasItem = false;
        for (let rentedItem of user.currentRentals) {
            if (rentedItem['Item'].stockNum === itemToCheck) {
                hasItem = true;
            }
        }
        return hasItem;
    }

    /**
     * Checks item out to provided user
     * @param {Object} item - The item to be checked out.
     * @param {Object} user - The user the item will be checked out to.
     * */
    checkOutItem(user, stockNum) {
        let item = library.getItemByStockNum(stockNum);
        const itemCopy = {Item: item};
        if(!this.userHasItem(user, item) && item.isInStock()) {
            user.currentRentals.push(itemCopy);
            user.previousRentals.push(itemCopy);
            item.inStock--;
        } else {
        }
        viewHandler.updateDisplay();
    }
}