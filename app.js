let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//FUNÇÃO - Para exibição de texto na tela, sendo necessário apenas chama-lá e definir a tag e o texto
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemIncial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');  
}

exibirMensagemIncial(); 

//FUNÇÃO - Verifica o chute se está certo, maior ou menor
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', `Acertou!`);
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor.`);
        } else {
                exibirTextoNaTela('p', `O número secreto é maior.`);
        }
        tentativas++;
        limparCampo();
    }
}

//FUNÇÃO - Gera número "aleatório" e retorna para a var que a chamar
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log (listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//FUNÇÃO - Limpa o campo do chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//FUNÇÃO - Reinicia o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}