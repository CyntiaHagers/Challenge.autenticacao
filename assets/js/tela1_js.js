document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const visitanteBtn = document.querySelector(".guest-btn");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");

  // Cria o span de erro e insere após o campo de senha
  const senhaError = document.createElement("span");
  senhaError.style.color = "red";
  senhaError.style.fontSize = "0.9em";
  senhaError.style.display = "none"; // Esconde inicialmente
  senha.parentNode.insertBefore(senhaError, senha.nextSibling);

  form.addEventListener("submit", function (e) {
    const emailVal = email.value.trim();
    const senhaVal = senha.value.trim();

    if (!emailVal || !senhaVal) {
      e.preventDefault(); // Bloqueia envio se algum campo estiver vazio
      alert("Por favor, preencha todos os campos.");
    }
    else if (senhaVal.length < 6) {
      e.preventDefault(); // Bloqueia envio se senha for menor que 6 caracteres
      senhaError.textContent = "A senha deve ter pelo menos 6 caracteres.";
      senhaError.style.display = "block";
    }
    else {
      e.preventDefault(); // Evita envio do formulário real
      window.location.href = "tela3.html"; // Redireciona para outra página
    }
  });

  // Botão visitante
  visitanteBtn.addEventListener("click", () => {
    window.location.href = "tela3.html";
  });
});
