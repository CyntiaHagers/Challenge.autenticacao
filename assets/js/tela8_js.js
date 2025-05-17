document.addEventListener('DOMContentLoaded', () => {
    // --- Gerenciamento da Barra de Progresso ---
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');

    let currentProgress = 0;
    const targetProgress = 80; // Atinge 80% como na imagem
    const duration = 1500; // Duração da animação em milissegundos
    const intervalTime = 10; // Intervalo de atualização

    function animateProgressBar() {
        const steps = duration / intervalTime;
        const increment = targetProgress / steps;

        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(interval);
            }
            updateProgressBar(Math.round(currentProgress)); // Arredonda para evitar decimais no texto
        }, intervalTime);
    }

    function updateProgressBar(percentage) {
        progressBarFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }

    // Inicia a animação da barra de progresso quando a página é carregada
    animateProgressBar();

    // --- Interatividade para a Onda Sonora (Waveform) ---
    // As barras da onda sonora já são animadas via CSS.
    // Para um controle mais dinâmico via JS (por exemplo, se houvesse dados de áudio reais),
    // você poderia manipular a altura das barras aqui.
    const waveformBars = document.querySelectorAll('.audio-waveform .bar');
    waveformBars.forEach(bar => {
        // Pode-se ajustar a altura aqui ou adicionar classes para diferentes animações
    });


    // --- Função para Habilitar a Câmera ---
    const cameraPreview = document.getElementById('cameraPreview');
    let mediaStream = null; // Variável para armazenar o fluxo da câmera

    async function enableCamera() {
        // Verifica se o navegador suporta a API getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('getUserMedia não é suportado neste navegador.');
            alert('Seu navegador não suporta o acesso à câmera. Por favor, use um navegador mais recente.');
            return;
        }

        try {
            // Solicita acesso à câmera (somente vídeo, sem áudio)
            // As "constraints" definem o que você quer acessar (vídeo, áudio) e suas características.
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

            // Anexa o fluxo da câmera ao elemento <video>
            cameraPreview.srcObject = mediaStream;
            console.log('Câmera habilitada com sucesso!');

            // Opcional: Se você quiser garantir que o vídeo está ocupando o espaço:
            cameraPreview.style.display = 'block'; // Garante que o vídeo seja exibido

        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            let errorMessage = 'Não foi possível acessar sua câmera. Por favor, verifique as permissões do navegador.';

            if (error.name === 'NotAllowedError') {
                errorMessage = 'Você negou a permissão para acessar a câmera. Por favor, permita o acesso nas configurações do seu navegador.';
            } else if (error.name === 'NotFoundError') {
                errorMessage = 'Nenhuma câmera encontrada. Verifique se há uma câmera conectada e funcionando.';
            } else if (error.name === 'NotReadableError' || error.name === 'OverconstrainedError') {
                errorMessage = 'A câmera está em uso ou indisponível. Tente fechar outros aplicativos que possam estar usando-a.';
            }

            alert(errorMessage);
        }
    }

    // --- Função para Desabilitar a Câmera ---
    function disableCamera() {
        if (mediaStream) {
            const tracks = mediaStream.getTracks(); // Obtém todas as faixas de mídia no fluxo
            tracks.forEach(track => track.stop()); // Para cada faixa (vídeo, áudio), interrompe-a
            cameraPreview.srcObject = null; // Remove a fonte do vídeo
            mediaStream = null; // Limpa a referência ao fluxo
            console.log('Câmera desabilitada.');
            // Opcional: Se você quiser esconder o vídeo quando desabilitar
            // cameraPreview.style.display = 'none';
        }
    }

    // --- Chamada para habilitar a câmera ao carregar a página ---
    // A imagem sugere que a câmera está ativa ao carregar, então vamos habilitá-la automaticamente.
    enableCamera();

    // --- Placeholder para Interatividade do Vídeo (Exemplo) ---
    // Você pode adicionar um evento de clique para pausar/retomar ou desabilitar a câmera
    const videoPreviewContainer = document.querySelector('.video-preview');
    if (videoPreviewContainer) {
        videoPreviewContainer.addEventListener('click', () => {
            console.log('Prévia do vídeo clicada!');
            // Exemplo: se quiser desabilitar/habilitar a câmera ao clicar
            // if (mediaStream) {
            //     disableCamera();
            // } else {
            //     enableCamera();
            // }
        });
    }

    // --- Exemplo de Interatividade Adicional (Botão de Suporte) ---
    const supportLink = document.querySelector('.contact-support a');
    if (supportLink) {
        supportLink.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão do link
            alert('Você clicou no link de suporte! Uma função real de suporte (chat, modal, etc.) seria ativada aqui.');
            console.log('Link de suporte clicado.');
        });
    }

    // --- Opcional: Desabilitar a câmera ao sair da página para liberar recursos ---
    window.addEventListener('beforeunload', disableCamera);
});

document.querySelector('.signature-button').addEventListener('click', () => {
    alert('Documento assinado com sucesso!');
    window.location.href = 'ultimatela.html'; // Substitua pelo caminho correto da sua página
});
