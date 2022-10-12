const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//posant un + davant convertim un string en un number 
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //Anem a copiar els seients seleccionats
    //farem un mapa mitjançant un array
    


    const selectSeatsCount = selectedSeats.length;
    count.innerText = selectSeatsCount;
    total.innerText = selectSeatsCount * ticketPrice;
}

//Event de la tria de la peli
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});


//Events del conainer
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }


});