const Router = require ("express")
const userControler = require("../server/controlers/user.controler")
const router = new Router()

const devicerouter = require('./deviceR')
const brandrouter = require('./brandR')
const typerouter = require('./typeR')

/*

router.post('/uc', userControler.Registration)
router.get('/ul')
router.get('/ua', userControler.check)
router.get('/us', userControler.getUsers)
router.post('/ur',userControler.getOneUser)
router.put('/uu', userControler.updateUser)
router.delete('/du/:id', userControler.deleteUser)

router.use('/device',devicerouter)
router.use('/brand',brandrouter)
router.use('/type',typerouter)





module.exports = router
*/