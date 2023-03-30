const express = require('express')
require ('dotenv').config()
const userRoter = require('./routes/user.routes')
const sequelize = require('./db')
const fileupload = require('express-fileupload')
const port = process.env.Port || 5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,  'static')))
app.use(fileupload({}))
app.use('/api', userRoter)






/// OBRABOTKA OSHIBOK VSEGDA V KONCE
app.use(errorHandler)
const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, ()=> console.log(`server started at port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()
