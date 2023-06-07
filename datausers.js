const bcrypt = require('bcryptjs');
const users = [
    {
      name: 'Korny',
      email: 'themkornygame@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'testacc',
      email: 'test123@mail.ru',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    }
  ]
  
  module.exports = users;