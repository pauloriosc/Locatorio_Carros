// Variáveis para armazenar os dados do formulário
let locatarios = [];
let locatarioSelecionado = null;

// Função para adicionar um novo registro na tabela
function adicionarNovo() {
    const nomeLocatario = document.getElementById("nome-locatario").value;
    const cpfLocatario = document.getElementById("cpf-locatario").value;
    const nomeCondutor = document.getElementById("nome-condutor").value;
    const cnhCondutor = document.getElementById("cnh-condutor").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    if (!nomeLocatario || !cpfLocatario) {
        alert("Por favor, preencha os campos obrigatórios (Nome e CPF/CNPJ do Locatário).");
        return;
    }

    const novoLocatario = {
        cpf: cpfLocatario,
        nome: nomeLocatario,
        condutor: nomeCondutor,
        cnh: cnhCondutor,
        telefone: telefone,
        email: email
    };

    locatarios.push(novoLocatario);
    atualizarTabela();
    document.getElementById("locatario-form").reset();
    locatarioSelecionado = null;
}

// Função para salvar (atualizar) os dados de um locatário
function salvarDados() {
    if (locatarioSelecionado === null) {
        alert("Selecione um locatário na tabela para atualizar.");
        return;
    }

    const nomeLocatario = document.getElementById("nome-locatario").value;
    const cpfLocatario = document.getElementById("cpf-locatario").value;
    const nomeCondutor = document.getElementById("nome-condutor").value;
    const cnhCondutor = document.getElementById("cnh-condutor").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    locatarioSelecionado.nome = nomeLocatario;
    locatarioSelecionado.cpf = cpfLocatario;
    locatarioSelecionado.condutor = nomeCondutor;
    locatarioSelecionado.cnh = cnhCondutor;
    locatarioSelecionado.telefone = telefone;
    locatarioSelecionado.email = email;

    atualizarTabela();
    document.getElementById("locatario-form").reset();
    locatarioSelecionado = null;
}

// Função para excluir um registro
function excluirRegistro() {
    const cpfParaExcluir = prompt("Informe o CPF do locatário a ser excluído:");

    if (!cpfParaExcluir) {
        alert("Nenhum CPF foi informado.");
        return;
    }

    locatarios = locatarios.filter(locatario => locatario.cpf !== cpfParaExcluir);
    atualizarTabela();
}

// Função para cancelar a ação
function cancelarAcao() {
    document.getElementById("locatario-form").reset();
    locatarioSelecionado = null;
}

// Função para atualizar a tabela com os dados
function atualizarTabela() {
    const tabelaBody = document.querySelector("table tbody");
    tabelaBody.innerHTML = "";

    locatarios.forEach((locatario, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${locatario.cpf}</td>
            <td>${locatario.nome}</td>
            <td>${locatario.condutor}</td>
            <td>${locatario.cnh}</td>
            <td>${locatario.telefone}</td>
            <td>${locatario.email}</td>
        `;

        linha.addEventListener("click", () => selecionarLocatario(index));

        tabelaBody.appendChild(linha);
    });
}

// Função para selecionar um locatário da tabela
function selecionarLocatario(index) {
    locatarioSelecionado = locatarios[index];

    document.getElementById("nome-locatario").value = locatarioSelecionado.nome;
    document.getElementById("cpf-locatario").value = locatarioSelecionado.cpf;
    document.getElementById("nome-condutor").value = locatarioSelecionado.condutor;
    document.getElementById("cnh-condutor").value = locatarioSelecionado.cnh;
    document.getElementById("telefone").value = locatarioSelecionado.telefone;
    document.getElementById("email").value = locatarioSelecionado.email;
}

// Adicionar eventos aos botões
document.getElementById("novo").addEventListener("click", adicionarNovo);
document.getElementById("salvar").addEventListener("click", salvarDados);
document.getElementById("excluir").addEventListener("click", excluirRegistro);
document.getElementById("cancelar").addEventListener("click", cancelarAcao);
