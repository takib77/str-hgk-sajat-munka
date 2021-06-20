const Logger = require('./utils1')
const textTrasformWithStream = require('./utils2')
const logger = new Logger()

logger.on('error', () => { })
logger.on('success', () => { })

logger.error('Hiba!')
logger.success('Siker!')

textTrasformWithStream('./text')