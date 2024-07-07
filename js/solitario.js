/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes
let tapeteInicial    = document.getElementById("inicial");
let tapeteSobrantes  = document.getElementById("sobrantes");
let tapeteReceptor1  = document.getElementById("receptor1");
let tapeteReceptor2  = document.getElementById("receptor2");
let tapeteReceptor3  = document.getElementById("receptor3");
let tapeteReceptor4  = document.getElementById("receptor4");
let tapeteSubInicial = document.getElementById("subinicial");

// Mazos
let mazoInicial   = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];

// Contadores de cartas
let contInicial     = document.getElementById("contador_inicial");
let contSobrantes   = document.getElementById("contador_sobrantes");
let contReceptor1   = document.getElementById("contador_receptor1");
let contReceptor2   = document.getElementById("contador_receptor2");
let contReceptor3   = document.getElementById("contador_receptor3");
let contReceptor4   = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo  = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos 	 = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

//Variables root de CSS
let r = document.querySelector(':root');
let rs = getComputedStyle(r);

//Variables de control
let leaveControl = false;//Variable para controlar si se permite salir la carta del mazo
let tapeteControl = '';//Variable para controlar el tapete del cual sale la carta

//Variable de conteo
let conteoMovimientos = 0;

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

/** Funciones para modificar tamaño de cartas en tapetes sobrantes y receptores cuando se cambie el tamaño de la pantalla **/
window.addEventListener("resize", ModificarSize);
function ModificarSize() {
  if (mazoSobrantes.length > 0) {
    for (const element of mazoSobrantes) {
      element.style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (tapeteSobrantes.clientHeight - (tapeteSobrantes.clientHeight * 0.32)) + 'px; margin: auto;';
    }
  }
  if (mazoReceptor1.length > 0) {
    for (const element of mazoReceptor1) {
      element.style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (tapeteReceptor1.clientHeight - (tapeteReceptor1.clientHeight * 0.32)) + 'px; margin: auto;';
    }
  }
  if (mazoReceptor2.length > 0) {
    for (const element of mazoReceptor2) {
      element.style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (tapeteReceptor2.clientHeight - (tapeteReceptor2.clientHeight * 0.32)) + 'px; margin: auto;';
    }
  }
  if (mazoReceptor3.length > 0) {
    for (const element of mazoReceptor3) {
      element.style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (tapeteReceptor3.clientHeight - (tapeteReceptor3.clientHeight * 0.32)) + 'px; margin: auto;';
    }
  }
  if (mazoReceptor4.length > 0) {
    for (const element of mazoReceptor4) {
      element.style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (tapeteReceptor4.clientHeight - (tapeteReceptor4.clientHeight * 0.32)) + 'px; margin: auto;';
    }
  }
}

// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
function nivel1() {
  /** Modificar variable CSS de acuerdo al nivel **/
  $('#mesa').css("background-image", "url('imagenes/mesa_verde.png')");
  r.style.setProperty('--bordes-receptores', rs.getPropertyValue('--color-verdeoscuro'));
  r.style.setProperty('--resplandor-receptores', rs.getPropertyValue('--color-verdeoscuro'));

  //Se establece el nivel de acuerdo al numero de cartas en cada mazo
  numeros = [9, 10, 11, 12];

  // El juego arranca ya al cargar la página: no se espera a reiniciar
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  comenzarJuego();
}
function nivel2() {
  /** Modificar variable CSS de acuerdo al nivel **/
  $('#mesa').css("background-image", "url('imagenes/mesa_azul.png')");
  r.style.setProperty('--bordes-receptores', rs.getPropertyValue('--color-azuloscuro'));
  r.style.setProperty('--resplandor-receptores', rs.getPropertyValue('--color-azuloscuro'));

  //Se establece el nivel de acuerdo al numero de cartas en cada mazo
  numeros = [5, 6, 7, 8, 9, 10, 11, 12];

  // El juego arranca ya al cargar la página: no se espera a reiniciar
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  comenzarJuego();
}
function nivel3() {
  /** Modificar variable CSS de acuerdo al nivel **/
  $('#mesa').css("background-image", "url('imagenes/mesa_roja.png')");
  r.style.setProperty('--bordes-receptores', rs.getPropertyValue('--color-rojooscuro'));
  r.style.setProperty('--resplandor-receptores', rs.getPropertyValue('--color-rojooscuro'));

  //Se establece el nivel de acuerdo al numero de cartas en cada mazo
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // El juego arranca ya al cargar la página: no se espera a reiniciar
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  comenzarJuego();
}


// Desarrollo del comienzo de juego
function comenzarJuego() {
  /* Crear baraja, es decir crear el mazoInicial. Este será un array cuyos
  elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
  Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
  oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
  el path correcto en la URL asociada al atributo src de <img>). Una vez creado
  el elemento img, inclúyase como elemento del array mazoInicial.
  */

  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  document.getElementById('pantallaPrevia').className = 'hidden';
  EstadoInicial();
  let contArray = -1;
  for (const palo of palos) {
    for (const numero of numeros) {
      contArray++;
      mazoInicial[contArray] = new Image();
      mazoInicial[contArray].className = 'cartas';
      mazoInicial[contArray].setAttribute('data-palo', palo);
      mazoInicial[contArray].setAttribute('data-numero', numero);
      mazoInicial[contArray].src = 'imagenes/baraja/' + numero + '-' + palo + '.png';
    }
  }


  // Barajar y dejar mazoInicial en tapete inicial
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  barajar(mazoInicial);
  cargarTapeteInicial(mazoInicial);

  // Puesta a cero de contadores de mazos
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  ResetearConteoMazos();

  // Arrancar el conteo de tiempo
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  arrancarTiempo();

} // comenzarJuego

//Volver a estado inicial del juego
function EstadoInicial() {
  // Reiniciamos los mazos a vacíos.
  mazoInicial = [];
  mazoSobrantes = [];
  mazoReceptor1 = [];
  mazoReceptor2 = [];
  mazoReceptor3 = [];
  mazoReceptor4 = [];
  //Vaciamos los tapetes
  tapeteSubInicial.innerHTML = '';
  tapeteSobrantes.innerHTML = '<span id="contador_sobrantes" class="contador"></span>';
  tapeteReceptor1.innerHTML = '<span id="contador_receptor1" class="contador"></span>';
  tapeteReceptor2.innerHTML = '<span id="contador_receptor2" class="contador"></span>';
  tapeteReceptor3.innerHTML = '<span id="contador_receptor3" class="contador"></span>';
  tapeteReceptor4.innerHTML = '<span id="contador_receptor4" class="contador"></span>';
  conteoMovimientos = 0;
  //pausar contador
  pausarContador();
  contTiempo.innerHTML = '00:00:00';//reiniciar a cero
}

function ResetearConteoMazos() {
  //Volver a asignar a variables de tapetes reiniciados
  contSobrantes = document.getElementById("contador_sobrantes");
  contReceptor1 = document.getElementById("contador_receptor1");
  contReceptor2 = document.getElementById("contador_receptor2");
  contReceptor3 = document.getElementById("contador_receptor3");
  contReceptor4 = document.getElementById("contador_receptor4");
  //Reseteamos contadores a 0
  ContarMazos();
  contMovimientos.innerHTML = 0;
}

/**
  Se debe encargar de arrancar el temporizador: cada 1000 ms se
  debe ejecutar una función que a partir de la cuenta autoincrementada
  de los segundos (segundos totales) visualice el tiempo oportunamente con el
  format hh:mm:ss en el contador adecuado.

  Para descomponer los segundos en horas, minutos y segundos pueden emplearse
  las siguientes igualdades:

  segundos = truncar (   segundos_totales % (60)                 )
  minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
  horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

  donde % denota la operación módulo (resto de la división entre los operadores)

  Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
     00:02:14

  Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que
  evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
  el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
  a clearInterval en su caso.
*/

function arrancarTiempo(){
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  clearInterval(temporizador);
  let hms = function (){
    let seg = Math.trunc( segundos % 60 );
    let min = Math.trunc( (segundos % 3600) / 60 );
    let hor = Math.trunc( (segundos % 86400) / 3600 );
    let tiempo = ( (hor<10)? "0"+hor : ""+hor )
          + ":" + ( (min<10)? "0"+min : ""+min )
          + ":" + ( (seg<10)? "0"+seg : ""+seg );
    setContador(tiempo);
    segundos++;
  }
  segundos = 0;
  hms(); // Primera visualización 00:00:00
  temporizador = setInterval(hms, 1000);
} // arrancarTiempo


/**
  Si mazo es un array de elementos <img>, en esta rutina debe ser
  reordenado aleatoriamente. Al ser un array un objeto, se pasa
  por referencia, de modo que si se altera el orden de dicho array
  dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/
function barajar(mazo) {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  mazo.sort(() => Math.random() - 0.5);
} // barajar



/**
   En el elemento HTML que representa el tapete inicial (variable tapeteInicial)
  se deben añadir como hijos todos los elementos <img> del array mazo.
  Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
  coordenadas top y left, algun atributo de tipo data-...
  Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargarTapeteInicial(mazo) {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  let pos = 0;//<-- La distancia que van a recorrer las cartas en el tapete inicial. Solo aplicamos el desplazamiento horizontal para mantener el aspecto de mesa de casino en el juego.
  /** Nos aseguramos que el tapete subinicial esté limpio para que nos sirva al momento de rebarajar **/
  tapeteSubInicial.innerHTML = '';
  for (const i of mazo) {
    i.style = 'position: absolute; height: 100%; left: ' + pos + 'px';
    i.draggable = false;
    pos += paso;
    tapeteSubInicial.appendChild(i);
  }
  AsignarDragUltimaCarta(mazo);//<-- Asignar draggable al ultimo elemento del mazo

  /** Centrar mazo en tapete inicial **/
  $(document).ready(function() {
    let ancho = $(mazo[0]).width();
    let anchoCartas = ((mazo.length - 1) * paso) + ancho;
    tapeteSubInicial.style = 'position: absolute; top: 16%; bottom: 16%; left: 0; right: 0; display: flex; width: ' + anchoCartas + 'px; margin: auto;';
  });
  /** Nos aseguramos que el tapete sobrante esté limpio para que nos sirva al momento de rebarajar **/
  if (mazoSobrantes.length == 0) {
    tapeteSobrantes.innerHTML = '<span id="contador_sobrantes" class="contador"><b>0</b></span>';
    contSobrantes = document.getElementById("contador_sobrantes");
  }
} // cargarTapeteInicial

/** Asignar draggable al ultimo elemento del mazo **/
function AsignarDragUltimaCarta(mazo) {
  mazo[mazo.length - 1].className = 'puntero cartas';
  mazo[mazo.length - 1].draggable = true;
  mazo[mazo.length - 1].addEventListener('dragstart', e => {
    dragStart(e);
  });
  mazo[mazo.length - 1].addEventListener('dragend', e => {
    dragEnd(e);
  });
  mazo[mazo.length - 1].addEventListener('drag', e => {
    drag(e);
  });
}
/** Eliminar draggable al ultimo elemento del mazo **/
function EliminarDragUltimaCarta(mazo) {
  if (mazo.length >= 1) {
    mazo[mazo.length - 1].className = 'cartas';
    mazo[mazo.length - 1].draggable = false;
    mazo[mazo.length - 1].removeEventListener('dragstart', e => {
      dragStart(e);
    });
    mazo[mazo.length - 1].removeEventListener('dragend', e => {
      dragEnd(e);
    });
    mazo[mazo.length - 1].removeEventListener('drag', e => {
      drag(e);
    });
  }
}

/** Funciones para cartas **/
function dragStart(event) {
  /** Ocultar carta en mazo inicial durante el drag **/
  setTimeout(() => {
    event.target.classList.add('hidden');
  }, 0);

  tapeteControl = event.target.parentElement.id;
}
function dragEnd(event) {
  /** Volver a mostrar carta despues del drag **/
  event.target.classList.remove('hidden');
}


/** Funciones para receptores de cartas **/
function dragEnter(event) {
  event.preventDefault();
  let contenedor = event.target.parentElement;

  /** Evaluar carta permitida **/

  /** Evaluar si se ingresa dentro de una carta **/
  leaveControl = true;
  if (contenedor.id === tapeteSobrantes.id) {
    contenedor.classList.add('drag-over-sobrantes');
  } else if (contenedor.id === tapeteReceptor1.id || contenedor.id === tapeteReceptor2.id || contenedor.id === tapeteReceptor3.id || contenedor.id === tapeteReceptor4.id) {
    contenedor.classList.add('drag-over-receptores');
  } else {
    /** Evaluar cuando ingresa dentro de un recuadro **/
    contenedor = event.target;
    if (contenedor.id === tapeteSobrantes.id) {
      contenedor.classList.add('drag-over-sobrantes');
    } else {
      contenedor.classList.add('drag-over-receptores');
    }
    leaveControl = false;
  }
}
function dragLeave(event) {
  
  if (!leaveControl) {
    RemoverDrag(event.target);
  }
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  let contenedor = event.target;

  /** En caso de colocar la carta sobre otra, cambiar al elemento padre **/
  if (contenedor.id !== tapeteSobrantes.id && contenedor.id !== tapeteReceptor1.id && contenedor.id !== tapeteReceptor2.id && contenedor.id !== tapeteReceptor3.id && contenedor.id !== tapeteReceptor4.id) {
    contenedor = contenedor.parentElement;
  }

  RemoverDrag(contenedor);

  if (contenedor.id !== tapeteControl) {
    /** Reconocer tapete drop **/
    switch (contenedor.id) {
      case (tapeteSobrantes.id):
        ReconocerTapeteStart(contenedor, mazoSobrantes);
        break;
      case (tapeteReceptor1.id):
        ReconocerTapeteStart(contenedor, mazoReceptor1);
        EliminarDragUltimaCarta(mazoReceptor1);
        break;
      case (tapeteReceptor2.id):
        ReconocerTapeteStart(contenedor, mazoReceptor2);
        EliminarDragUltimaCarta(mazoReceptor2);
        break;
      case (tapeteReceptor3.id):
        ReconocerTapeteStart(contenedor, mazoReceptor3);
        EliminarDragUltimaCarta(mazoReceptor3);
        break;
      case (tapeteReceptor4.id):
        ReconocerTapeteStart(contenedor, mazoReceptor4);
        EliminarDragUltimaCarta(mazoReceptor4);
        break;
    }
  }
  //Evaluar si necesita rebarajar
  EvaluarRebarajar();
}

function RestriccionCarta(mazoRec, mazoEntr) {
  let permitido = true;
  if (mazoRec !== mazoSobrantes) {//Evaluar restriccion solo para los mazos inferiores
    let paloUltima = '';
    let paloEntrante = mazoEntr[mazoEntr.length - 1].getAttribute('data-palo');
    let numUltima = 0;
    let numEntrante = mazoEntr[mazoEntr.length - 1].getAttribute('data-numero');
    if (mazoRec.length == 0) {
      if (numEntrante < 12) {
        permitido = false;
      }
    } else {
      paloUltima = mazoRec[mazoRec.length - 1].getAttribute('data-palo');
      numUltima = mazoRec[mazoRec.length - 1].getAttribute('data-numero');
      if (numEntrante != (numUltima - 1)) {
        permitido = false;
      } else {
        permitido = VerificarPalos(paloUltima, paloEntrante);
      }
    }
  }
  return permitido;
}

function VerificarPalos(pUlt, pEntr) {
  /** naranjas: viu, cua - grises: hex, cir **/
  let verificacion = false;
  if ((pUlt === 'viu') || (pUlt === 'cua')) {
    if (pEntr === 'hex' || pEntr === 'cir') {
      verificacion = true;
    }
  } else if ((pUlt === 'hex') || (pUlt === 'cir')) {
    if (pEntr === 'viu' || pEntr === 'cua') {
      verificacion = true;
    }
  }
  return verificacion;
}

function EvaluarRebarajar() {
  if ((mazoInicial.length == 0) && (mazoSobrantes.length == 0)) {
    //Juego terminado
    pausarContador();
    let niv = 'Fácil';
    if (mazoReceptor1.length == 12) {niv = 'Difícil'}
    if (mazoReceptor1.length == 8) {niv = 'Medio'}
    Modal('JUEGO COMPLETADO', '<p>Tiempo transcurrido: ' + contTiempo.innerHTML + '</p><p>Total de movimientos: ' + conteoMovimientos + '</p><p>Nivel de juego: ' + niv + '</p>', 'Volver a jugar', 'Cerrar');
  } else if ((mazoInicial.length == 0) && (mazoSobrantes.length > 1)) {
    /**Evaluar si la carta superior del tapete sobrantes
     * se puede colocar en algun tapete receptor.
     **/
    if ((!RestriccionCarta(mazoReceptor1, mazoSobrantes)) && (!RestriccionCarta(mazoReceptor2, mazoSobrantes)) && (!RestriccionCarta(mazoReceptor3, mazoSobrantes)) && (!RestriccionCarta(mazoReceptor4, mazoSobrantes))) {
      mazoInicial = mazoSobrantes;
      mazoSobrantes = [];
      barajar(mazoInicial);
      cargarTapeteInicial(mazoInicial);
      ContarMazos();
    }
  }
}

function ReconocerTapeteStart(receptor, mazoRecep) {
  let altoContenedor = receptor.clientHeight;
  if (tapeteControl === tapeteSubInicial.id) { //Si la carta sale del mazo inicial
    if (RestriccionCarta(mazoRecep, mazoInicial)) {
      mazoInicial[mazoInicial.length - 1].style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (altoContenedor - (altoContenedor * 0.32)) + 'px; margin: auto;';
      receptor.appendChild(mazoInicial[mazoInicial.length - 1]);
      mazoRecep.push(mazoInicial[mazoInicial.length - 1]);
      mazoInicial.pop();
      if (mazoInicial.length >= 1) {
        AsignarDragUltimaCarta(mazoInicial);//<-- Asignar draggable al ultimo elemento del mazo
      }
      ContarMovimientos();
    }
  } else if (tapeteControl === tapeteSobrantes.id) { //Si la carta sale del mazo sobrantes
    if (RestriccionCarta(mazoRecep, mazoSobrantes)) {
      mazoSobrantes[mazoSobrantes.length - 1].style = 'position: absolute; top: 0px; bottom: 0px; left: 0; right: 0; height: ' + (altoContenedor - (altoContenedor * 0.32)) + 'px; margin: auto;';
      receptor.appendChild(mazoSobrantes[mazoSobrantes.length - 1]);
      mazoRecep.push(mazoSobrantes[mazoSobrantes.length - 1]);
      mazoSobrantes.pop();
      ContarMovimientos();
    }
  }
}

function ContarMovimientos() {
  contMovimientos.innerHTML = ++conteoMovimientos;
  ContarMazos();
}
function ContarMazos() {
  contInicial.innerHTML = mazoInicial.length;
  contSobrantes.innerHTML = mazoSobrantes.length;
  contReceptor1.innerHTML = mazoReceptor1.length;
  contReceptor2.innerHTML = mazoReceptor2.length;
  contReceptor3.innerHTML = mazoReceptor3.length;
  contReceptor4.innerHTML = mazoReceptor4.length;
}

function RemoverDrag(element) {
  if (element.id === tapeteSobrantes.id) {
    element.classList.remove('drag-over-sobrantes');
  } else {
    element.classList.remove('drag-over-receptores');
  }
}

function ReiniciarJuego() {
  if (((mazoSobrantes.length == 0) && (mazoReceptor1.length == 0) && (mazoReceptor2.length == 0) && (mazoReceptor3.length == 0) && (mazoReceptor4.length == 0)) || ((mazoSobrantes.length == 0) && (mazoInicial.length == 0))) {
    PantallaPrevia();
  } else {
    Modal('ATENCIÓN', 'Aún no termina su juego. ¿Desea reiniciarlo?', 'Confirmar', 'Cancelar');
  }
}

function confirmarReinicio() {
  document.getElementById('modal').innerHTML = '';
  $('#modal').modal('hide');
  PantallaPrevia();
}

function Modal(titulo, subtitulo, btnTxt, btnCnc) {
  document.getElementById('modal').innerHTML = '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle"><b>' + titulo + '</b></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p><b>' + subtitulo + '</b></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + btnCnc + '</button><button type="button" class="btn btn-primary" onclick="confirmarReinicio()"><b>' + btnTxt + '</b></button></div></div></div>';
  $('#modal').modal('show');
}

function PantallaPrevia() {
  EstadoInicial();
  document.getElementById('pantallaPrevia').className = 'pantalla_previa subcontainer';
}

/**
  Similar a las anteriores, pero ajustando la cuenta al
  valor especificado
*/
function setContador(valor) {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  contTiempo.innerHTML = valor;
} // setContador
function pausarContador() {
  clearInterval(temporizador);
}
