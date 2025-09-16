// script.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-jogo');
  const nomeInput = document.getElementById('nome');
  const plataformaInput = document.getElementById('plataforma');
  const generoInput = document.getElementById('genero');
  const tituloForm = document.getElementById('titulo-form');
  const btnSubmit = document.getElementById('btn-submit');

  let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  const editandoIndexRaw = localStorage.getItem('editandoJogoIndex');
  const editandoIndex = editandoIndexRaw !== null ? parseInt(editandoIndexRaw) : null;

  // Se estiver editando, preenche os campos e ajusta título/botão
  if (editandoIndex !== null && !Number.isNaN(editandoIndex)) {
    const jogo = jogos[editandoIndex];
    if (jogo) {
      nomeInput.value = jogo.nome;
      plataformaInput.value = jogo.plataforma;
      generoInput.value = jogo.genero;
      tituloForm.textContent = 'Editar Jogo';
      btnSubmit.textContent = 'Atualizar';
    } else {
      localStorage.removeItem('editandoJogoIndex');
    }
  }

  // Submissão do formulário: cria ou atualiza
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const plataforma = plataformaInput.value.trim();
    const genero = generoInput.value.trim();

    if (!nome || !plataforma || !genero) return;

    const novoJogo = { nome, plataforma, genero };

    if (editandoIndex !== null && !Number.isNaN(editandoIndex)) {
      jogos[editandoIndex] = novoJogo;
      localStorage.removeItem('editandoJogoIndex');
    } else {
      jogos.push(novoJogo);
    }

    localStorage.setItem('jogos', JSON.stringify(jogos));
    form.reset();
    window.location.href = 'consulta.html';
  });

  // Prévia: lista simples na página inicial
  const listaUL = document.getElementById('jogos');
  function atualizarListaPreview() {
    if (!listaUL) return;
    listaUL.innerHTML = '';
    if (jogos.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nenhum jogo cadastrado ainda.';
      listaUL.appendChild(li);
      return;
    }
    jogos.forEach(j => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${j.nome}</strong> — ${j.plataforma} — ${j.genero}`;
      listaUL.appendChild(li);
    });
  }
  atualizarListaPreview();
});