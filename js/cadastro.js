
// cria uma variavel e insere o valor que buscou dos inputs pelo DOM atraves dos id's 

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let email = document.querySelector('#email')
let labelEamil = document.querySelector('#labelEmail')
let validEmail = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// criar acoes para as variaves depois que "escuta" eventos do teclado na pagina
// Comecam com validacao falsa, e se todos campos foram preenchidos dentro dos padroes determinados, recebem uma validacao true

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

email.addEventListener('keyup', () => {
  if(email.value.length <= 4){
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Email *Insira no minimo 5 caracteres'
    email.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    email.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 2){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 3 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

// funcao que e acionada apos o click do botao "CADASTRAR"  na pagina 

function cadastrar(){

  // de inicio ja faz a verificacao das variaveis se todas foram preenchidas corretamente
  if(validNome && validEmail && validSenha && validConfirmSenha){
    
  //cria uma variavel que recebe um metodo que converte em objeto javascript ou resgata seus valores se ja existir
    let listaClientes = JSON.parse(localStorage.getItem('listaClientes') || '[]')
    let validacao = {}

  
  //se existir, traga seus valores para nova variavel, se nao existir, preecnha com vazio
    listaClientes.forEach ( (item)=> {
        
      if(email.value == item.emailCad && senha.value == item.senhaCad && nome.value == item.nomeCad) { 
        
        validacao.nome = item.nomeCad,
        validacao.email = item.emailCad,
        validacao.senha =  item.senhaCad       
        
      }   
        });

    // se o email solicitado para cadatro for igual ao ja cadastrado, retorne a informacao ao usuario e nao siga adiante com novo cadastro

      if(email.value == validacao.email ) { 
     
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = '<strong> Usuário já cadastrado com esse e-mail em nossa base de dados, tente novamente!</strong>'
      msgSuccess.innerHTML = ''
      msgSuccess.setAttribute('style', 'display: none')

      nome.value = ''
      email.value = ''
      senha.value = ''
      confirmSenha.value = ''

    
  // se nao, pode cadastrar e siga os passos abaixo
    } else {
    
      listaClientes.push(
      {
        nomeCad: nome.value, 
        emailCad: email.value,
        senhaCad: senha.value
      }
      )
      
      //transforma os dados de objeto JS para String Json e salva no espaco criado dentro do  localStore
      localStorage.setItem('listaClientes', JSON.stringify(listaClientes))
      
    
      msgSuccess.setAttribute('style', 'display: block')
      msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
      msgError.setAttribute('style', 'display: none')
      msgError.innerHTML = ''


      // deu tudo certo, de uma mensagem pro usuario e faz uns segundo a tela com informacao para ele ler.
      setTimeout(()=>{
          window.location.href = '../index.html'
      }, 2000)
    
    }   
    
    //Se nao deu certo,é porque tem algum dado do input que nao foi preenchido corretamente
    //retorna a mensagem de erro pro usuario 
    } else {
      msgError.setAttribute('style', 'display: block')
      msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
      msgSuccess.innerHTML = ''
      msgSuccess.setAttribute('style', 'display: none')
    }
  }


// escuta o evento de click e apresenta os valores do campo ou esconde  
btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})


// escuta o evento de click e apresenta os valores do campo ou esconde  

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})

// Ao clicar no botao, direcioa para pagina especificada
function voltar(){

  window.location.href = '../index.html'

}