// Função para adicionar um novo contrato à tabela
document.getElementById('salvarContrato').addEventListener('click', () => {
    const contratosTable = document.querySelector('#contratosTable tbody');
    const dataLocacao = document.getElementById('dataLocacao').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;
    const nomeLocatario = document.getElementById('nomeLocatario').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (dataLocacao && dataDevolucao && nomeLocatario) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>${nomeLocatario}</td>
            <td>${dataLocacao}</td>
            <td>${dataDevolucao}</td>
            <td>Pendente</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><button class="delete-btn">Excluir</button></td>
        `;

        contratosTable.appendChild(newRow);

        // Adiciona funcionalidade para excluir o contrato
        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            newRow.remove();
        });

        alert('Contrato salvo com sucesso!');
    } else {
        alert('Preencha todos os campos de locação!');
    }
});

// Função para limpar todos os campos e a tabela de veículos ao clicar em "Novo"
document.getElementById('novoContrato').addEventListener('click', () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
});

// Função para cancelar e limpar todos os dados preenchidos
document.getElementById('cancelarContrato').addEventListener('click', () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelector('#veiculosTable tbody').innerHTML = '';
});

// Função para buscar e carregar os dados do contrato para alteração
document.getElementById('buscarContratoBtn').addEventListener('click', () => {
    const numeroContrato = document.getElementById('buscarContrato').value;
    const contratosTable = document.querySelectorAll('#contratosTable tbody tr');
    let contratoEncontrado = false;

    contratosTable.forEach(row => {
        const cellNumeroContrato = row.cells[0].textContent;

        if (cellNumeroContrato === numeroContrato) {
            // Preencher os campos com os dados do contrato encontrado
            document.getElementById('alterarNomeLocatario').value = row.cells[1].textContent;
            document.getElementById('alterarDataLocacao').value = row.cells[2].textContent;
            document.getElementById('alterarDataDevolucao').value = row.cells[3].textContent;

            // Exibir a seção de alteração
            document.getElementById('alterarContratoSection').style.display = 'block';

            // Armazenar a referência da linha do contrato encontrado
            document.getElementById('alterarContratoSection').dataset.rowIndex = row.rowIndex;
            contratoEncontrado = true;
        }
    });

    if (!contratoEncontrado) {
        alert('Contrato não encontrado!');
    }
});

// Função para salvar as alterações no contrato
document.getElementById('salvarAlteracoesContrato').addEventListener('click', () => {
    const contratosTable = document.querySelector('#contratosTable tbody');
    const rowIndex = document.getElementById('alterarContratoSection').dataset.rowIndex;
    const row = contratosTable.rows[rowIndex - 1]; // rowIndex é 1-based

    // Atualizar os valores na linha da tabela
    row.cells[1].textContent = document.getElementById('alterarNomeLocatario').value;
    row.cells[2].textContent = document.getElementById('alterarDataLocacao').value;
    row.cells[3].textContent = document.getElementById('alterarDataDevolucao').value;

    // Ocultar a seção de alteração
    document.getElementById('alterarContratoSection').style.display = 'none';

    alert('Contrato alterado com sucesso!');
});
