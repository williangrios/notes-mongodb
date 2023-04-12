const Router = require('express').Router
const db = require('../db/connection')
const {ObjectId} = require('mongodb')
const router = Router()



//view de detalhes na nota
router.get('/:id', async function(req, res) {
    const id = new ObjectId(req.params.id);
    const note = await db.getDb().db().collection('notes').findOne({_id: id});
    res.render('notes/detail', {note});
});

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

//view de edicao de nota
router.get('/edit/:id', async function(req, res){
    const id = new ObjectId(req.params.id);
    const note = await db.getDb().db().collection('notes').findOne({_id: id});
    res.render('notes/edit', {note})
} )

//edicao de notas
router.post('/update', function(req, res){
    const data = req.body;
    const id = new ObjectId( data.id);
    const title = data.title;
    const description = data.description;
    console.log(title);
    db.getDb().db().collection('notes').updateOne({_id: id}, {$set: {title: title, description: description} });
    
    res.redirect('/');
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