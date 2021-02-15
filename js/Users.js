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
            viewHandler.updateDisplayAll();
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
            if (rentedItem['item'].stockNum === itemToCheck) {
                hasItem = true;
            }
        }
        return hasItem;
    }

    getRentedItem(user, item) {
            return user.currentRentals.find(rentedItem => rentedItem['item'].stockNum === item.stockNum);
    }

    /**
     * Checks item out to provided user
     * @param {Object} user - The user the item will be checked out to.
     * @param {Object} item - The item to be checked out.
     * */
    checkOutItem(user, item, rentalLength) {
        const itemToCheckOut = {item: item};

        function updateUserItems() {
            itemToCheckOut['dateCheckedOut'] = new Date();
            itemToCheckOut['returnDue'] = library.getReturnDate(rentalLength);
            user.previousRentals.push(itemToCheckOut);
            user.currentRentals.push(itemToCheckOut);
        }

        function updateLibrary() {
            item.inStock--;
            library.updateRentCounter(item);
        }

        if(!this.userHasItem(user, item) && item.isInStock()) {
            updateUserItems();
            updateLibrary();
            //alert(`${item.title} checked out to ${user.name}`);
        } 
    }

    checkInItem(user, item) {
        user.currentRentals = user.currentRentals.filter(rentedItem => rentedItem['item'].stockNum !== item.stockNum);
        item.inStock++;
    }
}