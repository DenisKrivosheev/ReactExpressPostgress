const Router = require ("express")
const userControler = require("../controlers/user.controler")
const router = new Router()
const devicerouter = require('./deviceR')
const brandrouter = require('./brandR')
const typerouter = require('./typeR')
const Authmiddleware = require('../middleware/Authmiddleware') 


router.post('/uc', userControler.Registration)
router.post('/ul', userControler.login)
router.get('/ua', Authmiddleware, userControler.check)
router.get('/us', userControler.getUsers)
router.post('/ur',userControler.getOneUser)
router.put('/uu', userControler.updateUser)
router.delete('/du/:id', userControler.deleteUser)

router.use('/device',devicerouter)
router.use('/brand',brandrouter)
router.use('/type',typerouter)





module.exports = router