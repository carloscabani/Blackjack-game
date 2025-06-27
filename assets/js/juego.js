
/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];

const tipos = ['C','D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
    console.log(carta);
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

const valor =  valorCarta(pedirCarta());
console.log({valor});













