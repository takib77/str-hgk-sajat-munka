const increaseAndFormatDate = require('./utils')

const myDates = [
    new Date('Mon Jun 14 2021 21:10:53 GMT+0200'),
    new Date('Tue Jun 15 2021 11:50:50 GMT+0200'),
    new Date('Wed Jun 16 2021 1:10:11 GMT+0200')
]

console.log(increaseAndFormatDate(myDates))