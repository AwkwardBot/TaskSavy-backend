const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};




// const saltRound = 8; 

// const userOne = {
//   _id: mongoose.Types.ObjectId(),
//   name: faker.name.findName(),
//   email: faker.internet.email().toLowerCase(),
//   password: faker.internet.password(),
//   role: 'user',
//   isEmailVerified: false,
// };

// const userTwo = {
//   _id: mongoose.Types.ObjectId(),
//   name: faker.name.findName(),
//   email: faker.internet.email().toLowerCase(),
//   password: faker.internet.password(),
//   role: 'user',
//   isEmailVerified: false,
// };

// const admin = {
//   _id: mongoose.Types.ObjectId(),
//   name: faker.name.findName(),
//   email: faker.internet.email().toLowerCase(),
//   password: faker.internet.password(),
//   role: 'admin',
//   isEmailVerified: false,
// };

// const insertUsers = async (users) => {
//   await User.insertMany(users.map((user) => {
//     const salt = bcrypt.genSaltSync(saltRound);
//     const hashedPassword = bcrypt.hashSync(user.password, salt);
//     return {
//       ...user,
//       password: hashedPassword,
//     };
//   }));
// };

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
