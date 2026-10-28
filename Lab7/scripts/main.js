
/* ESTADO E VARIÁVEIS */

const nodeListaProdutos = document.querySelector("#lista-produtos")
const nodeListaCesto = document.querySelector("#lista-cesto")
const nodeTotal = document.querySelector("#total")

// Carregar os produtos guardados ou começar com um cesto vazio
const produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados")) || []


/* FUNÇÕES AUXILIARES */

function criarProduto(produto) {

    const nodeArticle = document.createElement("article")

    const nodeImagem = document.createElement("img")
    nodeImagem.src = produto.image
    nodeImagem.alt = produto.title

    const nodeTitulo = document.createElement("h3")
    nodeTitulo.textContent = produto.title

    const nodeCategoria = document.createElement("p")
    nodeCategoria.textContent = produto.category

    const nodePreco = document.createElement("p")
    nodePreco.textContent = produto.price.toFixed(2) + " €"
    nodePreco.classList.add("preco")

    const nodeButton = document.createElement("button")
    nodeButton.textContent = "Adicionar ao cesto"

    // Guardar o botão para adicionar o produto ao cesto
    nodeButton.dataset.id = produto.id

    nodeArticle.append(nodeImagem)
    nodeArticle.append(nodeTitulo)
    nodeArticle.append(nodeCategoria)
    nodeArticle.append(nodePreco)
    nodeArticle.append(nodeButton)

    return nodeArticle
}


function criarProdutoCesto(produto, posicao) {

    const nodeArticle = document.createElement("article")

    const nodeImagem = document.createElement("img")
    nodeImagem.src = produto.image
    nodeImagem.alt = produto.title

    const nodeTitulo = document.createElement("h3")
    nodeTitulo.textContent = produto.title

    const nodePreco = document.createElement("p")
    nodePreco.textContent = produto.price.toFixed(2) + " €"
    nodePreco.classList.add("preco")

    const nodeButton = document.createElement("button")
    nodeButton.textContent = "Remover"

    // Guardar a posição do produto no cesto
    nodeButton.dataset.posicao = posicao

    nodeArticle.append(nodeImagem)
    nodeArticle.append(nodeTitulo)
    nodeArticle.append(nodePreco)
    nodeArticle.append(nodeButton)

    return nodeArticle
}


/* GESTÃO DOS PRODUTOS */

function renderizarProdutos(produtos) {

    nodeListaProdutos.innerHTML = ""

    // Criar um artigo para cada produto
    produtos.forEach(function(produto) {

        const nodeArticle = criarProduto(produto)

        nodeListaProdutos.append(nodeArticle)
    })
}


function atualizaCesto() {

    nodeListaCesto.innerHTML = ""

    let total = 0

    // Percorrer todos os produtos selecionados
    produtosSelecionados.forEach(function(id, posicao) {

        // Procurar o produto pelo seu ID
        const produto = produtos.find(function(p) {
            return p.id === id
        })

        if (produto) {

            const nodeArticle = criarProdutoCesto(produto, posicao)

            nodeListaCesto.append(nodeArticle)

            total = total + produto.price
        }
    })

    // Atualizar o preço total do cesto
    nodeTotal.textContent = total.toFixed(2) + " €"

    // Mostrar uma mensagem quando o cesto estiver vazio
    if (produtosSelecionados.length === 0) {

        const nodeMensagem = document.createElement("p")
        nodeMensagem.textContent = "O teu cesto está vazio!"

        nodeListaCesto.append(nodeMensagem)
    }
}


/* EVENT LISTENERS */

// Evento para adicionar produtos ao cesto
nodeListaProdutos.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const id = Number(event.target.dataset.id)

        produtosSelecionados.push(id)

        // Guardar o cesto no armazenamento local
        localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados))

        atualizaCesto()
    }
})


// Evento para remover produtos do cesto
nodeListaCesto.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const posicao = Number(event.target.dataset.posicao)

        // Remover apenas uma ocorrência do produto
        produtosSelecionados.splice(posicao, 1)

        // Guardar o cesto atualizado
        localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados))

        atualizaCesto()
    }
})


/* INICIALIZAÇÃO */

renderizarProdutos(produtos)
atualizaCesto()


/* EASTER EGG: RICKROLL */

const nodeBotaoSecreto = document.querySelector("#botao-secreto")
const nodeRickroll = document.querySelector("#rickroll")
const nodeVideoRickroll = document.querySelector("#video-rickroll")
const nodeFecharRickroll = document.querySelector("#fechar-rickroll")

// Abrir o Rickroll
nodeBotaoSecreto.addEventListener("click", function() {
    nodeRickroll.classList.add("ativo")

    nodeVideoRickroll.src =
        "https://www.youtube-nocookie.com/embed/xMHJGd3wwZk?playlist=xMHJGd3wwZk&autoplay=1&iv_load_policy=3&loop=1"
})

// Fechar o Rickroll e parar o vídeo
nodeFecharRickroll.addEventListener("click", function() {
    nodeRickroll.classList.remove("ativo")
    nodeVideoRickroll.src = ""
})
