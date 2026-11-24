const TOTAL_TARJETAS = 13; 
const EXTENSION = 'webp'; 

const tarjetaActiva = document.getElementById('tarjeta');
const tarjetaContainer = document.getElementById('tarjetaContainer');
const imagenOraculo = document.getElementById('imagenOraculo');
const btnBarajar = document.getElementById('btnBarajar');

let estaVolteada = false;
let estaAnimando = false;

function obtenerCartaAleatoria() {
  const numero = Math.floor(Math.random() * TOTAL_TARJETAS) + 1;
  return `imagenes/tarjeta-${numero}.${EXTENSION}`;
}

function barajarYSacar() {
  if (estaAnimando) return;
  estaAnimando = true;

  if (estaVolteada) {
    tarjetaActiva.classList.remove('volteada');
    estaVolteada = false;
    setTimeout(ejecutarDeslizamiento, 500);
  } else {
    ejecutarDeslizamiento();
  }
}

function ejecutarDeslizamiento() {
  tarjetaContainer.classList.add('animacion-deslizar-atras');

  setTimeout(() => {
    imagenOraculo.src = obtenerCartaAleatoria();
  }, 300);

  setTimeout(() => {
    tarjetaContainer.classList.remove('animacion-deslizar-atras');
    // Restablecemos el z-index superior para la siguiente interacción
    tarjetaContainer.style.zIndex = '10';
    estaAnimando = false;
  }, 600);
}

tarjetaActiva.addEventListener('click', () => {
  if (estaAnimando) return;

  if (!estaVolteada) {
    tarjetaActiva.classList.add('volteada');
    estaVolteada = true;
  } else {
    barajarYSacar();
  }
});

btnBarajar.addEventListener('click', barajarYSacar);

// Cargar la primera carta automáticamente al iniciar la página
imagenOraculo.src = obtenerCartaAleatoria();