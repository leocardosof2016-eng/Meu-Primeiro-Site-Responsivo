//getDocumentById -> Elementos com ID
//querySelector -> Elementos class

let livroSelecionado = "";
let autorSelecionado = "";
let imagemSelecionada = "";


//Elementos do Modal
const modal = document.getElementById("modal_frame");
const infoLivro = document.getElementById("info_livro");
const imagemModal = document.querySelector(".imagem_modal");
const fecharModal = document.querySelector(".fechar_modal");
const modalContent = document.querySelector(".modal_content");
const btnConfirmar = document.getElementById("btn_confirmar");
const inputTelefone = document.getElementById("telefone_cliente");

const botoesComprar = document.querySelectorAll(".btn_comprar")

//Função para abrir o modal
botoesComprar.forEach(botao => {
    botao.addEventListener("click", function(){

        //Pega os dados do livro selecionado | O 'this' se refere ao HTML
        livroSelecionado = this.getAttribute("data-titulo");
        autorSelecionado = this.getAttribute("data-autor");
        imagemSelecionada = this.getAttribute("data-imagem");

        //Insere os dados na seção dentro do modal
        infoLivro.innerHTML = 'Livro selecionado: <strong>' + livroSelecionado + '</strong><br>' + 'Autor: <strong><i>' + autorSelecionado + '</i><strong>'
        imagemModal.src = imagemSelecionada

        //Torna o modal visível
        modal.style.display = "flex";
    }); 
});

//Função para fechar o modal
function fechamentoModal() {
    modal.style.display = "none";
};

//Fechamento do modal ao clicar no btn_fechar
fecharModal.addEventListener("click", fechamentoModal); 

//Integração com a API do Whatsapp
btnConfirmar.addEventListener("click", () => {
    let telefone = inputTelefone.value.replace(/\D/g, ""); //-> Utilizando uma expressão regular pra encontrar elementos desnecessários
    let telefoneLimpo = telefone.trim();

    if(telefoneLimpo !== "" && telefone.length === 11 ){
        let telefoneFinal = "55" + telefone
        let mensagem = 'Pedido do livro *' + livroSelecionado + '*, de autoria: _' + autorSelecionado + '_ realizado! '+
        '\nO envio dessa mensagem garante que você possa o comprar em breve.'

        const urlWhatsapp = `https://wa.me/${telefoneFinal}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(urlWhatsapp, "_blank");
    }else{
        alert("Por favor, digite um número de telefone válido com DDD.");
    };

    inputTelefone.value = "";
    fechamentoModal;
});
