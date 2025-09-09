document.addEventListener('DOMContentLoaded', () => {
    // Alerta inicial ao carregar a página
    alert('Dados dos produtos carregados com sucesso!');

    // Função para filtrar a tabela
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar produtos...';
    searchInput.className = 'search-bar';
    searchInput.addEventListener('input', filterTable);
    document.querySelector('.container').prepend(searchInput);

    // Adicionar ordenação às colunas
    const headers = document.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.addEventListener('click', () => sortTable(index));
    });

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    function sortTable(columnIndex) {
        const tbody = document.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const isNumeric = columnIndex === 0 || columnIndex === 2; // ID e Preço são numéricos

        rows.sort((a, b) => {
            const aValue = a.cells[columnIndex].textContent;
            const bValue = b.cells[columnIndex].textContent;
            return isNumeric
                ? aValue - bValue
                : aValue.localeCompare(bValue);
        });

        // Reverter ordem no próximo clique
        if (tbody.dataset.sortDirection === 'asc' && tbody.dataset.sortColumn === columnIndex) {
            rows.reverse();
            tbody.dataset.sortDirection = 'desc';
        } else {
            tbody.dataset.sortDirection = 'asc';
        }
        tbody.dataset.sortColumn = columnIndex;

        // Reaplicar as linhas ordenadas
        rows.forEach(row => tbody.appendChild(row));
    }
});