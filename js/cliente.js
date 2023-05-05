
// verirfica se a pagina contem no localstorange um token, se nao tiver redireciona o usuraio para outra pagina
/*
if(localStorage.getItem('token') == null) {
   alert('Voce precisa logar antes para acessar esssa página')
    window.location.href ='../index.html'    
}
*/

// acionada a funcao ao clicar no botao "consultar"
function consultarCep(){

  let cep = document.getElementById('cep').value

  // verifica se o campo esta com mais que 8 digitos, se tiver ele da um alerta ao usuario e sai da funcao
  if (cep.length != 8 ){
    alert('Cep inválido')
    return
  }

// se tiver ok, monta a url com a variavel para consumir a api atraves do fecth

  let url = `https://viacep.com.br/ws/${cep}/json/`

// o fecth recebe uma promisse
// primeiro then serve para transformar promisse 
// segundo then serve para json em objeto e chamar a funcao direto com passagem de parametros
  fetch(url).then(function(response){
    response.json().then(mostrarDados);
  })

}


//acionada pela funcao anterior 

function mostrarDados(dados){

  let resultado = document.getElementById('resultado')
  
  // se os parametros gerarem erro, informa ao usuario o erro

  if (dados.erro){
    resultado.innerHTML = '<p> Endereço inválido em nossa base de dados, verifique o cep digitado!</p>'
  
  // se nao, pega os resultados do parametro e monta na pagina atraves do dom
  } else {
    resultado.innerHTML=  `<table class="container">
                          <thead>
                            <tr>
                              <th><h3>Endereço</h3></th>
                              <th><h3>Bairro</h3></th>
                              <th><h3>Cidade</h3></th>
                              <th><h3>UF</h3></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>${dados.logradouro}</td>
                              <td> ${dados.bairro}</td>
                              <td>${dados.localidade}</td>
                              <td>${dados.uf} </td>
                            </tr>
                            <tr>
                          </tbody>
                        </table>`
    
    

  
  }
}

// limpa a tela para novas consultas

function limparDados(){

  let resultado = document.getElementById('resultado')

  resultado.innerHTML=  ``
  cep.value= ''
  

}


// além de remover o token, rediciona o usuario para pagina especificada

function sairLogin(){
    
    localStorage.removeItem('token')
    window.location.href ='../index.html'
  
  }