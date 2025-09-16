// consulta.js
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
      preencherSelectGeneros(); // mantém o select coerente após exclusões
    }
  }

  function editarJogo(index) {
    localStorage.setItem('editandoJogoIndex', index);
    window.location.href = 'index.html';
  }

  function preencherSelectGeneros() {
    const generosUnicos = [...new Set(jogos.map(j => j.genero).filter(Boolean))].sort();
    const generoSelecionado = filtroGenero.value;

    filtroGenero.innerHTML = '<option value="">Todos os Gêneros</option>';
    generosUnicos.forEach(genero => {
      const option = document.createElement('option');
      option.value = genero;
      option.textContent = genero;
      filtroGenero.appendChild(option);
    });

    // Restaura a seleção após recriar as opções
    filtroGenero.value = generoSelecionado;
  }

  function renderizarLista() {
    listaJogos.innerHTML = '';
    const nomeFiltro = (filtroNome.value || '').toLowerCase();
    const generoFiltro = filtroGenero.value || '';

    const jogosFiltrados = jogos.filter(jogo =>
      jogo.nome.toLowerCase().includes(nomeFiltro) &&
      (generoFiltro === '' || jogo.genero === generoFiltro)
    );

    if (jogosFiltrados.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nenhum jogo encontrado.';
      listaJogos.appendChild(li);
      return;
    }

    jogosFiltrados.forEach((jogo, index) => {
      const li = document.createElement('li');
      li.classList.add('item-jogo');
      li.innerHTML = `
        <span>${jogo.nome} — ${jogo.plataforma} — ${jogo.genero}</span>
        <div class="actions">
          <button class="btn-editar" data-index="${index}">Editar</button>
          <button class="btn-excluir" data-index="${index}">Excluir</button>
        </div>
      `;
      listaJogos.appendChild(li);
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

  // Eventos de filtro
  filtroNome.addEventListener('input', renderizarLista);
  filtroGenero.addEventListener('change', renderizarLista);

  // Inicialização
  preencherSelectGeneros();
  renderizarLista();
});