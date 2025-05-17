document.addEventListener('DOMContentLoaded', () => {
	const cameraPreview = document.getElementById('cameraPreview');
	let mediaStream = null;

	// Function to enable the camera
	async function enableCamera() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert('Seu navegador não suporta o acesso à câmera. Por favor, use um navegador mais recente.');
			return;
		}

		try {
			mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
			cameraPreview.srcObject = mediaStream;
		} catch (error) {
			console.error('Erro ao acessar a câmera:', error);
			alert('Não foi possível acessar sua câmera. Verifique as permissões do navegador.');
		}
	}

	// Function to disable the camera
	function disableCamera() {
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => track.stop());
			cameraPreview.srcObject = null;
		}
	}

	// Enable the camera when the page loads
	enableCamera();

	// Disable the camera when the user leaves the page
	window.addEventListener('beforeunload', disableCamera);
});
