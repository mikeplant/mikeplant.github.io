class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
    }

    displayActiveMember() {
        this.activeMemberSpan.textContent = `${library.users.activeMember.accNum} - ${library.users.activeMember.name}`;
    }
}