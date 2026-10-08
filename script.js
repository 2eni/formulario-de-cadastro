

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


document.getElementById("formCadastro").addEventListener("submit", function(evento) {
    evento.preventDefault(); //evita reload na pagina
    // Pega os id para colocar no arquivo do localStorage
    const cadastro = {
        nome: document.getElementById("nome").value,
        cep: document.getElementById("cep").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        numero: document.getElementById("numero").value,
    };
    // Cria arquivo no local storage e  converte de JS para JSON
    localStorage.setItem('dados', JSON.stringify(cadastro));
    // Exibe mensagem
    alert('Cadastro criado com sucesso');
});

document.addEventListener('DOMContentLoaded', ()=>{
    // Carrega o arquivo do LocalStorage
    const recuperaDados = localStorage.getItem("dados");
    if (recuperaDados){
        // converte de JSON para JS
        const dados = JSON.parse(recuperaDados);
        // atribui o valor para seu campo
            document.getElementById('nome').value = dados.nome || '';
            document.getElementById('cep').value = dados.cep || '';
            document.getElementById('logradouro').value = dados.logradouro || '';
            document.getElementById('numero').value = dados.numero || '';
            document.getElementById('bairro').value = dados.bairro || '';
            document.getElementById('cidade').value = dados.cidade || '';
            document.getElementById('estado').value = dados.estado || '';
        }
});