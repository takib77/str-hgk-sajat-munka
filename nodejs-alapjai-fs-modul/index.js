const createDirAndFileStructure = require('./utils1')
const archiveFile = require('./utils2')

const fileName = './text.txt'

createDirAndFileStructure()
archiveFile(fileName)