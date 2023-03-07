import { Router } from 'express'
const router = Router()

// import express from 'express'
// const router = express.Router()

router.get('/', (req, res) => {
    // res.send('Lista de pokemones...')
    res.render('list')
})

router.get('/:name', (req, res) => {
    const name = req.params.name
    // res.send('Mostrando el pokemon ' + name)
    res.send(`Mostrando el pokemon ${name}`)
})

router.post('/', (req, res) => {
    const pokedata = req.body
    res.send('Creación de pokemon...')
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Borrando el pokemon con id = ${id}`)
})

export default router