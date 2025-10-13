const TEXTO = `1 Pink Floyd – The Dark Side of the Moon (1973) – 43,3 milhões
2 Led Zeppelin – Led Zeppelin IV (1971) – 36,8 milhões
3 AC/DC – Back in Black (1980) – 35,8 milhões
4 Fleetwood Mac – Rumours (1977) – 35,5 milhões
5 Alanis Morissette – Jagged Little Pill (1995) – 33,6 milhões
6 Pink Floyd – The Wall (1979) – 31,3 milhões
7 Dire Straits – Brothers in Arms (1985) – 30,9 milhões
8 Guns N’ Roses – Appetite For Destruction (1987) – 30,8 milhões
9 Metallica – Metallica (1991) – 30,8 milhões
10 Eagles – Hotel California (1976) – 30,1 milhões
11 Bruce Springsteen – Born in the U.S.A. (1984) – 29,3 milhões
12 Nirvana – Nevermind (1991) – 27,8 milhões
13 Meat Loaf – Bat Out of Hell (1977) – 27,4 milhões
14 U2 – The Joshua Tree (1987) – 26,8 milhões
15 The Beatles – Abbey Road (1969) – 26,7 milhões
16 Santana – Supernatural (1999) – 26 milhões
17 Def Leppard – Hysteria (1987) – 25 milhões
18 The Beatles – Sgt. Pepper’s Lonely Hearts Club Band (1967) – 24,8 milhões
19 Eric Clapton – Unplugged (1992) – 23,7 milhões
20 Bon Jovi – Slippery When Wet (1986) – 23,6 milhões
21 Phil Collins – No Jacket Required (1985) – 23,3 milhões
22 Boston – Boston (1976) – 22,4 milhões
23 Hootie & The Blowfish – Cracked Rear View (1994) – 22,3 milhões
24 Pink Floyd – Wish You Were Here (1975) – 22,3 milhões
25 Led Zeppelin – Led Zeppelin II (1969) – 21,9 milhões
26 Linkin Park – Hybrid Theory (2000) – 20,8 milhões
27 Phil Collins – ... But Seriously (1989) – 20,8 milhões
28 The Who – Tommy (1969) – 20 milhões
29 Green Day – Dookie (1994) – 19,8 milhões
30 Simon & Garfunkel – Bridge Over Troubled Water (1970) – 19,6 milhões
31 The Beatles – The Beatles (1968) – 19 milhões
32 Guns N’ Roses – Use Your Illusion II (1991) – 18,8 milhões
33 Guns N’ Roses – Use Your Illusion I (1991) – 18 milhões
34 No Doubt – Tragic Kingdom (1995) – 18 milhões
35 The Cranberries – No Need to Argue (1994) – 17,8 milhões
36 Led Zeppelin – Houses of the Holy (1973) – 17,7 milhões
37 Oasis – (What’s the Story) Morning Glory? (1995) – 17,7 milhões
38 U2 – Achtung Baby (1991) – 17,5 milhões
39 Peter Frampton – Frampton Comes Alive! (1976) – 17 milhões
40 Supertramp – Breakfast in America (1979) – 16,8 milhões
41 Evanescence – Fallen (2003) – 16,7 milhões
42 Red Hot Chili Peppers – Californication (1999) – 16,3 milhões
43 Nirvana – MTV Unplugged in New York (1994) – 16,1 milhões
44 Blink -182 – Enema of the State (1999) – 16 milhões
45 Blondie – Paralell Lines (1978) – 16 milhões
46 R.E.M. – Out of Time (1991) – 16 milhões
47 Led Zeppelin – Led Zeppelin (1969) – 15,8 milhões
48 Metallica – ... And Justice for All (1988) – 15,8 milhões
49 Pearl Jam – Ten (1991) – 15,7 milhões
50 Phil Collins – Face Value (1981) – 15,6 milhões`;

let albuns = []
let artistas = []

const dropdownArtista = document.getElementById('melhor-artista');
const fieldsetAlbuns = document.getElementById('melhores-albuns');

// Modifique sua função carregaDados para esta versão:
function carregaDados(){
    const linhas = TEXTO.split('\n');

    // Remove a lógica antiga de extração de dados daqui
    // e apenas chama as novas funções
    populaArtistasAgrupados(linhas);
    populaAlbunsAgrupados(linhas);
}

carregaDados();

function populaAlbunsAgrupados(linhas) {
    const albunsPorDecada = {};

    linhas.forEach(linha => {
        const partes = linha.split('–');
        const albumInfo = partes[1].trim();
        const matchAno = albumInfo.match(/\((\d{4})\)/);

        if (matchAno) {
            const ano = parseInt(matchAno[1]);
            const decada = Math.floor(ano / 10) * 10;
            const nomeAlbum = albumInfo.substring(0, matchAno.index).trim();
            
            if (!albunsPorDecada[decada]) {
                albunsPorDecada[decada] = [];
            }
            albunsPorDecada[decada].push(nomeAlbum);
        }
    });

    // Agrupa por década
    Object.keys(albunsPorDecada).sort().forEach(decada => {
        const fieldsetDecada = document.createElement('fieldset');
        const legendDecada = document.createElement('legend');
        legendDecada.textContent = `Década de ${decada}`;
        fieldsetDecada.appendChild(legendDecada);

        albunsPorDecada[decada].forEach(album => {
            const labelCheckbox = document.createElement('label');
            const checkboxAlbum = document.createElement('input');
            const valorAlbum = album.toLowerCase().replace(/ /g, '-');

            checkboxAlbum.setAttribute('type', 'checkbox');
            checkboxAlbum.setAttribute('name', 'albuns_preferidos'); // Nome unificado para facilitar a contagem
            checkboxAlbum.setAttribute('value', valorAlbum);
            
            labelCheckbox.appendChild(checkboxAlbum);
            labelCheckbox.appendChild(document.createTextNode(` ${album}`));
            fieldsetDecada.appendChild(labelCheckbox);
        });

        fieldsetAlbuns.appendChild(fieldsetDecada);
    });
}

function populaArtistasAgrupados(linhas) {
    //Pega o nome do artista/banda
    linhas.forEach((linha) => {
        elementosAux = linha.split('–', 1)[0].split(' ');
        let nomeBanda = '';

        //Ignora a posição
        elementosAux = elementosAux.slice(1);

        //Pega todas as palavras que compõem o nome da banda
        elementosAux.forEach(palavra => {
            nomeBanda += ' ' +palavra;
        })

        nomeBanda = nomeBanda.trim()
        artistas.push(nomeBanda);
    })
    
    //Filtra e pega só a primeira ocorrência de cada nome
    const artistasUnicos = artistas.filter((value, index, self) => {
        return self.indexOf(value) === index;
    }).sort();

    const artistasPorLetra = {};

    artistasUnicos.forEach(artista => {
        const primeiraLetra = artista[0].toUpperCase();
        if (!artistasPorLetra[primeiraLetra]) {
            artistasPorLetra[primeiraLetra] = [];
        }
        artistasPorLetra[primeiraLetra].push(artista);
    });
    
    Object.keys(artistasPorLetra).forEach(letra => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = letra;

        artistasPorLetra[letra].forEach(artista => {
            const opcao = document.createElement("option");
            opcao.textContent = artista;
            opcao.value = artista.toLowerCase();
            optgroup.appendChild(opcao);
        });

        dropdownArtista.appendChild(optgroup);
    });
}

// Seleciona o formulário para adicionar o listener
const form = document.querySelector('form');

/**
 * Exibe uma mensagem de erro para um campo específico.
 */
function showError(inputId, message) {
    const input = document.querySelector(`[name=${inputId}]`);
    input.classList.add('error'); // Adiciona classe para estilizar o campo

    let errorSpan = document.getElementById(`${inputId}-error`);
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.id = `${inputId}-error`;
        errorSpan.className = 'error-message';
        // Insere a mensagem de erro após o campo ou seu label
        input.parentElement.insertBefore(errorSpan, input.nextSibling);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

/**
 * Limpa todas as mensagens de erro e classes de erro.
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
        span.style.display = 'none';
    });
    document.querySelectorAll('.error').forEach(input => {
        input.classList.remove('error');
    });
    // Limpa o erro do fieldset dos álbuns
    const albunsError = document.getElementById('melhores-albuns-error');
    if(albunsError) albunsError.style.display = 'none';
}

function validaForm() {
    clearErrors();
    let valido = true;

    //Valida campos de dados pessoais
    const camposPessoais = ['nome', 'email', 'telefone', 'nascimento'];
    camposPessoais.forEach(field => {
        const input = document.querySelector(`[name=${field}]`);
        if (!input.value.trim()) {
            showError(field, 'Este campo é obrigatório.');
            valido = false;
        }
    });

    //Valida formato de e-mail
    const emailInput = document.querySelector('[name=email]');
    if (emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError('email', 'Por favor, insira um e-mail válido.');
            valido = false;
        }
    }

    //Valida formato de telefone
    const telInput = document.querySelector('[name=telefone]');
    if (telInput.value) {
        const telRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;
        if (!telRegex.test(telInput.value)) {
            showError('telefone', 'Use o formato (XX) XXXXX-XXXX.');
            valido = false;
        }
    }
    
    //Valida seleção de 1-3 álbuns
    const qtdeAlbunsMarcados = document.querySelectorAll('input[name="albuns_preferidos"]:checked').length;
    if (qtdeAlbunsMarcados < 1 || qtdeAlbunsMarcados > 3) {
        // Mostra o erro no fieldset principal dos álbuns
        const fieldsetElement = document.getElementById('melhores-albuns');
        let erroSpan = document.getElementById('melhores-albuns-error');
        if (!erroSpan) {
            erroSpan = document.createElement('span');
            erroSpan.id = `melhores-albuns-error`;
            erroSpan.className = 'error-message';
            fieldsetElement.parentNode.insertBefore(erroSpan, fieldsetElement.nextSibling);
        }
        erroSpan.textContent = 'Você deve selecionar entre 1 e 3 álbuns.';
        erroSpan.style.display = 'block';
        valido = false;
    }

    return valido;
}

form.addEventListener('submit', (event) => {
    if (!validaForm()) {
        event.preventDefault(); // Impede o envio do formulário se a validação falhar
    }
});
