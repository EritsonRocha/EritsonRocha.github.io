/* ESTADO E VARIÁVEIS */

const API_URL = "https://deisishop.pw.deisi.ulusofona.pt"

const nodeListaProdutos = document.querySelector("#lista-produtos")
const nodeListaCesto = document.querySelector("#lista-cesto")
const nodeTotal = document.querySelector("#total")

// Os produtos são obtidos da API (AJAX) e guardados aqui
let produtos = []

// Carregar os produtos guardados ou começar com um cesto vazio
function lerCesto() {
    try {
        return JSON.parse(localStorage.getItem("produtos-selecionados")) || []
    } catch (erro) {
        return []
    }
}

const produtosSelecionados = lerCesto()


/* FUNÇÕES AUXILIARES */

function guardarCesto() {
    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados))
}


function criarProduto(produto) {

    const nodeArticle = document.createElement("article")

    const nodeImagem = document.createElement("img")
    nodeImagem.src = produto.image
    nodeImagem.alt = produto.title

    const nodeTitulo = document.createElement("h3")
    nodeTitulo.textContent = produto.title

    const nodeCategoria = document.createElement("p")
    nodeCategoria.textContent = produto.category
    nodeCategoria.classList.add("categoria")

    const nodePreco = document.createElement("p")
    nodePreco.textContent = produto.price.toFixed(2) + " €"
    nodePreco.classList.add("preco")

    const nodeButton = document.createElement("button")
    nodeButton.textContent = "Adicionar ao cesto"

    // Guardar no botão o ID do produto a adicionar ao cesto
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

function renderizarProdutos(listaProdutos) {

    nodeListaProdutos.innerHTML = ""

    // Criar um artigo para cada produto
    listaProdutos.forEach(function(produto) {

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

    // Mostrar uma mensagem quando não há produtos visíveis no cesto
    if (nodeListaCesto.children.length === 0) {

        const nodeMensagem = document.createElement("p")
        nodeMensagem.textContent = "O teu cesto está vazio!"

        nodeListaCesto.append(nodeMensagem)
    }
}


/* PEDIDO À API (AJAX) */

async function carregarProdutos() {

    nodeListaProdutos.textContent = "A carregar produtos..."

    try {
        // Pedido HTTP GET à API
        const resposta = await fetch(API_URL)

        // fetch só falha em erros de rede; erros HTTP (404, 500...) têm de ser verificados
        if (!resposta.ok) {
            throw new Error("Erro HTTP " + resposta.status)
        }

        produtos = await resposta.json()

        renderizarProdutos(produtos)

        // O cesto só pode ser desenhado depois de os produtos chegarem
        atualizaCesto()

    } catch (erro) {
        nodeListaProdutos.textContent = "Não foi possível carregar os produtos. Tenta novamente mais tarde."
        console.error(erro)
    }
}


/* EVENT LISTENERS */

// Evento para adicionar produtos ao cesto
nodeListaProdutos.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const id = Number(event.target.dataset.id)

        produtosSelecionados.push(id)

        guardarCesto()

        atualizaCesto()
    }
})


// Evento para remover produtos do cesto
nodeListaCesto.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const posicao = Number(event.target.dataset.posicao)

        // Remover apenas uma ocorrência do produto
        produtosSelecionados.splice(posicao, 1)

        guardarCesto()

        atualizaCesto()
    }
})


/* INICIALIZAÇÃO */

carregarProdutos()
