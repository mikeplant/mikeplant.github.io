class ViewHandler {
    constructor() {
        this.activeMemberSpan = document.querySelector('.active-member');
        this.mainHeading = document.querySelector('#main-heading');
        this.itemsDiv = document.querySelector('.main-content');
    }

    displayActiveMember() {
        if(data.activeMember) {
            this.activeMemberSpan.textContent = `${data.activeMember.accNum} - ${data.activeMember.name}`;
        }
    }

    createElement(elementName, property, value) {
        const newElement = document.createElement(elementName);
        newElement[property] = value;
        return newElement;
    }

    displayItems(option) {
        this.itemsDiv.innerHTML = '';

        function createAndAppendDiv(item) {
            const div = viewHandler.createElement('div', 'id', `${item.stockNum}`);
            div.className = 'item-div';
            viewHandler.itemsDiv.appendChild(div);
            div.innerHTML = item.getHTML(true, true, true);
        }

        const printOptions = {
            allItems: () => {
                this.mainHeading.textContent = 'All Items';
                library.items.forEach(item => {
                    createAndAppendDiv(item);
                });
            },
            inStock: () => {
                this.mainHeading.textContent = 'In Stock Items';
                library.items.forEach(item => {
                    if (item.inStock > 0) {
                        createAndAppendDiv(item);
                    }
                })
            },
            addItem: () => {
                this.mainHeading.textContent = 'Add Items';
            },
            editItem: () => {
                this.mainHeading.textContent = 'Edit Items';
            }
        };
        
        printOptions[option]();

    }

    displayInStockItems() {
        this.mainHeading.textContent = 'All Items';
        this.itemsDiv.innerHTML = '';
        library.items.forEach(item => {
            const div = this.createElement('div', 'id', `${item.stockNum}`);
            this.itemsDiv.appendChild(div);
            div.innerHTML = item.getString();
        });
    }
}