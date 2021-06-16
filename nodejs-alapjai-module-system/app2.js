const utils = require('./utils2')

const myUsers = [
    { firstName: 'Xena', lastName: 'Yngrid', age: 21 },
    { firstName: 'Alma', lastName: 'Béla', age: 441 },
    { firstName: 'Elek', lastName: 'Ferenc', age: 10 }
]

utils.getUserNames = 2

console.log(utils.generateUserList(myUsers));
console.log(utils.getUserNames(myUsers));