// PLAYER

let musicas = [

    {
        titulo: 'Ultima Dança',
        Artista: 'MATUE',
        src: 'musicas/Ultima dança.mp3',
        img: 'imagens/ultima dança.jpg'
    },

    {
        titulo: 'Honey Baby',
        Artista: 'MATUE',
        src: 'musicas/honey.mp3',
        img: 'imagens/honey baby.jpg'
    },

    {
        titulo: 'Reza do Milhão',
        Artista: 'MATUE',
        src: 'musicas/reza do milhão.mp3',
        img: 'imagens/reza do milhão.jpg'
    }
];

let indexmusica = 0;

let musica = document.querySelector('audio');

let img = document.querySelector('img');

let nomMusica = document.querySelector('.descricao h2');

let nomArtista = document.querySelector('.descricao i');

// carregar música

function renderizarmusica(index){

    musica.src = musicas[index].src;

    nomMusica.textContent = musicas[index].titulo;

    nomArtista.textContent = musicas[index].Artista;

    img.src = musicas[index].img;
}

// duração

function duration(){

    let duracaototal = document.querySelector('.fim');

    duracaototal.textContent =
        SegMIN(Math.floor(musica.duration));
}

// play e pause

document.querySelector('.botao-play')
.addEventListener('click', tocar);

document.querySelector('.botao-pause')
.addEventListener('click', pausar);

// barra

musica.addEventListener('timeupdate', progressoBarra);

// anterior

document.querySelector('.anterior')
.addEventListener('click', () => {

    indexmusica--;

    if(indexmusica < 0){

        indexmusica = musicas.length - 1;
    }

    renderizarmusica(indexmusica);

    tocar();
});

// próxima

document.querySelector('.proximo')
.addEventListener('click', () => {

    indexmusica++;

    if(indexmusica >= musicas.length){

        indexmusica = 0;
    }

    renderizarmusica(indexmusica);

    tocar();
});

// carregar informações

musica.addEventListener('loadeddata', () => {

    duration();

    progressoBarra();
});

// tocar

function tocar(){

    musica.play();

    document.querySelector('.botao-pause')
    .style.display = 'block';

    document.querySelector('.botao-play')
    .style.display = 'none';
}

// pausar

function pausar(){

    musica.pause();

    document.querySelector('.botao-pause')
    .style.display = 'none';

    document.querySelector('.botao-play')
    .style.display = 'block';
}

// progresso

function progressoBarra(){

    let barra = document.querySelector('progress');

    barra.style.width =
        Math.floor(
            (musica.currentTime / musica.duration) * 100
        ) + '%';

    let tempoatual =
        document.querySelector('.inicio');

    tempoatual.textContent =
        SegMIN(Math.floor(musica.currentTime));
}

// converter segundos

function SegMIN(segundos){

    let minuto = Math.floor(segundos / 60);

    let seg = segundos % 60;

    if(seg < 10){

        seg = '0' + seg;
    }

    return minuto + ':' + seg;
}

// Atualiza o tempo da música
document.getElementById('barra').addEventListener('click', (e) => {
    let barra = document.getElementById('barra');
    let newtime = (e.offsetX / barra.offsetWidth) * musica.duration;
    musica.currentTime = newtime;
    tocar();
});

// Controle de repetição
let repeatMode = 0; 
let botaoRepeat = document.getElementById('botao-repeat');

// Alterna entre os modos de repetição
botaoRepeat.addEventListener('click', () => {
    repeatMode++;
    if (repeatMode > 2) {
        repeatMode = 0; 
    }
    atualizarbotaorepeat();

});

// Atualiza o botão de repetição
function atualizarbotaorepeat() {
    if (repeatMode === 0) {
        botaoRepeat.classList.remove('repeat-ativo');
        botaoRepeat.style.color = '#ccc';
    } else if (repeatMode === 1) {
        botaoRepeat.classList.add('repeat-ativo');
        botaoRepeat.style.color = 'rgb(131, 20, 141)';
        botaoRepeat.style.transform = 'rotate(0deg)';
    } else if (repeatMode === 2) {
        botaoRepeat.classList.add('repeat-ativo');
        botaoRepeat.style.color = 'rgb(197, 151, 201)';
        botaoRepeat.style.transform = 'rotate(360deg)';
    }
}

// final da música
musica.addEventListener('ended', () => {
    

    if (repeatMode === 1) {
        musica.currentTime = 0;
        tocar(); 
    } else {
        indexmusica++;
        if (indexmusica >= musicas.length) {
            indexmusica = 0;
        }
        renderizarmusica(indexmusica);
        tocar();
    }
});
// iniciar player

renderizarmusica(indexmusica);