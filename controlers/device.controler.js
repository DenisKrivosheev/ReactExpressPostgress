const uuid = require('uuid')
const path = require ('path')
const {Device, DeviceInfo} = require('../models/models')
const { nextTick } = require('process')
const ApiError = require('../error/ApiError')
class DeviceController{
    async Create(req, res, next){
       try {
        const {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))
        const device = await Device.create({name, price, brandId, typeId, img: filename})
        if(info){
            info = JSON.parse(info)
            info.forEach(i => 
                DeviceInfo.create({
                   title: i.title,
                   description: i.description,
                   deviceId: device.id
                })
                
            );
        }

        
        return res.json(device)
       }
       catch (e) {
        next(ApiError.badRequest(e.message))
    }
    }
    async getAll(req, res){
        let {brandID, typeID, limit, page} = req.query
        page = page || 1
        limit = limit ||9
        let offset = page * limit - limit
        let devices;
        if(!brandID && !typeID){
            devices =await Device.findAndCountAll({limit, offset})
        }
        if(brandID && !typeID){
            devices =await Device.findAndCountAll({where: {brandID}, limit, offset})
        }
        if(!brandID && typeID){
            devices =await Device.findfindAndCountAllAll({where:{typeID}, limit, offset})
        }
        if(brandID && typeID){
            devices =await Device.finfindAndCountAlldAll({where:{brandID, typeID}, limit, offset})
        }
        return res.json(devices)
    }
    async getOne(req, res){
      const {id} = req.params
      const device = await Device.findOne(
        {
            where:{id},
            include:[{model:DeviceInfo, as:'info'}]
        }
        
      )
      return res.json(device)  
    }
    async search(req, res){
        const {name} = req.body
        const search = await Device.findOne({
            where: {name},
            attributes:[
                'name', 
                'price',
                'rating',
                'img'
                ]
        }) 
        return res.json(search)
    }

}
module.exports = new DeviceController()