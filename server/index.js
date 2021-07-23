const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


//importar rutas
const routes = require('./routes/index')

//conexion base de datos
mongoose.connect('mongodb://localhost/crud-mongodb')
.then(db=>console.log('conectado a la base de datos'))
.catch(err=>console.log(err))

//configuraciones servidor
app.set('port', process.env.PORT || 3001)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//ejecutar middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//rutas
app.use('/',routes)

//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log(`Aplicación corriendo en puerto ${app.get('port')}`)
})