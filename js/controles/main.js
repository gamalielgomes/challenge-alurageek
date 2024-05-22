import { servicesProducts } from "../servicos/products-services.js";

const produtosContainer = document.querySelector("[data-produtos]");
const form = document.querySelector("[data-form]");

function criarCardProduto(nome, preço, imagem, id){
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('data-id', id);
    card.innerHTML = `
        <img class="img-produtos" src="${imagem}" alt="${nome}">
        <div class="card-container--info">
            <p>${nome}</p>
            <div class="card-container--value">
                <p class="preço">$ ${preço}</p>
                <img id="deletar" src="./assets/icon_trash_2_.png" alt="Ícone deletar">
            </div>
        </div>
    `
    
    const lixeira = card.querySelector('#deletar')
    lixeira.addEventListener('click', async() =>{
        const i = card.getAttribute('data-id');
        card.remove()
        await apagarCard(i);//chama a função apagar card
    });

    produtosContainer.appendChild(card);
    return card;
}

const exibirProdutos = async () => {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        const listaProdutos = await servicesProducts.productList();
        listaProdutos.forEach(produto => {
            produtosContainer.appendChild(
                criarCardProduto(produto.nome, produto.preço, produto.imagem, produto.id))
        });
    } catch (error) {
        mensagemErro.innerHTML = `<span>OPS, ALGO DEU ERRADO!</span>`;
    }
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;

   servicesProducts.adicionarprodutos(nome, preco, imagem).then((res) => console.log(res))
})

exibirProdutos()
