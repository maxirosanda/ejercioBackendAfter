import express from 'express'
import handlebars from 'express-handlebars'
import productsRoutes from './routes/productsRoutes.js'
import cartsRoutes from './routes/cartsRoutes.js'
import viewsRoutes from './routes/viewsRoutes.js'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import productsSocket from './sockets/productsSocket.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static',express.static(__dirname +'/public'))
app.engine('hbs',handlebars.engine({ extname: '.hbs' }))
console.log(__dirname)
app.set('views',__dirname + '/views')
app.set('view engine','hbs')

const httpServer = app.listen(8080,()=>{
    console.log("sevidor en puerto 8080")
})

const io = new Server(httpServer)

app.use('/api/products',productsRoutes)
app.use('/api/carts',cartsRoutes)
app.use('/api/products',productsRoutes)
app.use('/',viewsRoutes)

io.on('connection',socket =>{
    productsSocket(socket)
})