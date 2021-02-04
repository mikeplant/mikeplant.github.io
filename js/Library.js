class Library {
    constructor() {
        this.staff = [];
        this.members = [];
        this.stock = [];
        this.rentCounter = {};
        this.usedItemIds = [99];
    }

    get activeMember() {
        return this.members.find(member => member.active);
    }

    changeActiveMember(accNum) {
        this.activeMember.active = false;
        const newActiveMember = this.members.find(member => member.accNum === accNum);
        newActiveMember.active = true;
    }
}