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

const atualizaLista = (lista, nodeUl) => {
    // Apaga o conteúdo da lista
    nodeUl.innerHTML = "";

    // Percorre os cromos da lista
    lista.forEach((numero, index) => {
        const nodeLi = document.createElement("li");
        nodeLi.textContent = `${numero} `;

        // Se for a lista de repetidos, cria também um botão eliminar
        if (nodeUl === nodeUlRepetidos) {
            const botao = document.createElement("button");
            botao.className = "eliminar";
            botao.textContent = "Eliminar";

            botao.addEventListener("click", () => {
                // Remove o cromo repetido da lista
                repetidos.splice(index, 1);

                // Atualiza a lista e o total de repetidos
                atualizaLista(repetidos, nodeUlRepetidos);
                nodeTotalRepetidos.textContent = repetidos.length;
            });

            nodeLi.append(botao);
        }

        nodeUl.append(nodeLi);
    });
};

const guardaCarta = () => {
    // Vai buscar o número inserido no input
    const numero = Number(nodeInputNumero.value);

    // Verifica se o número já existe na coleção
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

    // Limpa o formulário e volta a focar o input
    form.reset();
    nodeInputNumero.focus();
};

// O botão submit regista o cromo (também é chamado ao carregar Enter no input)
nodeInputSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    // Respeita o "required" do input
    if (form.reportValidity()) {
        guardaCarta();
    }
});

// Garante que o formulário nunca recarrega a página
form.onsubmit = (event) => {
    event.preventDefault();
};
