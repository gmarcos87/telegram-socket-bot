var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var uuid = require('node-uuid');
var puerto = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var Bot = require('node-telegram-bot-api');


//Telegram bot config
var token = ''; //<-----Telegram bot token
var bot = new Bot(token, { polling: true });


//Express config
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("" + __dirname + "/dist"));


//Temporal storage
var messages = [];
var resultadosCache= [];


//Sockets
io.on('connection', function(socket) {  

  console.log('Alguien se ha conectado con Sockets');
  socket.on('new-message', function(data) {
    io.sockets.emit('messages', messages);
  });
});


//Bot functions
bot.on('inline_query',function(res){
  if(res.query.length > 4){    
  var termino = res.query;
  fetch('https://yts.ag/api/v2/list_movies.json?sort_by=rating&query_term='+termino.replace('@socketes_bot ',''))
      .then(function(res) {
          return res.json();
      }).then(function(json) {
          resultados = [];
            for (var i = json.data.movies.length - 1; i >= 0; i--) {
              var peli = json.data.movies[i];
              
              var pelicula = {
                type:'article',
                id:uuid.v1(),
                title: peli.title,
                input_message_content: {message_text:'*'+peli.title+'*\n _'+peli.year+' - Rating:'+peli.rating+'_ \n[Descargar torrent!]('+peli.torrents[0].url+')',parse_mode:'Markdown'},
                url:peli.torrents[0].url,
                description: peli.year+' - Rating:'+peli.rating,
                thumb_url: peli.small_cover_image 
              console.log(pelicula.id)
              resultados.push(pelicula)
              resultadosCache[pelicula.id] = pelicula;
              if(i==0){
                bot.answerInlineQuery(res.id, resultados)
              }
            }       
      });
  }
})
bot.on('chosen_inline_result',function(res){
  var pelicula = resultadosCache[res.result_id];
  console.log(pelicula)
  var ahora = new Date();
  ahora = ahora.getTime();
  io.sockets.emit('messages', {user:res.from.first_name ,title: pelicula.title ,url:pelicula.url, id:res.result_id, time: ahora});
  messages.push( {user:res.from.first_name ,title: pelicula.title ,url:pelicula.url, id:res.result_id, time: ahora});
})
console.log('bot server started...');



//Express routes
app.post('/telesocket', function(req, res) { 
    console.log({user:req.body.user,title:req.body.title,url:req.body.url,id:req.body.id})
    var data = {user:req.body.user,title:req.body.title,url:req.body.url,id:req.body.id};
    messages.push(data)
    io.sockets.emit('messages', data);
    res.send({msg:'ok'});
  });
app.get('/telesocket', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(messages))
})


server.listen(puerto, function() {  
  console.log("Running http://localhost:"+puerto);
});

