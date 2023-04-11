//configurações
const express = require('express')
const expresshbs = require ('express-handlebars')
const bodyParser = require ('body-parser')

const app = express()
const port = 8000;

//DB
const db = require('./db/connection')



//template engine
app.engine('handlebars', expresshbs.engine())
//view engine é a engine que usamos para executar o html (no projeto agenda usamos o ejs)
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

//importing routes
const notesRoutes = require('./routes/notes')


//rotas
app.get('/', async function(req, res) { 
    const notes = await db.getDb().db().collection('notes').find({}).toArray()
    res.render('home', {notes});
})

app.use('/notes', notesRoutes)

db.initDb((err, db) => {
    if (err){
        console.log(err);
    }else{
        console.log('Conectado ao banco');
        app.listen(port, () => {
            console.log(`iniciou na porta ${port}`);
        })
    }
})


