document.getElementById('bank-form').addEventListener('submit', function (event) {
	event.preventDefault();
	const codigoBanco = document.getElementById('codigoBanco').value.trim();
	const agencia = document.getElementById('agencia').value.trim();
	const conta = document.getElementById('conta').value.trim();
	const cpf = document.getElementById('cpf').value.trim();

	if (!codigoBanco || !agencia || !conta || !cpf) {
		alert('Por favor, preencha todos os campos antes de prosseguir.');
		return false;
	}

	window.location.href = 'tela6.html';
});
