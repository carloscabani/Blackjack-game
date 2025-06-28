 //patrón modulo


(() => {
    'use strict'
    
        
    let deck = [];
    const tipos = ['C','D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0, puntosComputadora = 0;
    
    //Referencias del html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const puntosHTML = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    
    //se crea un nueva baraja
    const crearDeck = () => {
    
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
        deck = _.shuffle(deck);
        console.log(deck);
        return deck;
        
    }
    
    crearDeck();
    
    //Esta funcion permite tomar una carta
    
    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en la baraja'
        }
        const carta = deck.pop();
        return carta;
    }
    
    
    //esta funcion captura el primer o dos primeros digitos
    //luego si no es un numero, entra al condicional
    //si es igual a A su valor es 11, caso contrario 10 (J,K,Q)
    //caso contrario como se recoge un string se *1 para dar con valor numerico
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) ? 
        (valor === 'A') ? 11 : 10
        : valor*1 ;
    }
    
    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText= puntosComputadora;
        
            //crear imagen <img class="carta" src="assets/cartas/10H.png"> 
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
        
            if(puntosMinimos > 21){
                break;
            
            }else if(puntosComputadora === 21){
                alert('Ganaste IA!');
                btnPedir.disabled = true;
            
            }
        
        
        
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
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
    
    
    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText= puntosJugador;
    
        //crear imagen <img class="carta" src="assets/cartas/10H.png"> 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);
    
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
        turnoComputadora(puntosJugador);
    
    });
    
    
    btnNuevo.addEventListener('click', () =>{
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosComputadora = 0;
        puntosJugador = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
    
        divCartasComputadora.innerHTML = '',
        divCartasJugador.innerHTML = '',
        btnDetener.disabled = false;
        btnPedir.disabled = false; 
    
    })
    
    
})();

