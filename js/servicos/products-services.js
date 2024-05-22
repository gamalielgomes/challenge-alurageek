const url = "http://localhost:3000/produtos"

const productList = () => {
    return fetch(url)
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

const adicionarprodutos = (nome, preço, imagem,) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "aplication/json"
        },
        body: JSON.stringify({
            nome,
            preço,
            imagem,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

async function apagarCard(id){
    const conexao = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });

    return conexao;
}

export const servicesProducts = {
    productList,
    adicionarprodutos,
    apagarCard
}