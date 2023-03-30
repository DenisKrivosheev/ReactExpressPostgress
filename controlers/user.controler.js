const db = require('../db')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket}= require('../models/models')
const{Op} = require('sequelize')

gentratejwt = (id, email, role) =>{
    return jwt.sign(
                {id, email, role},
                process.env.SECRET,
                {expiresIn:'24h'}
         )
}

class UserController{
    async Registration(req, res, next){
        const{username, email, password, role}= req.body
        if (!username || !email|| !password){
            return next(ApiError.badRequest('not introdused * row'))
        }
        const canditate = await User.findOne({where:{username}}||{where:{email}})
        if (canditate){
            return next(ApiError.badRequest(`user with this email or username is registered`))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, username, role, password:hashPassword})
        const basket = await Basket.create({userId : user.id})
        const token = gentratejwt(user.id, user.email, user.role)
        res.json({token})
    }
    async login(req, res, next){
        const {email, username, password} = req.body
        const user = await User.findOne({
            where:{[Op.or]:[{email},{username}]}})
        console.log(user)
        if(!user){
            return next(ApiError.internal('user or email not found'))
        }
        
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return  next(ApiError.internal('incorect password'))
        }
        const token = gentratejwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async getUsers(req, res){
        const users = await User.findAll({
            attributes:[
                'id',
                'email',
                'username',
                'role', 
                'createdat',
                'updatedat'
                ]})
        return res.json(users)
    }
    async getOneUser(req, res){
        const {username, email, id} = req.body
        const user = await User.findOne({
            where:{[Op.or]:[{email},{username}, {id}]},
            attributes:[
                'id',
                'email',
                'username',
                'role', 
                'createdat',
                'updatedat'
                ]
        
        })
        return res.json(user)

    }
    async updateUser(req, res){}
    async deleteUser(req, res){
        const {id} = req.params 
        const del = await User.destroy({
         where : {id}})
         return res.json(del)
    }
    async check(req, res, next){
        const token = gentratejwt(req.user.id, req.user.email, req.user.role)
        return res.json({token});
    }
}
module.exports = new UserController()