# Formulario de registro de usuario
## Enunciado
Añadir nuevos campos para edad y url personal , sobre estos nuevos campos añadir la comprobación de que la edad es mayor o igual a cero e inferior a 999 y que la url personal es una url valida. Una url valida sigue el siguiente patrón, siendo únicamente obligatorio el dominio. (esquema://dominio/directorio/archivo) Si la URL es invalida se debe indicar al usuario porque motivo es invalida.

## A las funciones de comprobación de longitudes he añadido un nuevo parámetro 'required'.
He realizado las siguientes modificaciones, primero había pequeños errores de verificación, si los campos estaban vacios no decía que era obligatorio sinó que decia que fallaba la longitud.
~~~
//Anem a comprobar les longitud dels camps i si és obligatori
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
~~~

En este caso la función *checkRequired(inputArray)* ya no es necesaria.
## He añadido el campo *edad* en el formulario y la función para la comprobación

**HTML**
~~~
<div class="form-control">
    <label for="age">age</label>
    <input type="text" id="age" placeholder="Enter age">
    <small>Error message</small>
</div>      
~~~
**JS**
~~~
function checkAge(input, min, max, required){
    if(required && input.value.length==0){
        showError(input, `${nomCamp(input)} és obligatori`);
    } else{ 
        if(input.value>=min && input.value<=max){
            showSuccess(input);
        } else{
            showError(input,`${nomCamp(input)} entre ${min} i ${max} anys`);
        }
    }
}
~~~

## Creación del campo *personal URL* y la función que la comprueba
Aquí utilizamos un patron de comprobación de la URL y comprobamos que sea correcto.

**HTML**
~~~
<div class="form-control">
    <label for="personalURL">personal URL</label>
    <input type="text" id="personalURL" placeholder="Enter personal URL">
    <small>Error message</small>
</div>
~~~

**JS**
~~~
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
~~~
        