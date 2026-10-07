

//Ouvir o evento quando o usuário sair do campo cep
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    //Validar cep
    if(!(cepInformado.length === 8))
        return;

    fetch (`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro){
                document.getElementById('estado').value = data.uf;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
            } else{
                alert("CEP não encontrado")
            } 
        })
        .catch(error=>  console.error("Erro ao  buscar CEP: ", error));
})

const botao = document.getElementById("btn");
const nome = document.getElementById("nome");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const numero = document.getElementById("numero");

botao.addEventListener("click", ()=> {
    const atualSalvo = localStorage.getItem('dados');
    localStorage.setItem('dados', nome, cep, estado, cidade,  logradouro, bairro, numero);
})

document.addEventListener('DOMContentLoaded', ()=>{
    const temSalvo = localStorage.getItem('dados');
})