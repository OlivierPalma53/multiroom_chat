module.exports.iniciaChat = function(application, req, res){

  var dadosForm = req.body;
  req.assert('apelido', 'Nome ou apelido e obrigatorio').notEmpty();
  req.assert('apelido', 'Nome ou apelido deve conter de 3 a 15 caracteres').len(3,15);

  var errors = req.validationErrors();

  if(errors){
    res.render('index', {validacao: errors});
  }

  application.get('io').emit(
    'msgParaCliente',
    {apelido: dadosForm.apelido, mensagem: ' entrou no chat'}
  );

  res.render('chat', {dadosForm: dadosForm});
}
