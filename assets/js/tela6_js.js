// Adiciona evento de submit ao formulário
document.getElementById('code-form').addEventListener('submit', function (e) {
	e.preventDefault(); // Evita o comportamento padrão do formulário
	
	// Obtém o valor do campo
	const codigo = document.getElementById('codigo').value.trim();
	
	// Valida se o campo foi preenchido
	if (!codigo) {
		alert('Por favor, insira o código.');
		return;
	}
	
	// Redireciona para a próxima página
	window.location.href = 'tela7.html';
});
