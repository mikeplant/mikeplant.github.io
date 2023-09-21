class Staff {
  constructor(accNum, name, password, isAdmin = false, active = false) {
    this.accNum = accNum;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
    this.active = active;
  }

  getJSON() {
    let data = {};
    data.accNum = this.accNum;
    data.name = this.name;
    data.password = this.password;
    data.isAdmin = this.isAdmin;
    data.active = this.active;

    return JSON.stringify(data);
  }
}
