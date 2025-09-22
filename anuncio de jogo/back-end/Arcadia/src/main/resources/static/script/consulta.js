// consulta.js
document.addEventListener('DOMContentLoaded', async function () {
  const apiUrl = 'http://localhost:8080'; // Ajuste para a URL do seu backend
  const listaJogos = document.getElementById('lista-jogos');
  const filtroNome = document.getElementById('filtro-nome');
  const filtroGenero = document.getElementById('filtro-genero');

  async function excluirJogo(id) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      try {
        const response = await fetch(`${apiUrl}/jogos/${id}`, { method: 'DELETE' });
        if (response.ok) {
          await renderizarLista();
          await preencherSelectGeneros();
        }
      } catch (error) {
        console.error('Erro ao excluir jogo:', error);
      }
    }
  }

  function editarJogo(id) {
    window.location.href = `index.html?editId=${id}`;
  }

  async function preencherSelectGeneros() {
    try {
      const tipos = await fetch(`${apiUrl}/tipojogos`).then(res => res.json());
      const generosUnicos = [...new Set(tipos.map(t => t.tipo).filter(Boolean))].sort();
      const generoSelecionado = filtroGenero.value;

      filtroGenero.innerHTML = '<option value="">Todos os Gêneros</option>';
      generosUnicos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        filtroGenero.appendChild(option);
      });

      filtroGenero.value = generoSelecionado;
    } catch (error) {
      console.error('Erro ao preencher gêneros:', error);
    }
  }

  async function renderizarLista() {
    listaJogos.innerHTML = '';
    const nomeFiltro = filtroNome.value.trim();
    const generoFiltro = filtroGenero.value;

    let jogosFiltrados;
    try {
      if (!nomeFiltro && !generoFiltro) {
        jogosFiltrados = await fetch(`${apiUrl}/jogos`).then(res => res.json());
      } else if (generoFiltro) {
        const letra = nomeFiltro || '';
        jogosFiltrados = await fetch(`${apiUrl}/jogos/search/nome-tipo?letra=${encodeURIComponent(letra)}&tipo=${encodeURIComponent(generoFiltro)}`).then(res => res.json());
      } else {
        jogosFiltrados = await fetch(`${apiUrl}/jogos/search/nome?letra=${encodeURIComponent(nomeFiltro)}`).then(res => res.json());
      }

      if (jogosFiltrados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum jogo encontrado.';
        listaJogos.appendChild(li);
        return;
      }

      jogosFiltrados.forEach(jogo => {
        const li = document.createElement('li');
        li.classList.add('item-jogo');
        li.innerHTML = `
          <span>${jogo.nome} — ${jogo.plataforma.plataforma} — ${jogo.tipoJogos.tipo}</span>
          <div class="actions">
            <button class="btn-editar" data-id="${jogo.id}">Editar</button>
            <button class="btn-excluir" data-id="${jogo.id}">Excluir</button>
          </div>
        `;
        listaJogos.appendChild(li);
      });

      document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          excluirJogo(id);
        });
      });

      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          editarJogo(id);
        });
      });
    } catch (error) {
      console.error('Erro ao renderizar lista:', error);
    }
  }

  // Eventos de filtro
  filtroNome.addEventListener('input', renderizarLista);
  filtroGenero.addEventListener('change', renderizarLista);

  // Inicialização
  await preencherSelectGeneros();
  await renderizarLista();
});