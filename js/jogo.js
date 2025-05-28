// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique   
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    btnJogarNovamente.className = 'visivel';
    btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByTagName("div");

    // Limpa classes das cartas
    for (let i = 0; i < divis.length; i++) {
        if (!isNaN(divis[i].id) && divis[i].id >= 0 && divis[i].id <= 4) {
            divis[i].className = "inicial";
            divis[i].style.animation = "";
            // Remove imagens dentro das cartas, se houver
            const imgs = divis[i].getElementsByTagName('img');
            while (imgs.length > 0) {
                imgs[0].remove();
            }
        }
    }
}

// Atualiza placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML =
        "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Quando o jogador acerta (TOCA ÁUDIO, mostra imagem, faz pulinho e confete)
function acertou(obj) {
    obj.className = "acertou";
    const img = new Image(100);
    img.src = "agathanunes.jpg";
    obj.appendChild(img);
    const audioAcerto = document.getElementById('audioAcerto');
    audioAcerto.play();

    // Animação do pulinho
    obj.style.animation = "pulinho 0.6s";

    // Confete 🎉
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Quando o jogador acerta (SOMENTE mostra imagem, SEM áudio) - NOVA FUNÇÃO
function acertouSemAudio(obj) {
    obj.className = "acertou";
    const img = new Image(100);
    img.src = "agathanunes.jpg";
    obj.appendChild(img);
}

// Quando o jogador erra (TOCA ÁUDIO e mostra imagem de erro)
function errou(obj) {
    obj.className = "errou";
    const img = new Image(100);
    img.src = "erro.jpeg";
    obj.appendChild(img);
    const audioErro = document.getElementById('audioErro');
    audioErro.play();
}

// Verifica jogada (AJUSTADO CORRETAMENTE)
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;

        if (tentativas === 5) {
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }

        let sorteado = Math.floor(Math.random() * 5);

        if (parseInt(obj.id) === sorteado) {
            acertou(obj); // Acertou: mostra imagem, toca som, faz pulinho e confete
            acertos++;
        } else {
            errou(obj); // Errou: mostra imagem e toca som de erro
            const objSorteado = document.getElementById(sorteado);
            acertouSemAudio(objSorteado); // Mostra a carta correta SEM som
        }

        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
