window.addEventListener("DOMContentLoaded", async () => {

  document.getElementById("tipoUsuarioForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const dados = {
      tipo: e.target.tipo.value
    };

    const mensagem = document.getElementById("mensagem");

    try {
      const resposta = await fetch("http://localhost:8080/api/tipoUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar tipo.");

      await resposta.json();
      mensagem.textContent = "✅ Cadastro realizado com sucesso!";
      mensagem.style.color = "green";
      e.target.reset();
    } catch (erro) {
      mensagem.textContent = "❌ Erro ao cadastrar tipo.";
      mensagem.style.color = "red";
      console.error(erro);
    }
  });
});
