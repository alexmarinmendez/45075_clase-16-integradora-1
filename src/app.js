import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import pokeRouter from './routes/pokedex.router.js'
import trainerRouter from './routes/trainer.router.js'
import __dirname from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Configuracion de la Carpeta Publica
app.use(express.static(__dirname + '/public'))

app.use('/pokedex', pokeRouter)
app.use('/trainer', trainerRouter)
app.get('/', (req, res) => res.send('Hola Mundo!'))

const uri = "mongodb+srv://coder:coder@cluster0.ef7umxt.mongodb.net/pokedex?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
mongoose.connect(uri, error => {
    if (error) {
        console.log('No se pudo conectar con la base de datos')
        return
    }
    console.log('DB connected!')

    const server = app.listen(8080, () => console.log('Server Up!'))
    server.on('error', e => console.log(e))
})
