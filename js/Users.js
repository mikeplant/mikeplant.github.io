class Users {
    constructor() {
        this.staff = [];
        this.members = [];
        this.usedMemberAccNums = [9005]
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

    getMembersBySearchTerm(searchTerm) {
        const sTerm = searchTerm.toLowerCase().trim();
        let searchResults = [];
        for (const member of this.members) {
            //console.log(member)
            const name = member.name.toString().toLowerCase();
            const accNum = member.accNum.toString();
            if (name.includes(sTerm) || accNum.includes(sTerm)) {
                searchResults.push(member);
            };
        }
        return searchResults;
    }

    validateAccNum(accNum) {
        if(isNaN(accNum) || this.members.find(member => member.accNum === accNum) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    createUser(type, argsObj) {
        const newUser = new type();   
        for (const [key, value] of Object.entries(argsObj)) {
            newUser[key] = value;
        }
        return newUser;
    }

    assignAccNum(newUser) {
        const prevRef = this.usedMemberAccNums.slice(-1);
        const accNum = prevRef[0] + 1;
        this.usedMemberAccNums.push(accNum);
        newUser.accNum = accNum;        
    }

    addUser(type, userToAdd) {   
        const newUser = this.createUser(Member, userToAdd);
        this.assignAccNum(newUser);
        this.members.push(newUser);
        data.saveUsers();
    }
}