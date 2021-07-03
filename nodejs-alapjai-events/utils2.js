// Ezt a Logger class-t kell felhasználod a következő alkalmazás során, melyet szintén neked kell elkészíteni:
// Az alkalmazás egy tetszőleges txt fájl tartalmát olvassa be stream segítségével, majd átalakítja úgy,
// hogy mindegyik szó első karaktere nagybetűs lesz, a kimenetet pedig elmenti egy új fájlba, aminek a neve
// az eredeti fájl neve összefűzve a Copy string-gel. A kiterjesztés .txt maradjon.
// Amennyiben bármi hiba adódott, a Logger error metódusát kell meghívni, paraméterként átadva neki
// az error object message property-jének az értékét. Amennyiben nem volt hiba, a Logger success metódusát
// kell meghívni, paraméterként átadva neki a következő string-et: "File transform successful."

const { createReadStream, createWriteStream } = require('fs')
const Logger = require('./utils1')
const logger = new Logger()

logger.on('error', () => { })
logger.on('success', () => { })

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

const textTrasformWithStream = (file) => {
    const readableStream = createReadStream(`${file}.txt`, {
        encoding: 'utf-8',
        highWaterMark: 1024
    })
    readableStream.on('data', (chunk) => {
        const content = chunk.split(' ')
            .map(word => capitalizeFirstLetter(word)).join(' ')
        console.log(content)
    })

    logger.emit('data', readableStream)

    const writeableStream = createWriteStream(`${file}Copy.txt`, 'utf-8')

    writeableStream.on('finish', (err) => {
        if (err) {
            logger.error('Transform failed!')
        }
        logger.success('Transform done!')
    })

    readableStream.pipe(writeableStream)
}

module.exports = textTrasformWithStream()
