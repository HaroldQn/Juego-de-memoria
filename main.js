// Inicializacion de variables
let targetasdestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiemporegresivoId = null;

//Apuntando a HTML
let mostarMovimientos = document.getElementById('movimientos');
let mostaraciertos = document.getElementById('aciertos');
let mostartiempo = document.getElementById('t-restante');

// Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
//console.log(numeros);

//Funciones
function bloqueartargetaIncompleta(){
    for (let i = 0; i < 16; i++){
        let targeta = document.getElementById(i);
        if (targeta.innerHTML === "") {
            targeta.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Cambiar el color de fondo de las tarjetas incompletas
            targeta.disabled = true; // Deshabilitar las tarjetas incompletas
        }
    }
}

function contartiempo(){
    tiemporegresivoId = setInterval(()=>{
        timer --;
        if(timer <= 0){
            clearInterval(tiemporegresivoId);
            mostartiempo.innerHTML = `Tiempo: 0 segundos`;
            bloqueartargeta();
            bloqueartargetaIncompleta(); // Llamar a la función para desactivar y cambiar el color de las tarjetas incompletas
        } else {
            mostartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        }
    },1000);
}

function bloqueartargeta(){
    for (let i = 0; i<=15; i++){
        let targetabloqueada = document.getElementById(i);
        targetabloqueada.innerHTML = numeros[i];
        targetabloqueada.disabled = true;
    }
}

//FUNCION PRINCIPAL
function destapar(id){

    if(temporizador == false){
        contartiempo();
        temporizador = true;
    }

    targetasdestapadas++;
    console.log(targetasdestapadas);

    if(targetasdestapadas == 1){
        //Mostar el primer numero
        targeta1 = document.getElementById(id);
        primerresultado = numeros[id]
        targeta1.innerHTML = primerresultado;

        //Desabilitar primer boton
        targeta1.disabled = true;
    }else if (targetasdestapadas ==2){
        //Mostrar segundo numero
        targeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        targeta2.innerHTML = segundoresultado;

        // Desabilitar boton
        targeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostarMovimientos.innerHTML = `Movimientos: ${Math.floor(movimientos)}`; // Asegurarse de mostrar el número entero de movimientos

        if(primerresultado  == segundoresultado){
            // Encerar contador targetas destapadas
            targetasdestapadas = 0;
            
            // Aumentar aciertos
            aciertos++;
            mostaraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiemporegresivoId);
                mostaraciertos.innerHTML = `Aciertos: ${aciertos} 🤑`
                mostartiempo.innerHTML = `FANTASTICO! 👑 Solo demoraste ${timerInicial - timer} segundos`
                mostarMovimientos.innerHTML = `Movimientos: ${Math.floor(movimientos)} 😎🤙`; // Asegurarse de mostrar el número entero de movimientos
            }
        
        }else{
            //Mostar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                targeta1.innerHTML = ' ';
                targeta2.innerHTML = ' ';
                targeta1.disabled = false;
                targeta2.disabled = false;
                targetasdestapadas = 0; 
            },800);
        }
    }

}
