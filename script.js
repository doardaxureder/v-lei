//CLASS QUE FUNCIONAM

class Time{
    nome;
    pontos;
    constructor(nome){
        this.nome = nome;
        this.pontos = 0;
    }
}

class Jogo{
    nomeTime1;
    nomeTime2;
    vencedor;
    constructor(nomeTime1, nomeTime2){
        this.nomeTime1 = nomeTime1;
        this.nomeTime2 = nomeTime2;
    }
}
function mostrarPartidas() {
    document.querySelector('#qtij p').textContent = 'Veja as partidas formadas:';
    const partidasDiv = document.getElementById('outputDiv');
    partidasDiv.innerHTML = '';      //Limpa o conteúdo anterior, se houver

    for(l = 0; l<jogos.length; l++ ){
        let div = document.createElement("div");
        div.id = 'partidas';
        div.className = 'partidas'; 
        
        let nome1 = jogos[l].nomeTime1;  //time pega nome, jogo pega vs
        let nome2 = jogos[l].nomeTime2;
        div.innerHTML = nome1 + ' VS ' + nome2;
        
        let select = document.createElement("select"); //botao do select 'ganhou, perdeu, resultado'
        select.id = 'botaozinho' + l;
        select.setAttribute("onchange","winner("+l+")");

        let opcao1 = document.createElement("option");    
        opcao1.value = nome1;
        opcao1.innerHTML = nome1 + ' Ganhou!';        

        let opcao2 = document.createElement("option");
        opcao2.value = nome2;
        opcao2.innerHTML = nome2 + ' Ganhou!';

        let opcao3 = document.createElement("option");
        opcao3.innerHTML = 'Resultado';
        if(opcao1.value==jogos[l].vencedor){
            select.appendChild(opcao1);
        }
        else if(opcao2.value==jogos[l].vencedor){
            select.appendChild(opcao2);
        }
        else{
            select.appendChild(opcao3);
            select.appendChild(opcao1); //faz aparecer na tela
            select.appendChild(opcao2);
        }

        div.appendChild(select);
        partidasDiv.appendChild(div);  
    }
    const pontosButton = document.createElement('input');
    pontosButton.type = 'button';
    pontosButton.id = 'pontos';
    pontosButton.value = 'Mostrar pontos';
    pontosButton.setAttribute('onclick','tabela()');
    partidasDiv.appendChild(pontosButton);
}
function carregar(){
    console.log("entrou")
    createfields = document.getElementById('createfields');
    players = document.getElementById('players');
    pedroButton = document.getElementById('pedro');
    numeroJogadoresInput = document.getElementById('numJogadores');
    pedroButton.style.display = 'none';
    createfields.style.display = 'none';
    numeroJogadoresInput.style.display = 'none';
    players.style.display = 'none';
    times = JSON.parse(localStorage.getItem("times"));
    jogos = JSON.parse(localStorage.getItem("jogos"));
}
function winner(jogo){               //função pra armazenar o vencedor
    let select = document.getElementById('botaozinho' + jogo);
    let choosed = select.value;      //descobrindo quem venceu
    jogos[jogo].vencedor = choosed;  //pega os jogos criados (jogos (vetor que ta as partidas dentro)) em ordem (jogos) o vencedor la de cima acumula pontos com o choosed 
    for (t=0; t<times.length; t++){
        if(times[t].nome == choosed ){
            times[t].pontos+=1;
        }
    } 
    localStorage.setItem("times",JSON.stringify(times));
    localStorage.setItem("jogos",JSON.stringify(jogos));
}
function tabela(){
    let div = document.getElementById('outputDiv');
    div.style.display = 'none'; 
    let douve = document.getElementById('tabelinhafinal');
    let tabela = document.createElement('table');
    let linha = document.createElement('tr');
    let campo_de_morango = document.createElement('td');
    campo_de_morango.innerHTML = "Time: ";        
    let campo_de_uva = document.createElement('td');
    campo_de_uva.innerHTML = "Pontos: ";

    linha.appendChild(campo_de_morango);
    linha.appendChild(campo_de_uva);
    tabela.appendChild(linha);
    douve.appendChild(tabela);
    xureder.appendChild(douve);
    a = times.length
    vetor = times;
    for(o=0; o<a; o++ ){
        let maior = vetor[0];
        let pos = 0;
        for(c=0; c<vetor.length; c++){
            if(vetor[c].pontos > maior.pontos){
                maior = vetor[c]; // maior=time de maior pontuação
                pos = c;
            }
        }
        vetor.splice(pos,1);
        console.log(maior);
        let linha1 = document.createElement('tr');
        let team = document.createElement('td');
        let pont = document.createElement('td');
        team.innerHTML = maior.nome;
        pont.innerHTML = maior.pontos;

        linha1.appendChild(team);
        linha1.appendChild(pont);
        tabela.appendChild(linha1);
    }
    document.querySelector('#qtij p').textContent = 'Veja os pontos dos times atuais:';
}
function createFields(){
    createfields = document.getElementById('createfields');
    players = document.getElementById('players');
    pedroButton = document.getElementById('pedro');
    numeroJogadoresInput = document.getElementById('numJogadores');
    players.innerHTML = ''; // Limpa os campos existentes

    numJogadores = parseInt(numeroJogadoresInput.value, 10);

    if(numJogadores<=20){
        for (let i = 1; i <= numJogadores; i++) { 
            const input = document.createElement('input'); 
            input.type = 'text';
            input.id = 'Jogador' + i;
            input.placeholder = 'Nome do Time ' + i;
            input.required = true;
            input.classList.add('aluno-input');
    
            players.appendChild(input);
            players.appendChild(document.createElement('br'));
        }
    
        document.querySelector('#qtij p').textContent = 'Informe os nomes dos times/jogadores:';
        //AQUI É O BOTAO 2, APARECE NA SEGUNDA COISINHA
        const input = document.createElement('input');
        input.type = 'button';
        input.name = 'aaaa';
        input.id = 'botaopg2'
        input.value = 'START'
        input.setAttribute("onclick","pagina2();armazenarNomes(numJogadores);")
    
        //imagem troca
        const imagem = document.getElementById('teste')
        imagem.setAttribute('src', 'femeas.png');
        players.appendChild(input);
    
        // Esconde os botões após clicar em "Iniciar"
        pedroButton.style.display = 'none';
        createfields.style.display = 'none';
        numeroJogadoresInput.style.display = 'none';
    }
    else{
        alert("O máximo de times a cadastrar são 20!");
    }
}
function pagina2(){
    let botaopg2 = document.querySelector("#botaopg2");
    let players = document.getElementById('players');
    botaopg2.style.display =  'none';
    players.style.display = 'none';
}
function armazenarNomes(numJogadores){
    console.log("entrou");
    for (let i = 1; i <= numJogadores; i++) {
        let Jogador = document.querySelector('#Jogador' + i).value;
        let time = new Time (Jogador);
        times.push(time);
    }
    console.log(times); 
    for (i = 0; i <=times.length - 2; i++) {
        for (j = i + 1; j <= times.length - 1; j++) {
            console.log(times[i].nome + " VS " + times[j].nome);
            let jogo = new Jogo (times[i].nome, times[j].nome);
            jogos.push(jogo); 
        
        };
    };
    localStorage.setItem("times",JSON.stringify(times));
    localStorage.setItem("jogos",JSON.stringify(jogos));
    console.log(jogos);
    mostrarPartidas();
}
let times = []; // Um array para armazenar os nomes dos times
let jogos = []; 
let numJogadores;
