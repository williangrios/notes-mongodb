const Router = require('express').Router
const db = require('../db/connection')
const {ObjectId} = require('mongodb')
const router = Router()

//form criação de rota
router.get('/', function (req, res){
    res.render('notes/create')
})

//insercao da nota no banco
router.post('/', function(req, res ){
    const {title, description} = req.body;
    db.getDb()
    .db()
    .collection('notes')
    .insertOne({title: title, description: description})

    res.redirect( 301, '/')
})


//removendo tarefa
router.post('/delete', function(req, res){
    const {id} = req.body
    const idToDelete = new ObjectId(id);
    db.getDb()
    .db()
    .collection('notes')
    .deleteOne({_id: idToDelete})

    res.redirect(301, "/")
})


module.exports = router