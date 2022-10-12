const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const moneda = document.getElementById('currency-one');

populateUI();

//posant un + davant convertim un string en un number 
let ticketPrice = +movieSelect.value;

//Guardem la peli seleccionada i el preu
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //Anem a copiar els seients seleccionats
    //farem un mapa mitjançant un array

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectSeatsCount = selectedSeats.length;
    count.innerText = selectSeatsCount;
    total.innerText = selectSeatsCount * ticketPrice;
}

//Consultem les dades desades localment
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

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
}

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

function calculate() {
    //recuperem les dades introduïdes
    let mOrigen;
    let mDesti;
    let uAPI;
    mOrigen = 'USD';
    mDesti=moneda.value;
    uAPI=`https://v6.exchangerate-api.com/v6/cb7945b00b699f1abb428696/latest/${mOrigen}` ;
    
    //Comprobem que les unitats no siguien inferiors a 0
    if(unitatsOrigen.value<0){
        unitatsOrigen.value=0;
    }

    //Anem a recuperar les dades de l'API de monedes
    fetch(uAPI)
        .then(res=>res.json())
        .then(data=>{
            let valor;
            valor=data.conversion_rates[mDesti];
            equivalencia.innerHTML=`1 ${mOrigen} = ${valor} ${mDesti}`
            totalDesti.value=(unitatsOrigen.value*valor).toFixed(2);
        })
        .catch(error=>{
            equivalencia.style.color='#FF0000';
            equivalencia.innerHTML=error;
        });
}



//entrades inicials i total
updateSelectedCount();