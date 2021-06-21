const fs = require('fs')
const dbpath = ('./db/product.json')

const fileReader = (callback) => {
    fs.readFile(dbpath, { encoding: 'utf8' },
        (error, data) => {
            const { products } = JSON.parse(data)
            callback(error, products)
        })
}

const Sum = (products) => {
    let sum = 0
    products.forEach(product => {
        sum += product.price * product.count
    })
    return sum
}

const Average = (products) => {
    let priceSum = 0
    products.forEach(product => {
        priceSum += product.price
    })
    return priceSum / products.length
}

const Lessthan = (products, count) => {
    return products.filter(product => product.count < count)
}

module.exports = { fileReader, Sum, Average, Lessthan }