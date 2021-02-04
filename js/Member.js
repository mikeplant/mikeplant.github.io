class Member {
    constructor(accNum, name, age, address, phone, email, active=false) {
        this.accNum = accNum;
        this.name = name;
        this.age = age;
        //this.password = password;
        this.address = address;
        this.contactDetails = {phone: `${phone}`, email: `${email}`};
        this.currentRentals = [];
        this.previousRentals = [];
        this.active = active;
    }
}