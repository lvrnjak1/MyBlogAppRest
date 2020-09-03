class Auth {
  constructor() {
    this.authenticated = localStorage.getItem("token");
  }

  login() {
    this.authenticated = true;
    //cb();
  }

  logout() {
    this.authenticated = false;
    //cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
