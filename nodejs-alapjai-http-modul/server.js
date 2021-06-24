const http = require('http')
const router = require('./router/router')

const port = process.env.PORT || 8080

http.createServer((req, res) => {
    const localTime = new Intl.DateTimeFormat('hu-HU').format(new Date())
    const logData = {
        'Date': `${localTime}`,
        'Url': `${req.url}`,
        'Method': `${req.method}`
    }
    console.log(logData)
    router[req.url]
        ? router[req.url](res)
        : router['/404'](res)
})
    .on('error', (err) => console.log(`Server error: ${err.message}`))
    .on('listening', () => console.log(`Server is running at http://127.0.0.1:${port}`))
    .listen(port)
