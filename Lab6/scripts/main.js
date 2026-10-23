
console.log("JavaScript carregado!");
console.log("Formulário:", document.querySelector("form"));
console.log("Input:", document.querySelector('input[type="number"]'));

const titulo = document.createElement(`h1`);
titulo.textContent = `Viva o JavaScript`;

const body = document.querySelector(`body`);
body.append(titulo);

// Declaração de variáveis
const nodeInputNumero = document.querySelector(`#colecao + section input[type="number"]`);
const nodeInputSubmit = document.querySelector(`#colecao + section input[type="submit"]`);
const nodeUlColecao = document.querySelector(`#colecao ul`);
const form = document.querySelector(`#colecao ~ section form`);
const nodeTotal = document.querySelector(`#colecao h3 span`);

// Repetidos
const nodeUlRepetidos = document.querySelector(`#repetidos ul`);
const nodeTotalRepetidos = document.querySelector(`#repetidos h3 span`);

const colecao = [];
const repetidos = [];

// B. event handlers

const atualizaLista = (colecao, nodeUlColecao) => {
    // Apaga o conteúdo da lista
    nodeUlColecao.innerHTML = "";

    // Percorre os cromos da lista
    colecao.forEach((numero, index) => {
        // Se for a lista de repetidos, cria também um botão eliminar
        if (nodeUlColecao === nodeUlRepetidos) {
            nodeUlColecao.innerHTML += `<li>${numero} <button class="eliminar" data-index="${index}">Eliminar</button></li>`;
        } else {
            // Se não for a lista de repetidos, insere apenas o número
            const nodeLi = document.createElement("li");
            nodeLi.textContent = numero;
            nodeUlColecao.append(nodeLi);
        }
    });

    // Associa os eventos aos botões de eliminar
    if (nodeUlColecao === nodeUlRepetidos) {
        associaEventosEliminar();
    }
};

const guardaCarta = () => {
    // Vai buscar o numero inserido no input
    const numero = Number(nodeInputNumero.value);

    // Verifica se o numero já existe na coleção
    if (colecao.includes(numero)) {
        // Se já existir, adiciona aos repetidos
        repetidos.push(numero);

        // Ordena os repetidos por ordem crescente
        repetidos.sort((a, b) => a - b);

        // Atualiza a lista e o total de repetidos no HTML
        atualizaLista(repetidos, nodeUlRepetidos);
        nodeTotalRepetidos.textContent = repetidos.length;
    } else {
        // Se não existir, adiciona à coleção
        colecao.push(numero);

        // Ordena a coleção por ordem crescente
        colecao.sort((a, b) => a - b);

        // Atualiza a lista e o total de cromos no HTML
        atualizaLista(colecao, nodeUlColecao);
        nodeTotal.textContent = colecao.length;
    }

    // Limpa o input depois de registar o cromo
    nodeInputNumero.value = "";
};

const associaEventosEliminar = () => {
    // Vai buscar todos os botões de eliminar
    const botoesEliminar = document.querySelectorAll(`#repetidos .eliminar`);

    // Associa um evento a cada botão
    botoesEliminar.forEach((botao) => {
        botao.addEventListener("click", () => {
            // Vai buscar a posição do cromo na lista de repetidos
            const index = Number(botao.dataset.index);

            // Remove o cromo repetido da lista
            repetidos.splice(index, 1);

            // Atualiza a lista e o total de repetidos
            atualizaLista(repetidos, nodeUlRepetidos);
            nodeTotalRepetidos.textContent = repetidos.length;
        });
    });
};

form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};
