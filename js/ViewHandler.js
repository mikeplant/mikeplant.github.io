class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
    }

    displayActiveMember() {
        this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
    }
}