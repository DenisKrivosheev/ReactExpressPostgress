const Router = require('express')
const Brand = require('../controlers/brand.controler')
const router = new Router()


router.post('/',Brand.create)
router.get('/',Brand.getAll)


module.exports = router