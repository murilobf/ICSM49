const corpoTabelaMusicas = document.querySelector(".corpo-tabela-musicas")
let tabelaDados = []

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
            elementosAux = elementosAux.slice(1)

            //Pega todas as palavras que compõem o nome da banda
            elementosAux.forEach(palavra => {
                nomeBanda += ' ' +palavra;
            })

            tabelaDados[i][1] = nomeBanda.trim()

            //Pega o nome do album
            tabelaDados[i][2] = linha.split('–')[1].split('(1')[0] //TODO: essa forma é extremamente porca com (1, refazer de um jeito decente

            //Pega o ano //TODO: pegar o ano 
            tabelaDados[i][3] = linha.split('–')[1].split('(1')[1] //TODO: essa forma é extremamente porca com (1, refazer de um jeito decente
            
            //Pega o número de vendas
            tabelaDados[i][4] = linha.split('–')[2]
        });

        
    })
}
carregaDados()
console.log(tabelaDados)

//Criar as linhas da coluna com base nos elementos carregados anteriormente