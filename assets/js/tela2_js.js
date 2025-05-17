document.addEventListener("DOMContentLoaded", function () {
	const registerForm = document.getElementById("registerForm");
	const passwordInput = document.getElementById("password");
	const confirmPasswordInput = document.getElementById("confirmPassword");
	const passwordHelp = document.getElementById("passwordHelp");

	// Verifica se as senhas coincidem em tempo real
	function validatePasswords() {
		const password = passwordInput.value;
		const confirmPassword = confirmPasswordInput.value;

		if (password !== confirmPassword) {
			passwordHelp.textContent = "As senhas não coincidem.";
			passwordHelp.style.color = "red";
			return false;
		} else if (password.length < 6) {
			passwordHelp.textContent = "A senha deve conter pelo menos 6 caracteres.";
			passwordHelp.style.color = "orange";
			return false;
		} else {
			passwordHelp.textContent = "Senhas válidas.";
			passwordHelp.style.color = "green";
			return true;
		}
	}

	passwordInput.addEventListener("input", validatePasswords);
	confirmPasswordInput.addEventListener("input", validatePasswords);

	registerForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Impede envio automático

		if (!validatePasswords()) {
			alert("Por favor, corrija os erros antes de enviar.");
			return;
		}

		alert("Registro realizado com sucesso!");

		// Limpa o formulário
		registerForm.reset();
		passwordHelp.textContent = "";

		// Redireciona para a próxima página
		window.location.href = 'tela3.html';
	});
});
