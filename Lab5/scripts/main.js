/* eslint-disable no-unused-vars */

let numero = 0;
let corAtual = 0;

function passarPorAqui() {
  const frase = document.querySelector("#passa");
  frase.textContent = "Obrigado por passares!";
}

function sair() {
  const frase = document.querySelector("#passa");
  frase.textContent = "Passa por aqui!";
}


const botoes = document.querySelectorAll(".color");

botoes.forEach(function (button) {
  button.addEventListener("click", function () {
    const frase = document.querySelector("#pinta");
    frase.style.color = button.dataset.color;
  });
});


function escrever() {
  const texto = document.querySelector("#escrever");

  if (texto.value.length > 0) {
    corAtual++;

    if (corAtual === 1) {
      texto.style.backgroundColor = "blue";
    } else if (corAtual === 2) {
      texto.style.backgroundColor = "red";
    } else if (corAtual === 3) {
      texto.style.backgroundColor = "yellow";
      corAtual = 0;
    }
  }
}

apagar = () => {
    const texto = document.querySelector("#escrever");

  if (texto.value.length === 0) {
    texto.style.backgroundColor = "darkgray";
    corAtual = 0;
  }
}

function mudarFundo() {
  const cor = document.querySelector("#cor");

  document.body.style.backgroundColor = cor.value;
}

contar = () => {
    numero++;

  const resultado = document.querySelector("#numero");
  resultado.textContent = numero;
}

function submeterDados() {
  const nome = document.querySelector("#nome").value;
  const idade = document.querySelector("#idade").value;
  const mensagem = document.querySelector("#mensagem");

  if (nome === "" || idade === "") {
    mensagem.textContent = "Por favor, preencha o nome e a idade.";
  } else {
    mensagem.textContent = "Olá, o/a " + nome + " tem " + idade + "!";
  }
}

let counter = 0;

setInterval(function () {
  counter++;

  const resultado = document.querySelector("#counter");
  resultado.textContent = counter;
}, 1000);
