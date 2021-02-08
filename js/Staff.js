class Staff {
    constructor(accNum, name, password, isAdmin=false, active=false) {
        this.accNum = accNum;
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
        this.active = active;
    }
}