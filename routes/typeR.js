const Router = require('express')
const typeControler = require('../controlers/type.controler')
const router = new Router()
const typerouter = require('../controlers/type.controler')
const checkrole = require('../middleware/checkrole')


router.post('/', checkrole('ADMIN') ,typeControler.create)
router.get('/',typeControler.getAll)


module.exports = router