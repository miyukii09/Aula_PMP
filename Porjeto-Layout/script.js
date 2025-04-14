document.getElementById('form-jogo').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const plataforma = document.getElementById('plataforma').value;
    const genero = document.getElementById('genero').value;
  
    // Criar objeto do jogo
    const jogo = {
      nome,
      plataforma,
      genero,
    };
  
    // Recupera os jogos existentes no localStorage
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  
    // Adiciona o novo jogo
    jogos.push(jogo);
  
    // Salva no localStorage
    localStorage.setItem('jogos', JSON.stringify(jogos));
  
    // Limpa os campos do formulário
    document.getElementById('form-jogo').reset();
  });
  