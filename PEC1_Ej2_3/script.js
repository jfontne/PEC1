const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const moneda = document.getElementById('currency-one');
const pelis = [];
const preuPelis = [];

populateUI();


//posant un + davant convertim un string en un number 
var ticketPrice = +movieSelect.value;

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


    //Guardem els valors originals del desplegable de pelis
    for (let i = 0; i<=movieSelect.length-1; i++) {
        pelis.push(movieSelect.options[i].textContent);
        preuPelis.push(movieSelect.options[i].value);
    }
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
        fetch(uAPI)
            .then(res=>res.json())
            .then(data=>{
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
                }
            
            ticketPrice = +movieSelect.value;
            updateSelectedCount();
                
            })
            .catch(error=>{
                rate=0;
            });
    }
);

//Event de la tria de la peli
movieSelect.addEventListener('change', e => {
    //rateCalculate('USD',moneda.value);
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