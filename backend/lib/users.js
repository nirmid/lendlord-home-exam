const UsersRepo = require("../repository/users");

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query);
    return user;
  }

  async getAllUsers() {
    const users = await this.repo.getAllUsers();
    return users;
  }

  async createUser(data) {
    const user = await this.repo.create(data);
    return user;
  }

  async updateUser(query, data) {
    const user = await this.repo.update(query, data);
    return user;
  }

  async deleteUser(query) {
    const user = await this.repo.delete(query);
    return user;
  }

  async searchByManager(manager) {
    const users = await this.repo.searchByManager(manager);
    return users;
  }
}

module.exports = Users;
