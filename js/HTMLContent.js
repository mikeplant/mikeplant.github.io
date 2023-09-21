class HTMLContent {
  constructor() {}

  createElement(element, propertiesValues) {
    const newElement = document.createElement(element);
    for (const [key, value] of Object.entries(propertiesValues)) {
      newElement[key] = value;
    }
    return newElement;
  }

  getSearchResultHTML() {
    const searchContentHTML = this.createElement("div", {
      id: "search-results",
      className: "main-content",
      innerHTML: `<h2>Search Results</h2>`,
    });
    return searchContentHTML;
  }

  getAddItemPageHTML() {
    const addItemsDiv = this.createElement("div", {
      className: "sub-content",
      innerHTML: `
                <div class="add-item-form-div">
                    <form class="manual-add-book-form">
                    <h3>Add a book manually:</h3>
                    <label for="item-title">Title: </label>
                        <input type="text" id="item-title" class="item-property" required>
                    <label for="item-author">Author: </label>
                        <input type="text" id="item-author" class="item-property" required>
                    <label for="item-series">Series: </label>
                        <input type="text" id="item-series" class="item-property">
                    <label for="item-genre">Genre: </label>
                        <input type="text" id="item-genre" class="item-property">
                    <label for="item-pages">Pages: </label>
                        <input type="text" id="item-pages" class="item-property">
                    <label for="item-isbn">ISBN: </label>
                        <input type="text" id="item-isbn" class="item-property" required>
                    <label for="item-inStock">Add Stock: </label>
                        <input type="text" id="item-inStock" class="item-property" required>
                    <button class="selector-btn manual-add-book-btn">Confirm</button>
                    <span class="required-span">Highlighted fields required</span>
                    </form>
                </div>

                <div class="search-div add-item-search-div">
                    <h2>Search for a book:</h2>
                    <form class="add-item-search-form">
                        <input type="text" class="search-input"><button class="selector-btn item-search-div-btn">Search</button>
                    </form>
                    <p>Find a book to add to the library by any of it's properties.<br>
                        For best results use the book's title, author, or ISBN number.</p>
                </div>`,
    });
    return addItemsDiv;
  }

  getItemSearchDiv() {
    return `
        <div class="search-div">
            <h2>Search for an item:</h2>
            <form class="item-search-form">
                <input type="text" class="search-input"><button class="selector-btn item-search-div-btn">Search</button>
            </form>
            <p>Find an item in the library by any of it's properties.<br>
                For best results use an item's title, author, or ISBN number.</p>
        </div>`;
  }

  getMemberSearchDiv() {
    return `
        <div class="search-div">
            <h2>Search for a member:</h2>
            <form class="member-search-form">
                <input type="text" class="search-input"><button class="selector-btn item-search-div-btn">Search</button>
            </form>
            <p>Find a member of the library by name or account number.</p>
        </div>`;
  }

  getSearchHTML(type) {
    const searchHTML = this.createElement("div", {
      className: "sub-content",
      innerHTML: `${
        type === "memberSearch"
          ? this.getMemberSearchDiv()
          : this.getItemSearchDiv()
      }`,
    });

    searchHTML.querySelector("form").classList.add(type);
    return searchHTML;
  }

  getUserDetailsDiv(user) {
    if (user) {
      return `
                    <div class="user-details">
                        <h3>Member Details</h3>
                        <span>Account No:</span> <p id="user-accNum">${
                          user.accNum
                        }</p>
                        <span>Name:</span> <p id="user-name" class="user-property">${
                          user.name
                        }</p>
                        <span>Age:</span> <p id="user-age" class="user-property">${
                          user.age
                        }</p>
                        <span>Phone:</span> <p id="user-phone" class="user-property">${
                          user.phone
                        }</p>
                        <span>Email:</span> <p id="user-email" class="user-property">${
                          user.email
                        }</p>
                        <span>Address:</span> <p id="user-address" class="user-property">${
                          user.address
                        }</p>
                        <button id="remove-member-btn" class="selector-btn edit-member-btn">Remove</button><button class="selector-btn edit-member-btn">Edit</button>
                    </div>
                    <div class="user-details">
                        <h3>Library Info</h3>
                        <span>Account Status:</span> ${user.getMemberStatusString()}
                        <span>Member Since:</span> <p>${library.getDateString(
                          user.joinDate
                        )}</p>
                        <span>Current Rentals:</span> <p>${
                          user.currentRentals.length
                        }</p>
                        <span>Total Rentals:</span> <p>${
                          user.previousRentals.length
                        }</p>
                        <span>Late Returns:</span> <p>${user.lateReturns}</p>
                    </div>`;
    } else {
      return `
                    <div class="user-details">
                        <h3>Member Details</h3>
                        <span>No member is active.</span>
                    </div>
                    <div class="user-details">
                        <h3>Library Info</h3>
                        <span>No member is active.</span>
                    </div>`;
    }
  }

  getCurrentRentalsDiv() {
    const currentRentalsDiv = this.createElement("div", {
      id: "current-rentals",
      className: "main-content",
      innerHTML: `<h2>Current Rentals</h2>`,
    });
    return currentRentalsDiv;
  }

  getPreviousRentalsDiv() {
    const previousRentalsDiv = this.createElement("div", {
      id: "previous-rentals",
      className: "main-content",
      innerHTML: `<h2>Previous Rentals</h2>`,
    });
    return previousRentalsDiv;
  }

  getUserDetailsPageHTML(user) {
    const html = this.createElement("div", {
      className: "sub-content",
      innerHTML: this.getUserDetailsDiv(user),
    });
    return html;
  }

  getUserItemsDiv(option) {
    const searchContentHTML = this.createElement("div", {
      id: "search-results",
      className: "main-content",
      innerHTML: `<h2>Search Results</h2>`,
    });
  }

  getAddMemberPageHTML() {
    const addMemberDiv = this.createElement("div", {
      className: "sub-content",
      innerHTML: `
                <div class="add-member-form-div">
                    <form>
                    <h3>Add a member:</h3>
                        <label for="user-name">Name: </label>
                        <input type="text" id="user-name" class="user-property" required>
                        <label for="user-age">Age: </label>
                        <input type="text" id="user-age" class="user-property" required>
                        <label for="user-phone">Phone: </label>
                        <input type="text" id="user-phone" class="user-property" required>
                        <label for="user-email">Email: </label>
                        <input type="text" id="user-email" class="user-property" required>
                        <label for="user-address">Address: </label>
                        <input type="text" id="user-address" class="user-property" required>
                        <span class="required-span">Highlighted fields required</span>
                        <button id="add-member-btn" class="selector-btn add-member-btn">Add</button>
                    </form>
                    <p>Use this form to add a new member to the library.<br><br> All fields are required.</p>
                </div>`,
    });
    return addMemberDiv;
  }
}
