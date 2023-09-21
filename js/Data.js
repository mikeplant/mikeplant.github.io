class Data {
  constructor() {
    this.storageExists = this.checkIfStorageExists();
    this.activeMember;
    this.activeStaff;
  }

  checkIfStorageExists() {
    if (localStorage.getItem("items") !== null) {
      return true;
    } else {
      return false;
    }
  }

  ////

  saveUsers() {
    let usersToSave = {
      staff: [],
      members: [],
    };

    library.users.staff.forEach((staff) => {
      usersToSave.staff.push(JSON.parse(staff.getJSON()));
    });
    library.users.members.forEach((member) => {
      usersToSave.members.push(JSON.parse(member.getJSON()));
    });

    if (this.activeMember) {
      localStorage.setItem(
        "activeMember",
        JSON.stringify(this.activeMember.accNum)
      );
    }
    if (this.activeStaff) {
      localStorage.setItem(
        "activeStaff",
        JSON.stringify(this.activeStaff.accNum)
      );
    }

    localStorage.setItem("users", JSON.stringify(usersToSave));
    this.storageExists = true;
  }

  loadUsers() {
    let loadedUsers = JSON.parse(localStorage.getItem("users"));
    library.users = new Users();

    loadedUsers.members.forEach((member) => {
      let newMember = new Member();
      newMember.accNum = member.accNum;
      newMember.name = member.name;
      newMember.age = member.age;
      newMember.address = member.address;
      newMember.phone = member.phone;
      newMember.email = member.email;
      newMember.joinDate = member.joinDate;
      newMember.lateReturns = member.lateReturns;
      newMember.isBanned = member.isBanned;
      newMember.currentRentals = member.currentRentals;
      newMember.previousRentals = member.previousRentals;
      library.users.members.push(newMember);
    });

    let activeMemberNum = JSON.parse(localStorage.getItem("activeMember"));
    this.activeMember = library.users.members.filter(
      (member) => member.accNum === activeMemberNum
    )[0];
  }

  saveItems() {
    let itemsToSave = [];

    library.items.forEach((item) => {
      itemsToSave.push(JSON.parse(item.getJSON()));
    });

    localStorage.setItem("items", JSON.stringify(itemsToSave));
    localStorage.setItem("rentCounter", JSON.stringify(library.rentCounter));
    localStorage.setItem(
      "usedStockNums",
      JSON.stringify(library.usedStockNums)
    );
    this.storageExists = true;
  }

  loadItems() {
    let loadedItems = JSON.parse(localStorage.getItem("items"));

    loadedItems.forEach((book) => {
      let newBook = new Book();
      newBook.title = book.title;
      newBook.author = book.author;
      newBook.series = book.series;
      newBook.genre = book.genre;
      newBook.pages = book.pages;
      newBook.isbn = book.isbn;
      newBook.inStock = book.inStock;
      newBook.stockNum = book.stockNum;
      library.items.push(newBook);
    });

    library.rentCounter = JSON.parse(localStorage.getItem("rentCounter"));
    library.usedStockNums = JSON.parse(localStorage.getItem("usedStockNums"));
  }
}
