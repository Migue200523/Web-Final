let nombresInput = document.getElementById('nombres');
let apellidosInput = document.getElementById('apellidos');
let telefonoInput = document.getElementById('movil');
let correoInput = document.getElementById('correo');
let formulario = document.getElementById('form');


function validarNombre(){
    let nombres = nombresInput.value;
    let nombresPattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(nombres.length >= 3 && nombresPattern.test(nombres)){
        nombresInput.classList.add('valido');
        nombresInput.classList.remove('invalido');
        document.getElementById('nombresError').textContent = ' ';
    } else {
        nombresInput.classList.add('invalido');
        nombresInput.classList.remove('valido');
        document.getElementById('nombresError').textContent = 'El nombre solo debe tener letras y tener al menos 3 letras.';
    }
};
function validarApellido(){
    let apellidos = apellidosInput.value;
    let apellidosPattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(apellidos.length >= 3 && apellidosPattern.test(apellidos)){
        apellidosInput.classList.add('valido');
        apellidosInput.classList.remove('invalido');
        document.getElementById('apellidosError').textContent = ''
    } else {
        apellidosInput.classList.add('invalido');
        apellidosInput.classList.remove('valido');
        document.getElementById('apellidosError').textContent = 'El apellido solo debe tener letras y tener al menos 3 letras.'
    }
};
function validarMovil(){
    let telefono = telefonoInput.value;
    let telefonoPattern = /^\d{9}$/;
    if (telefonoPattern.test(telefono)) {
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('movilError').textContent = ""
    } else {
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('movilError').textContent = 'El numero de movil debe tener solo 9 numeros.'
    }
};
function validarMail(){
    let correo = correoInput.value;
    let correoPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(correoPattern.test(correo)){
        correoInput.classList.add('valido');
        correoInput.classList.remove('invalido');
        document.getElementById('correoError').textContent = ''
    } else {
        correoInput.classList.add('invalido');
        correoInput.classList.remove('valido');
        document.getElementById('correoError').textContent = 'Ingrese un correo valido.'
    }
};

function resetformulario(){
    formulario.reset()
    nombresInput.classList.remove('valido')
    apellidosInput.classList.remove('valido')
    telefonoInput.classList.remove('valido')
    correoInput.classList.remove('valido')
}

nombresInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellido);
telefonoInput.addEventListener('input', validarMovil);
correoInput.addEventListener('input', validarMail);

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    validarNombre();
    validarApellido();
    validarMovil();
    validarMail();

    if(nombresInput.classList.contains('valido') && apellidosInput.classList.contains('valido') && telefonoInput.classList.contains('valido') && correoInput.classList.contains('valido')){
        alert('Formulario enviado correctamente.');
        resetformulario()
    } else {
        alert('Por favor! corregir los errores que tiene el formulario');
    }
});


//PRESUPUESTO - CALCULO

const opcion = document.getElementById('opciones');
const extras = document.querySelectorAll('.extra');
const descuento = document.getElementById('dias');

const subtotalElemento = document.getElementById('subtotal');
const totalElemento = document.getElementById('total');

function calcularTotal() {

    let subtotal = Number(opcion.value);

    extras.forEach(extra => {
        if (extra.checked) {
            subtotal += Number(extra.value);
        }
    });

    const porcentajeDescuento = Number(descuento.value) || 0;

    const total = subtotal - (subtotal * porcentajeDescuento / 100);

    subtotalElemento.textContent =
        subtotal.toFixed(2) + ' €';

    totalElemento.textContent =
        total.toFixed(2) + ' €';
}

opcion.addEventListener('change', calcularTotal);

extras.forEach(extra => {
    extra.addEventListener('change', calcularTotal);
});

descuento.addEventListener('input', calcularTotal);

calcularTotal();