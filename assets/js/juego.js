const miModulo = (() => {
    'use strict';
        
    let deck        = [];
    const tipos     = ['C','D', 'H', 'S'],
        especiales  = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias del html
    const btnPedir      = document.querySelector('#btnPedir'),
          btnDetener    = document.querySelector('#btnDetener'),
          btnNuevo      = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');
    
    //Se inicializa el juego
    const inicializarJuego = (numeroJugadores = 2) => {
        deck = crearDeck();
        
        puntosJugadores = [];
        for (let i = 0; i<numeroJugadores ; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = ''); 

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }
    //se crea un nueva baraja
    const crearDeck = () => {

        deck = [];
        for(let i = 2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i+tipo);
            }
        }

        for(let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp+tipo);
            }
        }
        //para desordenar el arreglo usamos underscore
        return _.shuffle(deck);
        
    }
    
    //Esta funcion permite tomar una carta
    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en la baraja'
        }
        return deck.pop();
    }
    
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return  ( isNaN(valor) ) ? 
                (valor === 'A') ? 11 : 10
                : valor*1 ;
    }

    //Turno 0: primero jugador y el ultimo será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos){
                alert('Nadie gana');
            }else if (puntosMinimos > 21){
                alert('Computadora gana!');
            }else if(puntosComputadora>21){
                alert('Jugador gana');
            }else{
                alert('Computadora gana');
            }
        
        }, 100);

    }
    
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length-1 );
        
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
        determinarGanador();
    }
    
    
    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador=  acumularPuntos(carta, 0);

        crearCarta(carta, 0);
    
        if(puntosJugador > 21){
            console.warn('Perdiste pipipi');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        
        }else if(puntosJugador === 21){
            alert('Ganaste manito!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });
    
    
    btnDetener.addEventListener('click', () =>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    
    });
    
    return {
        nuevoJuego : inicializarJuego
    };
})();

