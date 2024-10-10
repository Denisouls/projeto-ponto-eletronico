function criarRelatorio() {
    let registros = JSON.parse(localStorage.getItem("registro"));
    registros.forEach(registro => {
        console.log(registro);
});
}

criarRelatorio();