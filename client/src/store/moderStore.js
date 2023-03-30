import{makeAutoObservable} from 'mobx'

export default class ModerStore{
    constructor(){
        this._users = []
        this._seluser = {}
        this._finduser ={}
        this._bans = []
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setUsers(users){
        this._users = users
    }
    setSelUser(user){
        this._seluser = user
    } 
    setFindUser(fuser){
        this._finduser = fuser
    }
    setBans(bans){
        this._bans = bans
    }
    setTotalCount(count){
        this._totalCount = count
    }
    

    get selUser(){
        return this._seluser
    }
    get users(){
        return this._users
    }

    get finduser(){
        return this._finduser
    }

    get bans(){
        return this._bans
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}