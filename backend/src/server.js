//yarn dev para iniciar o servidor
// Métodos HTTP: POST, GET, PUT, DELETE 

//Tipos de parâmetros:
// req.query = Acessar query params. Para get(filtros).
// req.params = Acessar route params. Para put e delete.
// req.body = Acessar corpo da requisição. Para post e put.
// req.file = Acessar arquivos.
// req.headers = Acessar cabeçalho.

//MVC : models - views - controllers. No nosso caso, não teremos a pasta views pq estamos criando uma API Rest. A views será o react e react native.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();//Aplicação express
const server = http.Server(app);//É o servidor http.O que foi feito foi pegar o servidor http de dentro do express e extrair ele.
const io = socketio(server);//O server passa a conseguir ouvir também o protocolo websocket
//Assim, a aplicação fica pronta pra ouvir tanto requisiçoes com protocolo http quanto requisições com o protocolo websocket

io.on('connection', socket => { //anota todos os usuarios logados na aplicação
    console.log('U', socket.id);
});

mongoose.connect('mongodb+srv://fabiomiranda:fabio@semanaomnistack9.qjv25.mongodb.net/semana9?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);