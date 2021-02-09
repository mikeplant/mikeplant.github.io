class Member {
    constructor(accNum, name, age, address, phone, email) {
        this.accNum = accNum;
        this.name = name;
        this.age = age;
        this.address = address;
        this.contactDetails = {phone: `${phone}`, email: `${email}`};
        this.currentRentals = [];
        this.previousRentals = [];
    }

    getJSON() {
        let data = {};
        data.accNum = this.accNum;
        data.name = this.name;
        data.age = this.age;
        data.address = this.address;
        data.contactDetails = this.contactDetails;
        data.currentRentals = this.currentRentals;
        data.previousRentals = this.previousRentals;

        return JSON.stringify(data);
    }
}