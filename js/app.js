const data = new Data();
const library = new Library();
const htmlContent = new HTMLContent();
const viewHandler = new ViewHandler();
const modals = new Modals();
const googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?q=';
const main = document.querySelector('main');
const changeMemberConfirm = document.querySelector('.change-member-confirm');
const headerNavbar = document.querySelector('#header-navbar');
const dropdownContent = document.querySelector('.dropdown-content');
const mainContent = document.querySelector('.main-content');

if (data.storageExists) {
    data.loadUsers()
    data.loadItems();
    viewHandler.displayActiveMember(); //update
} 

//Navbar listener

headerNavbar.addEventListener('click', (e) => {
    if(e.target.parentNode.parentNode.classList.contains('dropdown-content')) {
        let option = e.target.className;
        viewHandler.handleNavbarClick(option);
    }
});

//Main Content listener

main.addEventListener('click', (e) => {
    if(e.target.classList.contains('manual-add-book-btn')) {
        viewHandler.handleAddItemCardBtnClick(e);
    }

    if(e.target.classList.contains('item-card-btn')) {
        viewHandler.handleItemCardBtnClick(e);
    }

    if(e.target.classList.contains('edit-member-btn')) {
        viewHandler.handleEditMemberClick(e)
    }
});



//Add book search form listener

mainContent.addEventListener('submit', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('add-item-search-form')) {
        const uri = encodeURI(document.querySelector('.add-item-search-input').value);
        const search = googleBooksAPI + uri + '&maxResults=40';
        fetch(search)
            .then(response => response.json())
            .then(viewHandler.handleAddBookSearch)
            .catch(err => console.log('Error fetching books', err))
    }
    if(e.target.classList.contains('item-search-form')) {
        viewHandler.handleItemSearch(document.querySelector('.add-item-search-input').value, e.submitter);
    }
});














































//Test objects
if (!data.storageExists) {
    library.addItem(Book, {title: 'The Blade Itself', author:'Joe Abercrombie',series:'The First Law',genre:'Fiction',pages:'515',isbn:'0575079797', inStock:3});
    library.addItem(Book, {title: 'Before They Are Hanged', author:'Joe Abercrombie',series:'The First Law',genre:'Fiction',pages:'441',isbn:'0575077883',inStock: 2});
    library.addItem(Book, {title: 'Last Argument of Kings', author:'Joe Abercrombie',series:'The First Law',genre:'Fiction',pages:'536',isbn:'0575077905', inStock:4});
    library.addItem(Book, {title: 'Half A King', author:'Joe Abercrombie',series:'Shattered Sea',genre:'Fiction',pages:'416',isbn:'0007550227', inStock:0});
    library.addItem(Book, {title: 'Good Omens', author: 'Terry Pratchett & Neil Gaiman', series:'', genre:'Fiction', pages:'415', isbn:'0552171891', inStock:10});
    library.addItem(Book, {title: 'Animal Farm', author: 'George Orwell', series:'', genre:'Fiction', pages:'122', isbn:'0452284244',inStock: 8});
    library.addItem(Book, {title: 'Reamde', author:'Neil Stephenson', series:'', genre:'Fiction', pages:'1044', isbn:'0062191497', inStock:1});

    library.users.members.push(new Member(9000, 'Drew Borrowmore', 42, '123, Any Street, Anytown, RE12AD', '01256445556', 'some@email.com'),
                        new Member(9001, 'Toby Lenderson', 45, '456, Some Street, Sometown, BO010KS', '01256541236', 'some@email.com'));

    data.saveUsers();
    data.saveItems();
}