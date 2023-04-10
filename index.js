//configurações
const express = require('express')
const expresshbs = require ('express-handlebars')
const bodyParser = require ('body-parser')

const app = express()
const port = 8000;

//template engine
app.engine('handlebars', expresshbs.engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'))

//rotas
app.get('/', function(req, res) { 
    res.render('home')
})

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`);
})