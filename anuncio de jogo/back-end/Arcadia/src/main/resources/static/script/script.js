// script.js
document.addEventListener('DOMContentLoaded', async function () {
  const apiUrl = 'http://localhost:8080'; // Ajuste para a URL do seu backend
  const form = document.getElementById('form-jogo');
  const nomeInput = document.getElementById('nome');
  const plataformaInput = document.getElementById('plataforma');
  const generoInput = document.getElementById('genero');
  const tituloForm = document.getElementById('titulo-form');
  const btnSubmit = document.getElementById('btn-submit');

  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('editId');

  // Se estiver editando, preenche os campos e ajusta título/botão
  if (editId) {
    try {
      const response = await fetch(`${apiUrl}/jogos/${editId}`);
      if (response.ok) {
        const jogo = await response.json();
        nomeInput.value = jogo.nome;
        plataformaInput.value = jogo.plataforma.plataforma;
        generoInput.value = jogo.tipoJogos.tipo;
        tituloForm.textContent = 'Editar Jogo';
        btnSubmit.textContent = 'Atualizar';
      }
    } catch (error) {
      console.error('Erro ao carregar jogo para edição:', error);
    }
  }

  // Função para obter ou criar TipoJogos
  async function getOrCreateTipoJogos(tipo) {
    const tipos = await fetch(`${apiUrl}/tipojogos`).then(res => res.json());
    let tipoJogos = tipos.find(t => t.tipo.toLowerCase() === tipo.toLowerCase());
    if (!tipoJogos) {
      tipoJogos = await fetch(`${apiUrl}/tipojogos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo })
      }).then(res => res.json());
    }
    return tipoJogos;
  }

  // Função para obter ou criar Plataforma
  async function getOrCreatePlataforma(plataformaName) {
    const plataformas = await fetch(`${apiUrl}/plataforma`).then(res => res.json());
    let plataforma = plataformas.find(p => p.plataforma.toLowerCase() === plataformaName.toLowerCase());
    if (!plataforma) {
      plataforma = await fetch(`${apiUrl}/plataforma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plataforma: plataformaName })
      }).then(res => res.json());
    }
    return plataforma;
  }

  // Submissão do formulário: cria ou atualiza
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const plataformaName = plataformaInput.value.trim();
    const genero = generoInput.value.trim();

    if (!nome || !plataformaName || !genero) return;

    try {
      const tipoJogos = await getOrCreateTipoJogos(genero);
      const plataforma = await getOrCreatePlataforma(plataformaName);

      const jogoData = {
        nome,
        tipoJogos: { id: tipoJogos.id },
        plataforma: { id: plataforma.id }
      };

      let url = `${apiUrl}/jogos`;
      let method = 'POST';
      if (editId) {
        url += `/${editId}`;
        method = 'PUT';
        jogoData.id = editId;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jogoData)
      });

      if (response.ok) {
        form.reset();
        window.location.href = 'consulta.html';
      } else {
        console.error('Erro ao salvar jogo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
    }
  });

  // Prévia: lista simples na página inicial
  const listaUL = document.getElementById('jogos');
  async function atualizarListaPreview() {
    if (!listaUL) return;
    listaUL.innerHTML = '';
    try {
      const jogos = await fetch(`${apiUrl}/jogos`).then(res => res.json());
      if (jogos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum jogo cadastrado ainda.';
        listaUL.appendChild(li);
        return;
      }
      jogos.forEach(j => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${j.nome}</strong> — ${j.plataforma.plataforma} — ${j.tipoJogos.tipo}`;
        listaUL.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar prévia:', error);
    }
  }
  await atualizarListaPreview();
});