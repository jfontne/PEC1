const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');
const personalURL = document.getElementById('personalURL');

function showError(input,message) {
    const formControl=input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    
}

function showSuccess(input) {
    const formControl=input.parentElement;
    formControl.className = 'form-control success';
}


//Comprobem l'email
function checkEmail(input, required) {
    if(required && input.value.length==0){
        showError(input, `${nomCamp(input)} és obligatori`);
    } else{ 
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(input.value.trim())){
            showSuccess(input);
        } else{
            showError(input,'L\'email te un format incorrecte');
        }
    }
}
//Aquí comprobem que els camps estan omplerts
function checkRequired(inputArray){
    inputArray.forEach(input => {//buche each per recorre tot l'array
        if(input.value.trim()===''){
            showError(input,`${nomCamp(input)} és obligatori`);
        } else {
            showSuccess(input);
        }
    });
}

//Posem el nom del camp amb el format correcte
function nomCamp(input) {
    //La primera lletra la posarem en majúscules
    //charAt(pos) retona el caràcter d'aquella posició
    let primeraLletra; 
    primeraLletra=input.id.charAt(0).toUpperCase();
    
    //La resta del text en minúscules, amb slice començant des de la pos. 1 que es la segona
    let textRestant; 
    textRestant=input.id.slice(1);
    return primeraLletra + textRestant;
}

//Anem a comprobar les longitud dels camps
function checkLength(input, min, max, required) {
    if(required && input.value.length==0){
            showError(input, `${nomCamp(input)} és obligatori`);
    } else{   
            if(input.value.length < min){
                showError(input, `${nomCamp(input)} minim de ${min} caràcters.`);
            } else if(input.value.length > max){
                showError(input, `${nomCamp(input)} màxim de ${max} caràcters.`);
            } else {
                showSuccess(input);
            }
    }
}


function checkAge(input, min, max, required){
    if(required && input.value.length==0){
        showError(input, `${nomCamp(input)} és obligatori`);
    } else{ 
        if(input.value>=min && input.value<=max){
            showSuccess(input);
        } else{
            showError(input,`${nomCamp(input)} entre 0 i 999 anys`);
        }
    }
}

function checkURL(input, required) {
    var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
    if(required && input.value.length==0){
        showError(input, `${nomCamp(input)} és obligatori`);
    } else{ 
        if(!input.value.match(pattern)){
            showError(input,`${nomCamp(input)} és incorrecte`)
            } else {
                showSuccess(input);
            }
        }
    }        
function checkPasswordsMatch(input1, input2, required) {
    if(required && input1.value.length==0){
        showError(input1, `${nomCamp(input)} és obligatori`);
    } else{ 
    
        if(input1.value!==input2.value){
            showError(input2,'Les contrasenyes no coincideixen');
        } else{
            showSuccess(input1);
            showSuccess(input2);
        }
    }
}

//Events
form.addEventListener('submit',function(e){
    e.preventDefault();

    
    checkLength(username, 3, 15, true);
    checkLength(password, 6, 25, true);
    checkLength(password2, 6, 25, true);
    checkEmail(email, true);
    checkAge(age, 0, 999, true);
    checkURL(personalURL, true);
    checkPasswordsMatch(password, password2, true);
    //checkRequired([username, email, age, personalURL, password, password2]);
    
//PRIMERA VERSIÓ
/*    //Validar username
    if (username.value ===''){
        showError(username,'Username is required');
    }
    else{
        showSuccess(username);
    }

    //validar email
    if (email.value ===''){
        showError(email,'email is required');
    }
    else if (!isValidEmail(email.value)) {
        showError(email,'email is not valid');
        }
        else{
        showSuccess(email);
     }

    //validar password
    if (password.value ===''){
        showError(password,'password is required');
    }
    else{
        showSuccess(password);
    }

    //validar password2    
    if (password2.value ===''){
        showError(password2,'password2 is required');
    }
    else{
        showSuccess(password2);
    }
*/
});

