var altura = 0
var largura = 0
var vidas = 1
var tempo = 20

var criaMosquitoTempo = 1500

//definition of the level of difficulty
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'facil') {
    criaMosquitoTempo = 1500
} else if (nivel === 'normal') {
    criaMosquitoTempo = 1000
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 750
}

//adjusting the background to the user's screen
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

//creates and shows stopwatch on the screen
var cronometro = setInterval(function() {
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

//assigns random position to the target
function posicaoRandomica() {

    //remove the previous mosquito, if any
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        //game over
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
        //decreases score
        document.getElementById('v' + vidas).src = "images/coracao_vazio.png"
        vidas++
        }
    }

    var positionX = Math.floor(Math.random() * largura) - 90
    var positionY = Math.floor(Math.random() * altura) - 90

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    console.log(positionX, positionY)

    //creates the html element for the mosquito
    var mosquito = document.createElement('img')
    mosquito.src = 'images/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

//assigns different sizes to the target
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }   
}

//assign different sides to the target
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}