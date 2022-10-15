//Recuperem elements HTML per poder tractar-los
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const monedaTotal = document.getElementById('moneda');
const movieSelect = document.getElementById('movie');
const moneda = document.getElementById('currency-one');

//En aquestes arrays guardarem les dades inicials del desplegable de pelicules
const pelis = [];
const preuPelis = [];

//Recuperem dades desades al navegador per si actualitzem la pàgina
populateUI();


//posant un + davant convertim un string en un número 
var ticketPrice = +movieSelect.value;

//Guardem la peli seleccionada i el preu
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Guardem les dades de les monedes i el desplegable modificat amb la moneda triada
function guardarMoneda(indexMonedaTriada,pelis) {
    let opcions = [];
    let preus = [];
    let longitud = pelis.length;

    for (let i = 0; i < longitud; i++) {
        opcions.push(pelis.options[i].textContent);
        preus.push(pelis.options[i].value);
    }

    //Desem dades de la moneda triada i els arrays de les pelis i preus
    localStorage.setItem('indexMonedaTriada',indexMonedaTriada);
    localStorage.setItem('pelis',JSON.stringify(opcions));
    localStorage.setItem('preus',JSON.stringify(preus));
    //NOTA: localStorage només pot guardar strings, per poder guardar un
    //array ho hem de desar amb format JSON
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //Anem a copiar els seients seleccionats
    //farem un mapa mitjançant un array

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectSeatsCount = selectedSeats.length;

    //Actualitzem la frase inferior dels totals
    count.innerText = selectSeatsCount;
    monedaTotal.innerText = moneda.value;
    total.innerText = (selectSeatsCount * ticketPrice).toFixed(2);
}

//Consultem les dades desades localment
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    let p;

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex!==null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }


    //Guardem els valors originals i preus del desplegable de pelis
    for (let i = 0; i<=movieSelect.length-1; i++) {
        pelis.push(movieSelect.options[i].textContent);
        preuPelis.push(movieSelect.options[i].value);
    }

    //Recuperem les opcions de moneda i desplegable de pelis personalitzat
    const monedaTriada = localStorage.getItem('indexMonedaTriada');
    let opcions = [];
    let preus = [];
    
    //Recuperem les dades desades
    opcions = JSON.parse(localStorage.getItem('pelis'));
    preus = JSON.parse(localStorage.getItem('preus'));
    
    //Volquem les dades al desplegable de pelis
    if(opcions !== null){
    
        for (let i = 0; i < opcions.length; i++) {
            movieSelect.options[i].textContent = opcions[i];
            movieSelect.options[i].value = preus[i];
        }
    }

    //Tornem a posar la opció seleccionada anteriorment al desplegable moneda
    moneda.selectedIndex = monedaTriada;
}

//Event per el canvi de moneda
moneda.addEventListener('change', e =>{
        //recuperem les dades introduïdes
        let uAPI;
        let mOrigen;
        let mDesti;
        mOrigen='USD';
        mDesti=e.target.value;
        uAPI=`https://v6.exchangerate-api.com/v6/cb7945b00b699f1abb428696/latest/${mOrigen}`; 
        //Anem a recuperar les dades de l'API de monedes
        fetch(uAPI) //Connectem amb l'API per recuperar les dades dels ratios
            .then(res=>res.json()) //El resultat en JSON
            .then(data=>{ //Si es exitós data tindrà les dades de l'API
                let rate;
                let nouTextOption;
                let valorCanvi;
                rate=data.conversion_rates[mDesti];
                for (let i = 0; i <=pelis.length-1; i++) {
                    valorCanvi=+(preuPelis[i]*rate).toFixed(2);
                    nouTextOption=pelis[i].replace(preuPelis[i],valorCanvi);
                    nouTextOption=nouTextOption.replace('$', mDesti + ' ');
                    movieSelect.options[i].textContent = nouTextOption;
                    movieSelect.options[i].value = valorCanvi;
                    guardarMoneda(e.target.selectedIndex,movieSelect);    
                }
            
            ticketPrice = +movieSelect.value;
            updateSelectedCount();
                
            })
            .catch(error=>{//Si fetch falla anirem aquí
                rate=0;
            });
    }
);

//Event de la tria de la peli
movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
});


//Events del conainer
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }


});

//entrades inicials i total
updateSelectedCount();