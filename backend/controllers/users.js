const { ObjectId } = require("mongodb");
const Users = require("../lib/users");
const users = new Users();

exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await users.findUser({ _id: new ObjectId(id) });

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const data = await users.getAllUsers();

    ctx.status = 200;
    ctx.body = data;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.createUser = async (ctx) => {
  const { firstName, lastName, email, role, salary, manager } =
    ctx.request.body;
  try {
    const user = await users.createUser({
      firstName,
      lastName,
      email,
      role,
      salary,
      manager,
    });

    ctx.status = 201;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { firstName, lastName, email, role, salary, manager } =
    ctx.request.body;
  try {
    const user = await users.updateUser(
      { _id: new ObjectId(id) },
      { firstName, lastName, email, role, salary, manager }
    );

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await users.deleteUser({ _id: new ObjectId(id) });

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.searchByManager = async (ctx) => {
  const { manager } = ctx.query;
  try {
    const data = await users.searchByManager(manager);

    ctx.status = 200;
    ctx.body = data;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.sortBySalary = async (ctx) => {
  const users = ctx.request.body;
  const sortedUsers = users.sort((a, b) => b.salary - a.salary);
  ctx.status = 200;
  ctx.body = sortedUsers;
};

async function initialize() {
  await users.initialize();
}

initialize();
