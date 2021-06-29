// Egy webes projekt esetében gyakran ugyanolyan, vagy hasonló mappástruktúrával dolgozunk.
// Ahhoz, hogy ne kelljen minden alkalommal manuálisan létrehozni a mappákat, és a fájlokat,
// készíts egy olyan alkalmazást, ami létrehozza az alábbi mappa/fájlstruktúrát:
// controllers
//      site.controller.js
// routers
//     site.router.js
// views
//     index.html
// app.js

const { access, mkdir, writeFile, readdir } = require('fs').promises

const createDirAndFileStructure = () => {
    access('dist')
        .catch(() => mkdir('dist'))
        .then(() => mkdir('dist/controller'))
        .then(() => mkdir('dist/routers'))
        .then(() => mkdir('dist/views'))
        .then(() => writeFile('dist/controller/site.controller.js', '// CONTROLLER'))
        .then(() => writeFile('dist/routers/site.router.js', '// ROUTER'))
        .then(() => writeFile('dist/views/index.html', '<!DOCTYPE html>'))
        .then(() => writeFile('dist/app.js', '// APP'))
        .then(() => readdir('dist'))
        .then(console.log)
        .catch((err) => console.error(err))
}


const createDirs = (dirNames) => {
    dirNames.map(dir => mkdir(dir))
}

const createFiles = (fileNames) => {
    fileNames.map(file => writeFile(file, ''))
}

module.exports = { createDirAndFileStructure, createDirs, createFiles }