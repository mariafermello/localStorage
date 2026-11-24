const formulario = document.getElementById("formTarefa");
const campo = document.getElementById("novaTarefa");
const lista = document.getElementById("listaTarefas");
const botaoLimpar = document.getElementById("limparTudo");
const mensagem = document.getElementById("mensagem");

let tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function mostrarTarefas() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, indice) => {
    const item = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = tarefa;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.type = "button";
    botaoRemover.addEventListener("click", () => {
      tarefas.splice(indice, 1);
      salvarTarefas();
      mostrarTarefas();
      mensagem.textContent = "Tarefa removida.";
    });

    item.appendChild(texto);
    item.appendChild(botaoRemover);
    lista.appendChild(item);
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const textoTarefa = campo.value.trim();

  if (textoTarefa === "") {
    mensagem.textContent = "Digite uma tarefa antes de adicionar.";
    return;
  }

  tarefas.push(textoTarefa);
  salvarTarefas();
  mostrarTarefas();
  campo.value = "";
  mensagem.textContent = "Tarefa salva!";
});

botaoLimpar.addEventListener("click", () => {
  tarefas = [];
  salvarTarefas();
  mostrarTarefas();
  mensagem.textContent = "Todas as tarefas foram apagadas.";
});

mostrarTarefas();
