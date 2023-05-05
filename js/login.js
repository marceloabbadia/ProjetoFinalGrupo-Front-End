

let btnSenha = document.getElementById('verSenha')

// escuta o evento de click e apresenta os valores do campo ou esconde  

btnSenha.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})


// acionado apos clicar no botao "entrar"

function validarLogin(){

  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value

// verifica se os campos foram todos preenchidos 
// se estiver ok, cria a variavel e o objeto atraves de uma classe

  if(senha != '' && email != '') {
  
    let listaClientes =[];

    const userValid = new Usuario()
  

// pega a lista que foi gerada no localStorage

    listaClientes = JSON.parse(localStorage.getItem('listaClientes'))

// se nao existir a lista no localStorage da um retorno ao usuario, se existir segue o codigo 

    if (listaClientes == null){
      alert ("Nao existe ninguem cadastrado no sistema ainda!")
    } else { 

 // resgata os valores de dentro da lista no localStorage e alimenta o objeto criado local      
 
      listaClientes.forEach ( (item)=> {
        
      if(email == item.emailCad && senha == item.senhaCad) { 
    
              userValid.email =  item.emailCad,
              userValid.senha =item.senhaCad
        }   
        });


  // se o que estiver ja cadastrado no localStorange for difernete ao informado no login e senha do input
  // retorna o erro ao usuario 

      if (userValid.email != email || userValid.senha != senha){
        alert ( "Senha ou login inválidos!")
       
  // se for tudo igual, segue o codigo e cria um token com funcao matematica nativa do JS
      } else {
        
        let token = Math.random().toString(16).substring(2)+ Math.random().toString(16).substring(2)
        localStorage.setItem('token',token)
        
        alert("Seu token foi validado e voce será redirecionado!")
  
  // redireciona para o endereco informado 
        
        window.location.href ='../cliente.html'
      
      }
    }
    
  } else {
    alert("Preencha todos os dados!")
  }

}
