document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-jogo');
  const nomeInput = document.getElementById('nome');
  const plataformaInput = document.getElementById('plataforma');
  const generoInput = document.getElementById('genero');

  let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  const editandoIndex = localStorage.getItem('editandoJogoIndex');

  // Se estiver editando, preenche os campos
  if (editandoIndex !== null) {
    const jogo = jogos[editandoIndex];
    if (jogo) {
      nomeInput.value = jogo.nome;
      plataformaInput.value = jogo.plataforma;
      generoInput.value = jogo.genero;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = nomeInput.value;
    const plataforma = plataformaInput.value;
    const genero = generoInput.value;

    const novoJogo = { nome, plataforma, genero };

    if (editandoIndex !== null) {
      jogos[editandoIndex] = novoJogo;
      localStorage.removeItem('editandoJogoIndex');
    } else {
      jogos.push(novoJogo);
    }

    localStorage.setItem('jogos', JSON.stringify(jogos));
    form.reset();
    window.location.href = 'consulta.html';
  });
});
