document.addEventListener('DOMContentLoaded', function () {
  let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  const listaJogos = document.getElementById('lista-jogos');
  const filtroNome = document.getElementById('filtro-nome');
  const filtroGenero = document.getElementById('filtro-genero');

  function salvarJogosNoStorage() {
    localStorage.setItem('jogos', JSON.stringify(jogos));
  }

  function excluirJogo(index) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      jogos.splice(index, 1);
      salvarJogosNoStorage();
      renderizarLista();
    }
  }

  function editarJogo(index) {
    localStorage.setItem('editandoJogoIndex', index); // Salva o índice no localStorage
    window.location.href = 'index.html'; // Redireciona para a tela de edição
  }

  function renderizarLista() {
    listaJogos.innerHTML = '';
    const nomeFiltro = filtroNome.value.toLowerCase();
    const generoFiltro = filtroGenero.value;

    const jogosFiltrados = jogos.filter(jogo => {
      return (
        jogo.nome.toLowerCase().includes(nomeFiltro) &&
        (generoFiltro === '' || jogo.genero === generoFiltro)
      );
    });

    const generosUnicos = [...new Set(jogos.map(j => j.genero))];
    filtroGenero.innerHTML = '<option value="">Todos os Gêneros</option>';
    generosUnicos.forEach(genero => {
      const option = document.createElement('option');
      option.value = genero;
      option.textContent = genero;
      filtroGenero.appendChild(option);
    });

    if (jogosFiltrados.length === 0) {
      listaJogos.innerHTML = '<li>Nenhum jogo encontrado.</li>';
      return;
    }

    jogosFiltrados.forEach((jogo, index) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <span>${jogo.nome} - ${jogo.plataforma} - ${jogo.genero}</span>
        <div class="actions">
          <button class="btn-editar" data-index="${index}">Editar</button>
          <button class="btn-excluir" data-index="${index}">Excluir</button>
        </div>
      `;
      listaJogos.appendChild(item);
    });

    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        excluirJogo(index);
      });
    });

    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        editarJogo(index);
      });
    });
  }

  filtroNome.addEventListener('input', renderizarLista);
  filtroGenero.addEventListener('change', renderizarLista);

  renderizarLista();
});
