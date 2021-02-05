class Users {
    constructor() {
        this.staff = [];
        this.members = [];
        this.activeStaff;
        this.activeMember;
    }
    get activeMember() {
        return this.members.find(member => member.active);
    }

    /**
     * Changes the active member
     * @param {number} accNum 
     */
    changeActiveMember(accNum) {
        this.activeMember.active = false;
        const newActiveMember = this.members.find(member => member.accNum === accNum);
        newActiveMember.active = true;
    }

    checkOutItem(item) {

    }
}