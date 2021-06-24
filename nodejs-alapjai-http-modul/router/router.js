const siteController = require('../controller/controller')

const router = {
    '/': res => siteController.index(res),
    '/about': res => siteController.about(res),
    '/contact': res => siteController.contact(res),
    '/404': res => siteController.error404(res)
}

module.exports = Object.freeze(router)
