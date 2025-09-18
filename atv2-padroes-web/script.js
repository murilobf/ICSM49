var tabelaDados = [];

const corpoTabelaMusicas = document.querySelector(".corpo-tabela-musicas");

const headerPosicao = document.getElementById("posicao");
const headerArtista = document.getElementById("artista");
const headerNome = document.getElementById("nome");
const headerAno = document.getElementById("ano");
const headerQuantidade = document.getElementById("quantidade");

let ultimaColuna = 0

headerPosicao.addEventListener("click", function () {
    ordena(0)
});
headerArtista.addEventListener("click", function () {
    ordena(1)
});
headerNome.addEventListener("click", function () {
    ordena(2)
});
headerAno.addEventListener("click", function () {
    ordena(3)
});
headerQuantidade.addEventListener("click", function () {
    ordena(4)
});

function carregaDados(){
    fetch('./dados.txt')
    .then(response => response.text())
    .then(text => {
        let linhas = text.split('\n');

        //Pra cortar o último elemento vazio causado pelo fim do texto
        linhas.pop()

        linhas.forEach((linha,i) => {
            //Inicializa o subarray do array
            tabelaDados[i] = [];

            //Pega a posição
            tabelaDados[i][0] = linha.split(' ')[0];

            //Pega o nome do artista/banda
            elementosAux = linha.split('–', 1)[0].split(' ');
            let nomeBanda = '';

            //Ignora a posição
            elementosAux = elementosAux.slice(1);

            //Pega todas as palavras que compõem o nome da banda
            elementosAux.forEach(palavra => {
                nomeBanda += ' ' +palavra;
            })

            tabelaDados[i][1] = nomeBanda.trim();

            //O bloco abaixo pega o nome do album
            //Já que será repetido o valor é colocado na variável abaixo
            albumAno = linha.split('–')[1].trim();
            
            //Pega o index da string em que o ano começa e termina, ele sempre segue o padrão nome_album (yyyy) então pode ser feito assim
            inicioAno = albumAno.length - 5;
            fimAno =  inicioAno + 4;

            tabelaDados[i][2] = albumAno.substring(0, inicioAno - 2); //OBS: não é a melhor forma mas como todos os dados seguem esse padrão funciona. O -2 é pra tirar o parenteses e o espaço
            
            //Pega o ano 
            tabelaDados[i][3] = albumAno.substring(inicioAno, fimAno); //Idem a observação acima
            
            //Pega o número de vendas
            tabelaDados[i][4] = linha.split('–')[2].trim();
        });
        //Chama a função para preencher a tabela
        populaTabela();
    })
}

carregaDados();

//Criar as linhas da coluna com base nos elementos carregados anteriormente
function populaTabela(){

    //Limpa as tabelas antes de popular de novo
    corpoTabelaMusicas.innerHTML = ''

    // Guardar valores e referências de cada coluna
    let ultimoValor = [null, null, null, null, null];
    let tdRef = [null, null, null, null, null];
    let rowspan = [1, 1, 1, 1, 1];

    tabelaDados.forEach((linha) => {
        const linhaTabela = document.createElement("tr");

        linha.forEach((valor, colIndex) => {
            if (valor === ultimoValor[colIndex]) {
                 // Se o valor é igual ao anterior, só aumenta o rowspan
                rowspan[colIndex]++;
                tdRef[colIndex].setAttribute("rowspan", rowspan[colIndex]);
            } else {
                // Se mudou, cria célula nova
                const td = document.createElement("td");
                td.innerHTML = valor;
                linhaTabela.appendChild(td);
                // Atualiza controles
                tdRef[colIndex] = td;
                ultimoValor[colIndex] = valor;
                rowspan[colIndex] = 1;
                }
        });

        corpoTabelaMusicas.appendChild(linhaTabela);
    });
}

function ordena(coluna) {
    if (ultimaColuna === coluna) {
        // Ordem decrescente
        tabelaDados.sort((a, b) => {
            if (!isNaN(a[coluna]) && !isNaN(b[coluna])) {
                return parseInt(b[coluna]) - parseInt(a[coluna]);
            } else {
                return b[coluna].localeCompare(a[coluna]);
            }
        });
        ultimaColuna = null;
    } else {
        // Ordem crescente
        tabelaDados.sort((a, b) => {
            if (!isNaN(a[coluna]) && !isNaN(b[coluna])) {
                return parseInt(a[coluna]) - parseInt(b[coluna]);
            } else {
                return a[coluna].localeCompare(b[coluna]);
            }
        });
        ultimaColuna = coluna;
    }

    populaTabela();
}
