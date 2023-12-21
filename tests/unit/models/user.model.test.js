const faker = require('faker');
const { User } = require('../../../src/models');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if role is unknown', async () => {
      newUser.role = 'invalid';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});



// const mongoose = require('mongoose');

// // Your Mongoose schema definition
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: (value) => {
//         return /\S+@\S+\.\S+/.test(value); // Simple email format validation
//       },
//       message: 'Invalid email',
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//     validate: {
//       validator: (value) => {
//         return /\d/.test(value) && /[a-zA-Z]/.test(value); // Password containing at least one letter and one number
//       },
//       message: 'Password must contain at least one letter and one number',
//     },
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'], // Define valid roles
//     default: 'user',
//   },
// });

// const User = mongoose.model('User', userSchema);

// describe('User model', () => {
//   describe('User validation', () => {
//     test('should correctly validate a valid user', async () => {
//       const validUserData = {
//         name: faker.name.findName(),
//         email: faker.internet.email().toLowerCase(),
//         password: faker.internet.password(8), 
//         role: 'user',
//       };

//       await expect(new User(validUserData).validate()).resolves.toBeUndefined();
//     });

    
//   });

//   describe('User toJSON()', () => {
//     test('should not return user password when toJSON is called', () => {
//       const userData = {
//         name: faker.name.findName(),
//         email: faker.internet.email().toLowerCase(),
//         password: faker.internet.password(8), 
//         role: 'user',
//       };

//       const user = new User(userData);
//       const userJSON = user.toJSON();
//       expect(userJSON).not.toHaveProperty('password');
//     });
//   });
// });

