document.addEventListener('DOMContentLoaded', function () {
    // Recupera os jogos cadastrados do localStorage
    const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  
    const listaJogos = document.getElementById('lista-jogos');
  
    if (jogos.length === 0) {
      listaJogos.innerHTML = '<li>Nenhum jogo cadastrado.</li>';
    } else {
      jogos.forEach(jogo => {
        const item = document.createElement('li');
        item.textContent = `${jogo.nome} - ${jogo.plataforma} - ${jogo.genero}`;
        listaJogos.appendChild(item);
      });
    }
  });
  