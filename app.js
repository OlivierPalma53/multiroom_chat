/* import das configs do server */
var app = require('./config/server');

/* config da porta a ser escutada ao subir o server */
var server = app.listen(3000, function(){
  console.log('server ON');
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function(socket){
  console.log('usuario conectou');

  socket.on('disconnect', function(socket){
    console.log('Usuario desconectado');
  });

  socket.on('msgParaServidor', function(data){

    /* dialogo */
    socket.emit(
      'msgParaCliente',
      {apelido: data.apelido, mensagem: data.mensagem}
    );

    socket.broadcast.emit(
      'msgParaCliente',
      {apelido: data.apelido, mensagem: data.mensagem}
    );

    /* participantes */
    if(parseInt(data.apelido_atualizado_nos_participantes) == 0){
      socket.emit(
        'participantesParaCliente',
        {apelido: data.apelido}
      );

      socket.broadcast.emit(
        'participantesParaCliente',
        {apelido: data.apelido}
      );
    }
  });

});
