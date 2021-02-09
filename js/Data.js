class Data {
    constructor() {
        this.storageExists = this.checkIfStorageExists();
        this.activeMember;
        this.activeStaff;
    }

    checkIfStorageExists() {
        if(localStorage.getItem('users') !== null) {
            return true;
        } else {
            return false;
        }
    }
 
    saveUsers() {
        let usersToSave = {
            staff: [],
            members: []
        };

        library.users.staff.forEach(staff => {
            usersToSave.staff.push(JSON.parse(staff.getJSON()))
        });

        library.users.members.forEach(member => {
            usersToSave.members.push(JSON.parse(member.getJSON()))
        });

        if(this.activeMember) {
            localStorage.setItem('activeMember', JSON.stringify(this.activeMember.accNum));
        }
        if(this.activeStaff) {
            localStorage.setItem('activeStaff', JSON.stringify(this.activeStaff.accNum));
        }
        
        localStorage.setItem('users', JSON.stringify(usersToSave));
    }

    loadUsers() {
        let loadedUsers = JSON.parse(localStorage.getItem('users'));
        library.users = new Users();

        loadedUsers.members.forEach(member => {
            let newMember = new Member();
            newMember.accNum = member.accNum;
            newMember.name = member.name;
            newMember.age = member.age;
            newMember.address = member.address;
            newMember.contactDetails = member.contactDetails;
            newMember.currentRentals = member.currentRentals;
            newMember.previousRentals = member.previousRentals;
            library.users.members.push(newMember);
        });

        let activeMemberNum = JSON.parse(localStorage.getItem('activeMember'));
        this.activeMember = library.users.members.filter(member => member.accNum === activeMemberNum)[0];
    }
}