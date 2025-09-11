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

            //O bloco abaixo pega o nome do album
            //Já que será repetido o valor é colocado na variável abaixo
            albumAno = linha.split('–')[1].trim()
            
            //Pega o index da string em que o ano começa e termina, ele sempre segue o padrão nome_album (yyyy) então pode ser feito assim
            inicioAno = albumAno.length - 5
            fimAno =  inicioAno + 4

            tabelaDados[i][2] = albumAno.substring(0, inicioAno - 2) //OBS: não é a melhor forma mas como todos os dados seguem esse padrão funciona. O -2 é pra tirar o parenteses e o espaço
            
            //Pega o ano 
            tabelaDados[i][3] = albumAno.substring(inicioAno, fimAno) //Idem a observação acima
            
            //Pega o número de vendas
            tabelaDados[i][4] = linha.split('–')[2].trim()
        });

        
    })
}

carregaDados()

//Criar as linhas da coluna com base nos elementos carregados anteriormente