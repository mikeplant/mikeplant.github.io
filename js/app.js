const data = new Data();
const library = new Library();
const viewHandler = new ViewHandler();
const modals = new Modals();
const changeMemberConfirm = document.querySelector('.change-member-confirm');
const dropdownContent = document.querySelector('.dropdown-content');
const mainContent = document.querySelector('.main-content');

if (data.storageExists) {
    data.loadUsers()
    data.loadItems();
    viewHandler.displayActiveMember(); //update
} 

dropdownContent.addEventListener('click', (e) => {
    let option = e.target.className;
    viewHandler.displayItems(option);
})

changeMemberConfirm.addEventListener('click', () => {
    library.users.changeActiveMember();
})

mainContent.addEventListener('click', (e) => {
    const btnText = e.target.textContent;
    const divID = parseInt(e.target.parentNode.id);
    if(e.target.tagName === 'BUTTON') {
        viewHandler.handleSelectorBtnClick(btnText, divID);
        viewHandler.updateDisplay();
    }
})






































//Test objects
if (!data.storageExists) {
    library.addItem(Book, ['The Blade Itself','Joe Abercrombie','The First Law','Fiction','515','0575079797', 3]);
    library.addItem(Book, ['Before They Are Hanged','Joe Abercrombie','The First Law','Fiction','441','0575077883', 2]);
    library.addItem(Book, ['Last Argument of Kings','Joe Abercrombie','The First Law','Fiction','536','0575077905', 4]);
    library.addItem(Book, ['Half A King','Joe Abercrombie','Shattered Sea','Fiction','416','0007550227', 2]);
    library.addItem(Book, ['Good Omens', 'Terry Pratchett & Neil Gaiman', '', 'Fiction', '415', '0552171891', 0]);
    library.addItem(Book, ['Animal Farm', 'George Orwell', '', 'Fiction', '122', '0452284244', 8]);
    library.addItem(Book, ['Reamde','Neil Stephenson', '', 'Fiction', '1044', '0062191497', 1]);

    library.users.members.push(new Member(9000, 'Drew Borrowmore', 42, '123, Any Street, Anytown, RE12AD', '01256445556', 'some@email.com'),
                        new Member(9001, 'Toby Lenderson', 45, '456, Some Street, Sometown, BO010KS', '01256541236', 'some@email.com'));

    data.saveUsers();
    data.saveItems();
}