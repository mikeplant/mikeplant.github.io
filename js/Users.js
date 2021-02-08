class Users {
    constructor() {
        this.staff = [];
        this.members = [];
        this.activeStaff;
        this.activeMember;
    }

    /**
     * Changes the active member
     * @param {number} accNum 
     */
    changeActiveMember(accNum) {
        this.activeMember = undefined;
        const newActiveMember = this.members.find(member => member.accNum === accNum);
        this.activeMember = newActiveMember;
        viewHandler.displayActiveMember();
        data.setData();
    }

    
    validateAccNum(accNum) {
        if(isNaN(accNum) || this.members.find(member => member.accNum === accNum) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Checks item out to provided user
     * @param {Object} item - The item to be checked out.
     * @param {Object} user - The user the item will be checked out to.
     * */
    checkOutItem(item, user) {

    }
}