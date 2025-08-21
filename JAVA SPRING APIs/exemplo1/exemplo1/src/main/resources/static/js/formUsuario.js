window.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("tipoUsuario");

  try {
    const resposta = await fetch("http://localhost:8080/api/tipoUsuario");
    if (!resposta.ok) throw new Error("Erro ao carregar os tipos.");

    const tipos = await resposta.json();

    tipos.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo.id;
      option.textContent = tipo.tipo;
      select.appendChild(option);
    });
  } catch (erro) {
    console.error("Erro ao carregar tipos de usuário:", erro);
  }

  document.getElementById("usuarioForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const dados = {
      nome: e.target.nome.value,
      email: e.target.email.value,
      tipoUsuario: e.target.tipoUsuario.value
    };

    const mensagem = document.getElementById("mensagem");

    try {
      const resposta = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar usuário.");

      await resposta.json();
      mensagem.textContent = "✅ Cadastro realizado com sucesso!";
      mensagem.style.color = "green";
      e.target.reset();
    } catch (erro) {
      mensagem.textContent = "❌ Erro ao cadastrar usuário.";
      mensagem.style.color = "red";
      console.error(erro);
    }
  });
});
