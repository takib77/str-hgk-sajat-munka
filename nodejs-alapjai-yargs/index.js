const yargs = require('yargs')
const {
    fileReader,
    Sum,
    Average,
    Lessthan
} = require('./product.service')

yargs
    .version('1.0.0')
    .usage('Usage: <command> [options]')
    .command({
        command: 'sum',
        describe: 'Get sum of all products price',
        handler: () => {
            fileReader((error, products) => {
                if (error) throw error
                console.log('Sum of products:', Sum(products))
            })
        }
    })
    .command({
        command: 'average',
        describe: 'Get average price of all products',
        handler: () => {
            fileReader((error, products) => {
                if (error) throw error
                console.log('Average price of products:', Average(products))
            })
        }
    })
    .command({
        command: 'lessthan',
        describe: 'List of products witch are less than the gifted count (-c)',
        builder: {
            count: {
                alias: 'c',
                describe: 'Count of products',
                type: 'number',
                demandOption: true,
            },
        },
        handler: ({ count }) => {
            fileReader((error, products) => {
                if (error) throw error
                console.log('List of products:', Lessthan(products, count))
            })
        }
    })
    .locale('en')
    .strict()
    .help()
    .parse()