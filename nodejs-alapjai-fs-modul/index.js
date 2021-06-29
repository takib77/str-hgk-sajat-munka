const { createDirAndFileStructure, createDirs, createFiles } = require('./utils1')
const archiveFile = require('./utils2')

const dirNames = ['controller', 'routers', 'views']
const fileNames = ['controller/site.controller.js', 'routers/site.router.js', 'views/index.html', 'app.js']
const textFile = './text.txt'

// createDirAndFileStructure()

const createStructure = () => {
    createDirs(dirNames)
    // console.log(`Directories: ${dirNames} was created.`)
    createFiles(fileNames)
    // console.log(`Files: ${fileNames} created.`)
}

createStructure()
archiveFile(textFile)