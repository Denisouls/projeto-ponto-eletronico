function criarRelatorio() {
    const containerRegistros = document.getElementById("container-registros");
    let registros = JSON.parse(localStorage.getItem("registro")) || [];

    // Limpa o container antes de recriar os registros
    containerRegistros.innerHTML = "";

    registros.forEach((registro, index) => {
        const divRegistro = document.createElement("div");
        divRegistro.classList.add("abcd");

        let hora = registro.hora;
        let data = registro.data;
        let tipo = registro.tipo;

        divRegistro.innerHTML = `<p>${tipo} | ${data} | ${hora}</p>`;
        
        // Botão de editar
        const buttonEditar = document.createElement("button");
        buttonEditar.textContent = "Editar";
        buttonEditar.addEventListener("click", () => editarRegistro(index));

        // Botão de excluir
        const buttonExcluir = document.createElement("button");
        buttonExcluir.textContent = "Excluir";
        buttonExcluir.addEventListener("click", () => alert("Este ponto não pode ser excluído."));

        divRegistro.appendChild(buttonEditar);
        divRegistro.appendChild(buttonExcluir);
        containerRegistros.appendChild(divRegistro);
    });
}

function adicionarRegistro(tipo, data, hora) {
    const dataCompleta = new Date();
    const dataInserida = new Date(data);

    // Verifica se a data inserida é futura
    if (dataInserida > dataAtual) {
        alert("Não é permitido marcar uma data futura.");
        return;
    }

    let registros = JSON.parse(localStorage.getItem("registro")) || [];
    registros.push({ tipo, data, hora });
    localStorage.setItem("registro", JSON.stringify(registros));
    criarRelatorio(); // Atualiza o relatório
}

function editarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registro")) || [];
    const registro = registros[index];

    const novoTipo = prompt("Editar tipo:", registro.tipo);
    const novaData = prompt("Editar data:", registro.data);
    const novaHora = prompt("Editar hora:", registro.hora);

    // Verifica se a nova data é futura
    if (novaData) {
        const dataAtual = new Date();
        const dataInserida = new Date(novaData);
        if (dataInserida > dataAtual) {
            alert("Não é permitido marcar uma data futura.");
            return;
        }
        registro.data = novaData;
    }

    if (novoTipo !== null) registro.tipo = novoTipo;
    if (novaHora !== null) registro.hora = novaHora;

    localStorage.setItem("registro", JSON.stringify(registros));
    criarRelatorio(); // Atualiza o relatório
}

// Exemplo de uso: adicionar um registro
// adicionarRegistro("Tipo Exemplo", "2023-10-25", "10:00"); // Data atual ou passada

criarRelatorio();