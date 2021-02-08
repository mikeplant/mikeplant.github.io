class Users {
    constructor() {
        this.staff = [];
        this.members = [];
        this.activeStaff;
        this.activeMember;
    }
    /**
     * Returns the Active user
     * @param {}
     * @returns {Object} - The active user
     */
    // get activeUser(users) {
    //     return this.users.find(users => user.active);
    // }

    /**
     * Changes the active member
     * @param {number} accNum 
     */
    changeActiveMember(accNum) {
        this.activeMember.active = false;
        const newActiveMember = this.members.find(member => member.accNum === accNum);
        newActiveMember.active = true;
    }

    /**
     * Checks item out to provided user
     * @param {Object} item - The item to be checked out.
     * @param {Object} user - The user the item will be checked out to.
     * */
    checkOutItem(item, user) {

    }
}