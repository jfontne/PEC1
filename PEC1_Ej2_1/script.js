const monedaOrigen = document.getElementById("currency-one");
const monedaDesti = document.getElementById("currency-two");
const unitatsOrigen = document.getElementById("amount-one");
const totalDesti = document.getElementById("amount-two");
const equivalencia = document.getElementById("rate");
const intercanvi = document.getElementById("swap");
const urlAPI = document.getElementById("address");
const reset = document.getElementById("reset");

//Farem un fetch per llegir les dades de les diferents monedes

function calculate() {
    //recuperem les dades introduïdes
    let mOrigen;
    let mDesti;
    let uAPI;
    mOrigen = monedaOrigen.value;
    mDesti=monedaDesti.value;
    uAPI=urlAPI.value;
    
    //Comprobem que les unitats no siguien inferiors a 0
    if(unitatsOrigen.value<0){
        unitatsOrigen.value=0;
    }

    //Anem a recuperar les dades de l'API de monedes
    fetch(uAPI + '/' + mOrigen)
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

function fesIntercanvi() {
    let moneda1;
    let moneda2;
    moneda1 = monedaOrigen.value;
    moneda2 = monedaDesti.value;
    monedaOrigen.value = moneda2;
    monedaDesti.value = moneda1;
    calculate();
}

monedaOrigen.addEventListener('change',calculate);
monedaDesti.addEventListener('change',calculate);
unitatsOrigen.addEventListener('input',calculate);
intercanvi.addEventListener('click',fesIntercanvi);
reset.addEventListener('click',()=>{
    urlAPI.value='https://v6.exchangerate-api.com/v6/cb7945b00b699f1abb428696/latest';
});