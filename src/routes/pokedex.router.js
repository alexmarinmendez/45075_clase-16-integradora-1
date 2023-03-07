import { Router } from 'express'
import pokeModel from '../models/pokedex.models.js'
const router = Router()

// import express from 'express'
// const router = express.Router()

router.get('/', async (req, res) => {
    // res.send('Lista de pokemones...')
    const pokemons = await pokeModel.find().lean().exec()
    res.render('list', { pokemons })
})

router.get('/create', (req, res) => {
    res.render('create')
})

router.get('/:name', async (req, res) => {
    const name = req.params.name
    // res.send('Mostrando el pokemon ' + name)
    // res.send(`Mostrando el pokemon ${name}`)
    const pokemon = await pokeModel.findOne({ name: name }).lean().exec()
    res.render('one', {
        pokemon
    })
})

router.post('/', async (req, res) => {
    const newPokemon = req.body
    console.log(newPokemon)
    const pokemonGenerated = new pokeModel(newPokemon)
    await pokemonGenerated.save()
    // res.redirect('/pokedex/' + pokemonGenerated.name)
    res.redirect(`/pokedex/${pokemonGenerated.name}`)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    res.send(`Borrando el pokemon con id = ${id}`)
})

export default router