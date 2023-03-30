const Router = require('express')
const deviceControler = require('../controlers/device.controler')
const router = new Router()




module.exports = router
router.post('/',deviceControler.Create)
router.get('/',deviceControler.getAll)
router.get('/:id',deviceControler.getOne)


module.exports = router