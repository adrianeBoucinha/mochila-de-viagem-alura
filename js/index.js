//DARK MODE
document.querySelector("#btn").addEventListener('click', () => {
    document.body.classList.toggle("dark-mode")
})

//VARIÁVEIS 
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista'); 
const itens = JSON.parse(localStorage.getItem("itens")) || [];


//PARA CADA ITEM ADICIONADO, CHAMAR A FUNÇÃO CRIAELEMENTO, PASSANDO O NOVO ITEM
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )


form.addEventListener("submit",(evento) => {
    evento.preventDefault(); //PARA NÃO RECARREGAR A PÁGINA

    const nome = evento.target.elements['nome']; //PEGAR EXATAMENTE O VALOR QUE ESTÁ DENTRO DO INPUT
    const quantidade = evento.target.elements['quantidade']; //PEGAR EXATAMENTE O VALOR QUE ESTÁ DENTRO DO INPUT

    const existe = itens.find( elemento => elemento.nome === nome.value);

    //CRIANDO O OBJETO PARA COLOCAR NO ARRAY ITENS
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if(existe) {
        //SE EXISTER O MESMO NOME DO ITEM - ATUALIZAR COM O ID
        itemAtual.id = existe.id; 
        
        //ATUALIZAR O NOVO ITEM NA LISTA
        atualizaItem(itemAtual);

        //ARRAY DE ITENS, NA POSIÇÃO [EXISTE.ID] E SOBRESCREVER COM A QUANTIDADE ATUAL
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    } else {
        //CHAMAR O ID DO OBJETO ITEM ATUAL E VERIFICAR NO ARRAY ITENS O TAMANHO, PARA ACRESCENTAR +1 
        //USANDO O OPERADOR TERNARIO DE IF /ELSE ? : 
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0

        //CHAMAR A FUNÇÃO COM O VALUE DO PARAMETRO 
        criaElemento(itemAtual); 

        //COLOCAR O OBJETO DENTRO DO ARRAY
        itens.push(itemAtual);
    }

    //ARMANEZAR NO LOCAL STORAGE
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""; //PARA LIMPAR O CAMPO DIGITADO, PEGAR SEMPRE O VALUE!!!
    quantidade.value = ""; //PARA LIMPAR O CAMPO DIGITADO, PEGAR SEMPRE O VALUE!!!
}) 

//CRIAR ATUALIZA ITEM
function atualizaItem(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade; 
}

//CRIAR O NOVO ITEM
function criaElemento(item) {
    //<li class="item"><strong>10</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id; //PARA CRIAR UM ID PARA O STRONG
    novoItem.appendChild(numeroItem); //COLOCANDO 1 ITEM DENTRO DO OUTRO

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id)); // COLOCANDO BOTAO DENTRO DA FUNCAO CRIAR ITEM

    //SELECIONO A UL E COLOCO O FILHO DELA, LI DENTRO PARA ACRESCENTAR
    lista.appendChild(novoItem); 
}



//CRIAR BOTAO PARA REMOVER ITEM
function botaoDeleta(id) {
    const botao = document.createElement('button');
    botao.classList.add('botaoDeleta');
    botao.innerText = "X";

    botao.addEventListener('click', function() {
        deletaItem(this.parentNode, id) //remover o pai do elemento botão
    })

    return botao;
}

//REMOVER OS ITENS CRIADOS
function deletaItem(tag, id) {
    tag.remove();
    
    //PARA REMOVER 1 ITEM DO ARRAY
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //PARA REMOVER 1 ITEM DO LOCAL STORAGE
    localStorage.setItem("itens", JSON.stringify(itens));

}