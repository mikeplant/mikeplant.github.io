class Users {
    constructor() {
        this.staff = [];
        this.members = [];
    }

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

    removeMember(member) {
        this.members = this.members.filter(existingMember => existingMember.accNum !== member.accNum);
    }

    getMemberByAccNum(accNum) {
        return this.members.find(member => member.accNum === accNum);
    }

    validateAccNum(accNum) {
        if(isNaN(accNum) || this.members.find(member => member.accNum === accNum) === undefined) {
            return false;
        } else {
            return true;
        }
    }
}