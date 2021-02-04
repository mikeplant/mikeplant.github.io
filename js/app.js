const library = new Library();









































//Test objects
library.stock.push(new Book('The Blade Itself','Joe Abercrombie','The First Law','Fiction','515','0575079797', true, 100),
                    new Book('Before They Are Hanged','Joe Abercrombie','The First Law','Fiction','441','0575077883', true, 101),
                    new Book('Last Argument of Kings','Joe Abercrombie','The First Law','Fiction','536','0575077905', true, 102),
                    new Book('Half A King','Joe Abercrombie','Shattered Sea','Fiction','416','0007550227', true, 103),
                    new Book('Good Omens', 'Terry Pratchett & Neil Gaiman', '', 'Fiction', '415', '0552171891', true, 104),
                    new Book('Animal Farm', 'George Orwell', '', 'Fiction', '122', '0452284244', true, 105),
                    new Book('Reamde','Neil Stephenson', '', 'Fiction', '1044', '0062191497', true, 106));

library.members.push(new Member(9000, 'Drew Borrowmore', 42, '123, Any Street, Anytown, RE12AD', '01256445556', 'some@email.com', true),
                     new Member(9001, 'Toby Lenderson', 45, '456, Some Street, Sometown, BO010KS', '01256541236', 'some@email.com'));