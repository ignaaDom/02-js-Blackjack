/*
 * 2C = Two of Clubs   (Tréboles)
 * 2H = Two of Hearts  (Corazones)
 * 2D = Two of Diamons (Diamantes)
 * 2S = Two of Sword   (Espadas)
*/

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//* Referencias del html
const botonPedir      = document.querySelector("#btnPedir");
const botonDetener    = document.querySelector('#btnDetener');
const botonNuevoJuego = document.querySelector('#btnNuevo');

const smalls = document.querySelectorAll('small');

const jugadorCartas     = document.querySelector('#jugador-cartas');
const computadoraCartas = document.querySelector('#computadora-cartas');

// * Esta funcion crea una nueva baraja
const crearDeck = () =>{
    for(let i = 2;i <= 10;i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    // console.log({deck});
    deck = _.shuffle(deck);

    return deck;
}
crearDeck();

//* Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
}

//* Esta funcion retorna el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);

    return (isNaN(valor)) ?
           (valor === 'A') ? 11 : 10
           : parseInt(valor);
}

//* Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora+= valorCarta(carta);

        smalls[1].innerHTML = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        computadoraCartas.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(()=>{
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana :(')
        } else if(puntosComputadora > 21){
            alert('Ganaste');
        }else if((puntosComputadora > puntosMinimos) || (puntosMinimos > 21)){
            alert('Ganó la computadora');
        }
    }, 100);
}

//* Eventos
botonPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    puntosJugador+= valorCarta(carta);

    smalls[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    jugadorCartas.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste');

        botonPedir.disabled = true;
        botonDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('21 - Ganaste');
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

botonDetener.addEventListener('click',()=>{
    botonPedir.disabled   = true;
    botonDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

botonNuevoJuego.addEventListener('click',()=>{
    puntosJugador = 0;
    puntosComputadora = 0;

    deck = [];
    crearDeck();

    smalls[0].innerHTML = '0';
    smalls[1].innerHTML = '0';

    jugadorCartas.innerHTML = "";
    computadoraCartas.innerHTML = "";

    botonPedir.disabled = false;
    botonDetener.disabled = false;
});