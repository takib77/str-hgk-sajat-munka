// Az állományok archiválásához kell készítened egy egyszerű alkalmazást. Az alkalmazás egy paraméterként
// megadott útvonalon lévő fájlról készít egy másolatot ugyanabba a könyvtárba.

// A fájl útvonala/neve elég, ha egy változóban van tárolva.
// Az új fájl neve az eredeti fájl neve a végén a .bak kiegészítéssel.
// Ennek a fájlnak a tartalmát egy gz fájlba becsomagoljuk be.
// Amennyiben a minden művelet sikeres volt, az eredeti fájlt és a .bak fájlt is töröljük ki!

const { createReadStream, createWriteStream, readFile, unlink } = require('fs')
const { createGzip } = require('zlib')

const archiveFile = (file) => {
    const readableStream = createReadStream(file, {
        encoding: 'utf-8',
        highWaterMark: 13
    })

    const writeableStream = createWriteStream(`${file}.bak`)
    const createCompressedFile = createWriteStream(`${file}.gz`)

    readableStream.pipe(writeableStream)
    readableStream
        .pipe(createGzip())
        .pipe(createCompressedFile)

    unlink(file, (err) => {
        if (err) throw err
        console.log('Original file was deleted!')
    })
    unlink(`${file}.bak`, (err) => {
        if (err) throw err
        console.log('Bak file was deleted!')
    })
}

module.exports = archiveFile