class Staff {
    constructor(id, name, password, isAdmin=false, active=false) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.isAdmin = this.isAdmin;
        this.active = active;
    }
}