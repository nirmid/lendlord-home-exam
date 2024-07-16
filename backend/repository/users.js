const usersModel = require("../models/users");

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection);
    return user;
  }

  async getAllUsers() {
    const users = await usersModel.find();
    return users;
  }

  async create(data) {
    const user = await usersModel.create(data);
    return user;
  }

  async update(query, data) {
    const user = await usersModel.findOneAndUpdate(query, data, {
      new: true,
    });
    return user;
  }

  async delete(query) {
    const user = await usersModel.findOneAndDelete(query);
    return user;
  }

  async searchByManager(manager) {
    const users = await usersModel.find({ manager });
    return users;
  }
}

module.exports = Users;
