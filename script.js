const player = document.getElementById("player");
const colisores = document.querySelectorAll('.colisores');
let seta = document.getElementById("seta");

let liberarTeleport = false;

// fase = 0 -> menu principal
// fase = -1 -> lista de fases de jogo
// fase = -2 -> loja
let fase = 0;

let posY = 15;
let posX = 10;
let keysPressed = {};

let quantMoedas = 0;
let qunatMoedasTotais = 0;

let vidas = 3;

let podeTomarDano = true

let desaceleracaoPulo = 1;
let onGround = false;
let isJumping = false;
let gravidade = 0.2;

let isPressingF = false

let moedainterval = undefined;
let inimigointerval = undefined;
let intervalGame = undefined;

let colisaoDireita = false;
let colisaoEsquerda = false;
let colisaoCima = false;
let colisaoBaixo = false;
let velocidadeCenario = 0.01;

let posicoesVelhas = [];

dinheiroTotalText.innerText = qunatMoedasTotais

let botaoJogar = document.getElementById("jogar-botao")
let botaoLoja = document.getElementById("loja-botao")

let faseDois = false
let faseTres = false
let faseQuatro = false
let faseCinco = false

alert("Para ter uma melhor experiência, coloque o zoom do seu navegador em 100%")


botaoJogar.addEventListener("click", function(){
    fase = -1;
    carregarFase()
})
botaoLoja.addEventListener("click", function(){
    fase = -2;
    carregarFase()
})

let botaoFase1 = document.getElementById("lvl1");
let botaoFase2 = document.getElementById("lvl2");
let botaoFase3 = document.getElementById("lvl3");
let botaoFase4 = document.getElementById("lvl4");
let botaoFase5 = document.getElementById("lvl5");

botaoFase1.addEventListener("click", function(){
    fase = 1;
    tomarDano (false, 2000)
    salvarPosicoes()
    carregarFase()
})
botaoFase2.addEventListener("click", function(){
    if (faseDois) {
        fase = 2;
        salvarPosicoes()
        carregarFase()
    } else if (qunatMoedasTotais < 30) {
        alert("Você não tem dinheiro o suficiente para comprar a segunda fase...")
    } else {
        alert("Fase dois desbloqueada! Tenha um bom proveito...")
        qunatMoedasTotais -= 30;
        dinheiroTotalText.innerText = qunatMoedasTotais
        const lvl2Text = document.getElementById("lvl2Text")
        const lvl2Img = document.getElementById("lvl2Img")
        lvl2Img.style.opacity = '0%'
        lvl2Text.innerText = "disponível";
        faseDois = true;
        tomarDano (false, 2000)
    }
})
botaoFase3.addEventListener("click", function(){
    if (faseTres) {
        fase = 3;
        salvarPosicoes()
        carregarFase()
    } else if (qunatMoedasTotais < 150) {
        alert("Você não tem dinheiro o suficiente para comprar a segunda fase...")
    } else {
        alert("Fase três desbloqueada! Tenha um bom proveito...")
        qunatMoedasTotais -= 150;
        dinheiroTotalText.innerText = qunatMoedasTotais
        const lvl3Text = document.getElementById("lvl3Text")
        const lvl3Img = document.getElementById("lvl3Img")
        lvl3Img.style.opacity = '0%'
        lvl3Text.innerText = "disponível";
        faseTres = true;
        tomarDano (false, 2000)
    }
})
botaoFase4.addEventListener("click", function(){
    if (faseQuatro) {
        fase = 4;
        salvarPosicoes()
        carregarFase()
    } else if (qunatMoedasTotais < 750) {
        alert("Você não tem dinheiro o suficiente para comprar a segunda fase...")
    } else {
        alert("Fase quatro desbloqueada! Tenha um bom proveito...")
        qunatMoedasTotais -= 750;
        dinheiroTotalText.innerText = qunatMoedasTotais
        const lvl4Text = document.getElementById("lvl4Text")
        const lvl4Img = document.getElementById("lvl4Img")
        lvl4Img.style.opacity = '0%'
        lvl4Text.innerText = "disponível";
        faseQuatro = true;
        tomarDano (false, 2000)
    }
})
botaoFase5.addEventListener("click", function(){
    if (faseCinco) {
        fase = 5;
        salvarPosicoes()
        carregarFase()
    } else if (qunatMoedasTotais < 2750) {
        alert("Você não tem dinheiro o suficiente para comprar a segunda fase...")
    } else {
        alert("Fase cinco desbloqueada! Tenha um bom proveito...")
        qunatMoedasTotais -= 2750;
        dinheiroTotalText.innerText = qunatMoedasTotais
        const lvl5Text = document.getElementById("lvl5Text")
        const lvl5Img = document.getElementById("lvl5Img")
        lvl5Img.style.opacity = '0%'
        lvl5Text.innerText = "disponível";
        faseCinco = true;
        tomarDano (false, 2000)
    }
})

const botaoCompraDash = document.getElementById("dash");
const botaoCompraVida = document.getElementById("vida");
const botaoCompraJornada = document.getElementById("jornada");
const botaoCompraBota = document.getElementById("bota");
const botaoCompraVelocidade = document.getElementById("velocidade");
const botaoCompraInseticida= document.getElementById("inseticida");

const dashNivelText = document.getElementById("nivelDash");
const vidaNivelText = document.getElementById("nivelVida");
const jornadaNivelText = document.getElementById("nivelJornada");
const botaNivelText = document.getElementById("nivelBota");
const velocidadeNivelText = document.getElementById("nivelVelocidade");
const inseticidaNivelText = document.getElementById("nivelInseticida");

const precoDashText = document.getElementById("precoDash");
const precoVidaText = document.getElementById("precoVida");
const precoJornadaText = document.getElementById("precoJornada");
const precoBotaText = document.getElementById("precoBota");
const precoVelocidadeText = document.getElementById("precoVelocidade");
const precoInseticidaText = document.getElementById("precoInseticida");

const voltarFasesMenu = document.getElementById("voltar-fases-menu");

let precoDash = 30;
let precoVida = 30;
let precoJornada = 30;
let precoBota = 30;
let precoVelocidade = 30;
let precoInseticida = 30;

let nivelDash = 0;
let nivelVida = 0;
let nivelJornada = 0;
let nivelBota = 0;
let nivelVelocidade = 0;
let nivelInseticida = 0;

voltarFasesMenu.addEventListener("click", function(){
    fase = 0;
    carregarFase()
})

botaoCompraDash.addEventListener("click", function(){
    if (qunatMoedasTotais < precoDash) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoDash;
        precoDash *= 2;
        nivelDash++
        dashNivelText.innerText = `Nível de powerUp: ${nivelDash}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoDashText.innerText = precoDash
    }
})
botaoCompraVida.addEventListener("click", function(){
    if (qunatMoedasTotais < precoVida) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoVida;
        precoVida *= 2;
        nivelVida++
        vidaNivelText.innerText = `Nível de powerUp: ${nivelVida}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoVidaText.innerText = precoVida

        vidas = nivelVida + 3
    }
})
botaoCompraJornada.addEventListener("click", function(){
    if (qunatMoedasTotais < precoJornada) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoJornada;
        precoJornada *= 2;
        nivelJornada++
        jornadaNivelText.innerText = `Nível de powerUp: ${nivelJornada}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoJornadaText.innerText = precoJornada
    }
})
botaoCompraBota.addEventListener("click", function(){
    if (qunatMoedasTotais < precoBota) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoBota;
        precoBota *= 2;
        nivelBota++
        botaNivelText.innerText = `Nível de powerUp: ${nivelBota}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoBotaText.innerText = precoBota
    }
})
botaoCompraVelocidade.addEventListener("click", function(){
    if (qunatMoedasTotais < precoVelocidade) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoVelocidade;
        precoVelocidade *= 2;
        nivelVelocidade++
        velocidadeNivelText.innerText = `Nível de powerUp: ${nivelVelocidade}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoVelocidadeText.innerText = precoVelocidade
    }
})
botaoCompraInseticida.addEventListener("click", function(){
    if (qunatMoedasTotais < precoInseticida) {
        alert("Você não tem dinheiro suficiente para comprar o powerUp");
    } else {
        alert("PowerUp adquirido com sucesso")
        qunatMoedasTotais -= precoInseticida;
        precoInseticida *= 2;
        nivelInseticida++
        inseticidaNivelText.innerText = `Nível de powerUp: ${nivelInseticida}`
        dinheiroTotalText.innerText = qunatMoedasTotais
        precoInseticidaText.innerText = precoInseticida
    }
})




//PARA INIMIGO

carregarFase()

function jogo() {

    for (let i = 0; i < 20; i++){
        gerarNuvens()
    }







    let moedaText = document.getElementById("hud-moedas")

    atualizarVida(0)

    intervalGame = setInterval(() => {
        //ÁREA DO CÓDIGO PARA TUDO QUE ENVOLVE O INIMIGO
        // aqui é o sistema que faz os inimigos cairem no chão para trocares sua classe se isso acontecer
        const inimigos = document.querySelectorAll(".inimigo");
        const inimigosAndantes = document.querySelectorAll(".inimigosAndantes");


        colisores.forEach(function(colisor){
            inimigos.forEach(function(inimigo){
                let posYInimigo = Number((inimigo.style.bottom).replace('vw',''));
                let posXInimigo = Number((inimigo.style.left).replace('vw',''));

                if (!(colisaoDetectada(inimigo, colisor))) {
                    posYInimigo -= (fase/100) * 0.8;
                    inimigo.style.bottom = `${posYInimigo}vw`;
                    inimigo.style.left = `${posXInimigo}vw`;
                } else {
                    inimigo.classList.remove('inimigo')
                    inimigo.classList.add('inimigosAndantes')
                }
                if (posYInimigo <= 0) {
                    inimigo.remove()
                }
                if (colisaoDetectadaMoeda(player, inimigo)) {
                    tomarDano (true, 3000);
                }

            })
        })

        // aqui, os inimigos que cairam no chão vão funcionar, andando nas plataformas de um lado pro outro
        inimigosAndantes.forEach(function(inimigo2){

            let posXInimigo = Number((inimigo2.style.left).replace('vw',''));

            let inimigoColisao = false

            // aqui ele verifica todas as colisões, se alguma estiver acontecendo o inimigo continua andando
            colisores.forEach(function(colisor){
                if (colisaoDetectadaMoeda(inimigo2, colisor)){
                    inimigoColisao = true;
                }
            })



            //sistema estilo "flip-flop" para fazer o inimigo ir e voltar!

            if (inimigoColisao) {
                // aqui ele pega o lado que o inimigo está indo de acordo com a classe e continua-o se estiver colidindo com o chão
                if (inimigo2.classList.contains("direita")) {
                    posXInimigo += (((fase) / 10) / ((nivelInseticida + 1) * 1.2))
                    inimigo2.style.transform = "scaleX(-1)"
                } else if (inimigo2.classList.contains("esquerda")) {
                    posXInimigo -= (((fase) / 10) / ((nivelInseticida + 1) * 1.2))
                    inimigo2.style.transform = "scaleX(1)"
                } else {

                    let randomDirection = Math.floor(Math.random()*2)
                    switch (randomDirection) {
                        case 0:
                            inimigo2.classList.add("esquerda")
                            break;
                        case 1:
                            inimigo2.classList.add("direita")
                    }
                }
            } else {
                //aqui o inimigo vira se não estiver colidindo com o chão para virar de lado para andar em loop na plataforma
                if (inimigo2.classList.contains("direita")) {
                    inimigo2.classList.remove("direita")
                    inimigo2.classList.add("esquerda")
                    posXInimigo -= 0.5
                } else if (inimigo2.classList.contains("esquerda")) {
                    inimigo2.classList.remove("esquerda")
                    inimigo2.classList.add("direita")
                    posXInimigo += 0.5
                }
            }  


            if (colisaoDetectadaMoeda(player,inimigo2)) {
                if (isPressingF) {
                    quantMoedas += (fase * 2);
                    inimigo2.remove();
                    tomarDano (false, 1000)
                } else {
                    tomarDano (true, 3000);
                }
            }

                inimigo2.style.left = `${posXInimigo}vw`;

                if (ElementoForaDaTela(inimigo2)){
                    inimigo2.remove();
                }
        })
        

        //ÁREA DO CÓDIGO PARA TUDO QUE ENVOLVE AS MOEDAS:
        const moedas = document.querySelectorAll('.moeda')


        moedas.forEach(function(moeda) {
            let posYMoeda = (Number((moeda.style.bottom).replace('vw',''))) - (0.2);
            moeda.style.bottom = `${posYMoeda}vw`;
            if (posYMoeda <= 0 || colisaoDetectadaMoeda(player, moeda)) {
                moeda.style.transitionDuration = '0.15s';
                moeda.style.opacity = '0%'
                if (colisaoDetectadaMoeda(player, moeda)){
                    quantMoedas += fase;
                    moeda.remove()
                }
                setTimeout(() => {
                    moeda.remove()
                }, 250);
            }
        });

        moedaText.innerText = quantMoedas;






        //ÁREA DO CÓDIGO PARA O PLAYER (E TUDO QUE O ENVOLVE)

        if (posY > 4 && !isJumping && isPressingF) {
            player.style.height = `4.5vw`
        }

        if (ElementoForaDaTela(player)){
            tomarDano (true, 5000)
        }

        //gravidade
        if (posY > 4 && !isJumping && !colisaoBaixo) {

            posY -= gravidade;
            isJumping = false;

        } else {
            if (!onGround && isPressingF){
                player.style.height = `10vh`

                setTimeout(() => {
                    player.style.height = `auto`
                }, 200);
            }
            player.style.transitionDuration = `0s`
            onGround = true;
        }

        if (posY < 4) {
            posY = 4;
        }


        if(onGround){
            gravidade = 0.2;
            isPressingF = false;
        } else{
            gravidade *= 1.1;
        }


        if (isPressingF) {
            posY -= 0.8;
        }

        if (colisaoCima) {
            isJumping = false
        }



        if (isJumping){
            posY += desaceleracaoPulo;
            desaceleracaoPulo /= 1.08;

            player.style.bottom = `${posY}vw`;
            player.style.left = `${posX}vw`;

        }


        if (colisaoBaixo) {
            seta.style.transitionDuration = '0.2s'
            seta.style.opacity = '0%'
            liberarTeleport = true;
            seta.src = "Assets/seta-dash.png"
        } else {
            seta.style.transitionDuration = '0s'
            seta.style.opacity = '80%'
            onGround = false;
        }

        if (posY <= 4) {
            tomarDano (true, 5000)
            liberarTeleport = true;
            seta.src = "Assets/seta-dash.png"
        }


        if (keysPressed["w"] && !keysPressed["s"] && onGround) {
            isJumping = true;
            setTimeout(() => {
                onGround = false;
                isJumping = false;
                desaceleracaoPulo = 0.9 + ((nivelBota + 1) / 10);
                colisaoBaixo = false
            }, 100 * (nivelBota + 2));
        }
        if (keysPressed["s"] && posY > 4 && !colisaoBaixo) {
            isPressingF = true;
        }
        if (keysPressed["a"] && !colisaoEsquerda) {
            posX -= 0.5;
            player.style.transform = "scaleX(-1)"
        }
        if (keysPressed["d"] && !colisaoDireita) {
            posX += 0.5;
            player.style.transform = "scaleX(1)"
        }

        if (!keysPressed["d"] && !keysPressed["a"] && !isPressingF) {
            player.src = "Assets/GabrielParado.png"
        } else if(!isPressingF) {
            player.src = "Assets/GabrielAndando.gif"
        } else {
            player.src = "Assets/GabrielBolaDeCanhao.png"
        }


        player.style.bottom = posY + "vw";
        player.style.left = posX + "vw";


        // para a seta seguir a posição do jogador
        let localPlayerX = (Number((getComputedStyle(player).left).replace('px','')))
        let localPlayerY = (Number((getComputedStyle(player).bottom).replace('px','')))
        const larguraJanela = window.width
        seta.style.left = `${posX - 8}vw`
        seta.style.bottom = `${posY - 8}vw`

        colisaoBaixo = false;
        colisaoCima = false;
        colisaoEsquerda = false;
        colisaoDireita = false;


        let verificador = false
        let verificadorInimigo = false

        // sistema de colisão com o forEach pra verificar todos os itens com a classe "colisores" como se fosse um "for of"
        colisores.forEach(function(colisor){
            verificador = colisaoDetectada(player, colisor)

            // por ocorrência de um bug onde o carinha ficava no meio do chão verticalmente (meio que o atravessando) vou fazer o seguinte sistema:
            if (verificador && onGround) {

                //o getcomputedstyle ele pega todas as informações style do elemento, e é isso B)

                const valorBottomPX = parseFloat((window.getComputedStyle(colisor)).bottom);
                const larguraJanela = window.innerWidth;

                // cálculo q eu achei na internet para calcular o valor em vw
                const valorBottomVW = (valorBottomPX / larguraJanela) * 100

                posY = valorBottomVW + 3.9

            }

        });

        // PARA OS INIMIGOS
        colisores.forEach(function(colisor){
            inimigos.forEach(function(inimigo){
                verificadorInimigo = colisaoDetectada(inimigo, colisor);

                if (verificadorInimigo) {

                    const valorBottomPX = parseFloat((window.getComputedStyle(colisor)).bottom);
                    const larguraJanela = window.innerWidth;

                    const valorBottomVW = (valorBottomPX / larguraJanela) * 100

                    inimigo.style.bottom = `${valorBottomVW + 3.9}vw`
                }
            });
        });

        movimentoCenario (velocidadeCenario)
        if (fase < 5 && velocidadeCenario < 0.15 || fase === 5 && velocidadeCenario < 0.25) {
            switch (fase) {
                case 1:
                    velocidadeCenario += 0.00005
                    break;
                case 2:
                    velocidadeCenario += 0.0001
                    break;
                case 3:
                    velocidadeCenario += 0.0002
                    break;
                case 4:
                    velocidadeCenario += 0.0003
                    break;
                case 5:
                    velocidadeCenario += 0.005
                    break;
            }
        }
        






        const colisorFinal = document.getElementById("colisorFinal")
        const colisorFinal2 = document.getElementById("colisorFinal2")
        const colisorFinal3 = document.getElementById("colisorFinal3")
        const colisorFinal4 = document.getElementById("colisorFinal4")
        const colisorFinal5 = document.getElementById("colisorFinal5")
        const mensagemFinal = document.getElementById("mensagemFinal")
        const nuvens = document.querySelectorAll(".nuvens");
        const dinheiroTotalText = document.getElementById("dinheiroTotalText")

        if (colisaoDetectada(player, colisorFinal) || colisaoDetectada(player, colisorFinal2) || colisaoDetectada(player, colisorFinal3) || colisaoDetectada(player, colisorFinal4) || colisaoDetectada(player, colisorFinal5)) {
            mensagemFinal.innerText = `Parabéns! Você passou da ${fase}ª fase`
            mensagemFinal.style.color = "lime"
            moedas.forEach(function(moeda){
                moeda.remove()
            })
            inimigos.forEach(function(inimigo){
                inimigo.remove()
            })
            inimigosAndantes.forEach(function(inimigo2){
                inimigo2.remove()
            })
            if (fase != -1) {
                qunatMoedasTotais += quantMoedas;
                quantMoedas = 0;
            }
            fase = -1;
            clearInterval(moedainterval)
            clearInterval(inimigointerval)
            clearInterval(intervalGame)
            carregarPosicoes()
            setTimeout(() => {
                posY = 25;
                posX = 10;
                mensagemFinal.innerText = ""
                vidas = nivelVida + 3;
                velocidadeCenario = 0.01;
                carregarFase();
                dinheiroTotalText.innerText = qunatMoedasTotais

                nuvens.forEach(function(nuvem){
                    nuvem.remove()
                })
            }, 5000);
        }
    }, 10); 

    moedainterval = setInterval(() => {
        cairMoedas()
    }, ((4000 - (fase * 100)) - (nivelJornada * 100)).toFixed(0));

    inimigointerval = setInterval(() => {
        cairInimigo()
    }, ((4000 - (fase * 100)) - (nivelJornada * 100)).toFixed(0));
}




    function colisaoDetectada(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();



        // verificar a colisão no geral, se ela não estiver ocorrendo a função simplesmente para com o return
        if (rect1.top >= rect2.bottom || rect1.bottom <= rect2.top || rect1.left >= rect2.right || rect1.right <= rect2.left) {
            return false;
        }


        // Após ter acontecido aluma colisão, 
        if (rect1.bottom > rect2.top && rect1.top < rect2.top) {
            colisaoBaixo = true;
            return true;
        }
        if (rect1.top < rect2.bottom && rect1.bottom > rect2.bottom) {
            colisaoCima = true;
            return false;
        }
        if (rect1.right > rect2.left && rect1.left < rect2.left) {
            colisaoDireita = true;
            return false;
        }
        if (rect1.left < rect2.right && rect1.right > rect2.right) {
            colisaoEsquerda = true;
            return false;
        }

        return false;
    }

    function colisaoDetectadaMoeda(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();



        // verificar a colisão no geral, se ela não estiver ocorrendo a função simplesmente para com o return
        if (rect1.top >= rect2.bottom || rect1.bottom <= rect2.top || rect1.left >= rect2.right || rect1.right <= rect2.left) {
            return false;
        } else {
            return true;
        }
    }

    document.addEventListener("keydown", (event) => {
        keysPressed[(event.key).toLocaleLowerCase()] = true;
    });

    document.addEventListener("keyup", (event) => {
        keysPressed[(event.key).toLocaleLowerCase()] = false;
    });


    document.addEventListener("click", (event) => {
        // essa seguinte condição de "liberarTeleport" somente libera um teleporte a cada vez que o jogador se encontra no ar
        if (!colisaoBaixo && liberarTeleport) {
            const larguraJanela = window.innerWidth;
            const alturaJanela = window.innerHeight;

            // sempre que tu ver essa fórmula no código quer dizer uma transcrição de "px" para "vw"
            let clientXVW = (clientXGlobal / larguraJanela) * 100
            let clientYVW2 = (clientYGlobal / larguraJanela) * 100
            // 47 provavelmente é a altura total da página em vw, que daria na minha resolução uns 644px
            let clientYVW = 47 - clientYVW2

            //agora vamos fazer um sistema para limitar o valor do dash, pois se não o player ia conseguir teleportar de um lado da tela pro outro, o que nesse jogo é um problema
            let limite = 15 + (nivelDash * 7);
                if ((posX + limite) < clientXVW) {
                    clientXVW = posX + limite
                } else if ((posX - limite) > clientXVW) {
                    clientXVW = posX - limite
                }

                if ((posY + limite) < clientYVW) {
                    clientYVW = posY + limite
                } else if ((posY - limite) > clientYVW) {
                    clientYVW = posY - limite
                }
                
                seta.src = "Assets/seta-dash2.png"


            posX = clientXVW;
            posY = clientYVW;

            liberarTeleport = false
        }
    })

    let clientXGlobal = 0;
    let clientYGlobal = 0;
    // aqui é para pegar as posições X e Y do mouse em PX
    document.onmousemove = (evento) => {
        const {
            clientX,
            clientY
        } = event
        clientXGlobal = clientX;
        clientYGlobal = clientY;
    }






    function cairMoedas() {
        let tamanhoPagina = innerWidth;
        
        let numAleatorio = Math.floor(Math.random() * tamanhoPagina)
        let valorFinalVW = (numAleatorio / tamanhoPagina) * 100;
        const moeda = document.createElement('img');
        moeda.classList.add('moeda');

        moeda.src = "/Assets/MOEDA GIRANDO TRANSPARENTE.gif";
        moeda.alt = "moeda GIF";

        // aqui a gente coloca a moeda no "corpo do documento", sem isso, ela n apareceria
        document.body.appendChild(moeda)
        moeda.style.left = `${valorFinalVW}vw`;
        moeda.style.bottom = '60vw'
    }


    function cairInimigo() {
        let tamanhoPagina = innerWidth;
        
        let numAleatorio = Math.floor(Math.random() * tamanhoPagina)
        let valorFinalVW = (numAleatorio / tamanhoPagina) * 100;
        const inimigo = document.createElement('img');
        inimigo.classList.add('inimigo');
        inimigo.src = "/Assets/bizorro grande no meio transparente.gif"
        // aqui a gente coloca a inimigo no "corpo do documento", sem isso, ele n apareceria
        document.body.appendChild(inimigo)
        inimigo.style.left = `${valorFinalVW}vw`;
        inimigo.style.bottom = '60vw'
    }




    document.querySelector("body").addEventListener('mousemove', rotacionarSeta);

    function rotacionarSeta() {
        let x = (seta.getBoundingClientRect().left) + (seta.clientWidth / 2);
        let y = (seta.getBoundingClientRect().top) + (seta.clientHeight / 2);

        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 225;
        seta.style.transform = `rotate(${rot}deg)`
    }






    function atualizarVida(operacao) {
        let coracoes = document.querySelectorAll('.coracao');
        coracoes.forEach(function(coracao){
            coracao.remove();
        })
        vidas += operacao;
        if (vidas <= 0) {
            playerMorreu()
        }

        for (let i = 0; i < vidas; i++) {
            const imgVidas = document.createElement('img')
            imgVidas.src = "/Assets/coracao-vida.png"
            imgVidas.alt = "coração/vida"
            imgVidas.classList.add('coracao');
            document.getElementById('hud-coracao').appendChild(imgVidas)
        }
    }



    function movimentoCenario (velocidade) {
        const larguraJanela = innerWidth;
        const cenarios = document.querySelectorAll('.colisores')
            let valorXVW = 0;
            cenarios.forEach(function(cenario){
                if ((getComputedStyle(cenario).left).includes("vw")) {
                    valorXVW = (Number((getComputedStyle(cenario).left).replace('vw','')))
                } else {
                    let valorXPX = (Number((getComputedStyle(cenario).left).replace('px','')))
                    valorXVW = (valorXPX / larguraJanela) * 100
                }
                cenario.style.left = `${valorXVW - (velocidade / (nivelVelocidade + 1))}vw`
            });


            //movimentar player e inimigos quando o cenário se movimenta :B
            posX -= velocidade / (nivelVelocidade + 1);

            const inimigosAndantes = document.querySelectorAll(".inimigosAndantes");
            const nuvens = document.querySelectorAll(".nuvens");

            inimigosAndantes.forEach(function(inimigo2){
                let posXInimigo = Number((inimigo2.style.left).replace('vw',''));
                inimigo2.style.left = `${posXInimigo - (velocidade / (nivelVelocidade + 1))}vw`;
            })


            nuvens.forEach(function(nuvem){
                let nuvemVelocidade = Number((getComputedStyle(nuvem).width).replace('px',''));
                nuvemVelocidade = (nuvemVelocidade / larguraJanela) * 100
                
                if (Number((nuvem.style.left).replace('vw','')) < -50) {
                    nuvem.style.left = '110vw'
                }

                const posXNuvem = Number((nuvem.style.left).replace('vw',''));

                nuvem.style.left = `${posXNuvem - (nuvemVelocidade / 500)}vw`;

            })


                



    }





    function ElementoForaDaTela(el) {
        const rect = el.getBoundingClientRect();

        const estaForaDaTela = (rect.left > window.innerWidth + 80 || rect.right < -80) // vai armazenar true ou false dependendo do resultado

        return estaForaDaTela;
    }



    //valores recebidos 1 - booleano (mou dando? true ou false); 2 - quanto tempo de delay pro próximo dano? (milissegundos)

    function tomarDano (tomouDano, delay) {
        //aqui teremos um sistema de delay entre um dano e outro
        
        
        if (podeTomarDano) {
            if (tomouDano) {
                atualizarVida(-1)
            }

            podeTomarDano = false

            let myInterval = undefined;

            if (tomouDano) {
                player.style.opacity == '80%'
                myInterval = setInterval(() => {
                    if (player.style.opacity == '0.8') {
                        player.style.opacity = '50%'
                    } else {
                        player.style.opacity = '80%'
                    }
                }, delay/10);
            } else {
                player.style.opacity == '50%'
            }

            setTimeout(() => {
                podeTomarDano = true;
                player.style.opacity = '100%'
                clearInterval(myInterval)
            }, delay);
        }
    }







    function gerarNuvens(){
        let nuvem = document.createElement('img');
        nuvem.classList.add("nuvens")
        let nuvemWidth = Math.floor(Math.random() * 10) + 20
        let nuvemLeft = Math.floor(Math.random() * 150) - 10
        nuvem.style.width = `${nuvemWidth}vw`
        nuvem.style.bottom = `${nuvemWidth + 5}vw`
        nuvem.style.left = `${nuvemLeft}vw`
        nuvem.style.zIndex = nuvemWidth - 10
        nuvem.src = "/Assets/nuvem1.png"
        nuvem.alt = "nuvem"
        document.body.appendChild(nuvem)
    }




function carregarFase(){
    const fase1 = document.getElementById("fase1");
    const fase2 = document.getElementById("fase2");
    const fase3 = document.getElementById("fase3");
    const fase4 = document.getElementById("fase4");
    const fase5 = document.getElementById("fase5");
    const gameplay = document.getElementById("gameplay");
    const menu = document.getElementById("menu");
    const listaFases = document.getElementById("lista-fases");
    const powerUps = document.getElementById("powerUps")
    const voltarMenu = document.getElementById("voltarMenu");
    const dinheiroTotal = document.getElementById("dinheiroTotal");

    fase1.style.display = 'none';
    fase2.style.display = 'none';
    fase3.style.display = 'none';
    fase4.style.display = 'none';
    fase5.style.display = 'none';
    gameplay.style.display = 'none';
    menu.style.display = 'none';
    listaFases.style.display = 'none';
    powerUps.style.display = 'none';
    voltarMenu.style.display = 'none';
    dinheiroTotal.style.display = 'none';
    

    switch (fase) {
        case -2:
            powerUps.style.display = 'inline';
            voltarMenu.style.display = 'inline';
            dinheiroTotal.style.display = 'inline';
            break;
        case -1:
            listaFases.style.display = 'inline';
            voltarMenu.style.display = 'inline';
            dinheiroTotal.style.display = 'inline';
            break;
        case 0:
            menu.style.display = 'inline';
            dinheiroTotal.style.display = 'inline';
            break;
        case 1:
            fase1.style.display = 'inline';
            gameplay.style.display = 'inline';
            jogo()
            break;
        case 2:
            fase2.style.display = 'inline';
            gameplay.style.display = 'inline';
            jogo()
            break;
        case 3:
            fase3.style.display = 'inline';
            gameplay.style.display = 'inline';
            jogo()
            break;
        case 4:
            fase4.style.display = 'inline';
            gameplay.style.display = 'inline';
            jogo()
            break;
        case 5:
            fase5.style.display = 'inline';
            gameplay.style.display = 'inline';
            jogo()
            break;
    }
}






function salvarPosicoes() {
    let savePosition = []
    colisores.forEach(function(colisor){
        savePosition.push(colisor.style.left)
    })
    posicoesVelhas = savePosition

}


function carregarPosicoes(){
    colisores.forEach(function(colisor, i){
        colisor.style.left = posicoesVelhas[i]
    })
}




function playerMorreu() {
    const nuvens = document.querySelectorAll(".nuvens");
    const dinheiroTotalText = document.getElementById("dinheiroTotalText")
    const moedas = document.querySelectorAll('.moeda')
    const inimigos = document.querySelectorAll(".inimigo");
    const inimigosAndantes = document.querySelectorAll(".inimigosAndantes");
    if (fase != -1) {
        fase = -1;
        mensagemFinal.innerText = `VOCÊ MORREU...`
        mensagemFinal.style.color = "red"
        moedas.forEach(function(moeda){
        moeda.remove()
        })
        inimigos.forEach(function(inimigo){
            inimigo.remove()
        })
        inimigosAndantes.forEach(function(inimigo2){
            inimigo2.remove()
        })
        qunatMoedasTotais += quantMoedas;
        quantMoedas = 0;
        clearInterval(moedainterval)
        clearInterval(inimigointerval)
        clearInterval(intervalGame)
        carregarPosicoes()
        setTimeout(() => {     
            posY = 15;
            posX = 10;
            mensagemFinal.innerText = "";
            vidas = nivelVida + 3;
            velocidadeCenario = 0.01;
            carregarFase();
            dinheiroTotalText.innerText = qunatMoedasTotais;

            nuvens.forEach(function(nuvem){
                nuvem.remove();
            })
        }, 1000);
    }
}