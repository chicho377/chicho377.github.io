const sectionSeleccionarReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-seleccionar')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensaje = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let interValo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
} 

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

    //CLASE MOKEPON
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

    //ATAQUES MOKEPONES
    const HIPODOGE_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
    ]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'}
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya)

    //INICIAR JUEGO
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'  
    sectionSeleccionarReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepone" for="${mokepon.nombre}">
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

    //UNIRSE AL JUEGO
function unirseAlJuego() {
    fetch("http://192.168.100.201:8080/unirse")
    .then(function (res) {
        if (res.ok) {
            res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

    //SELECCION MASCOTA JUGADOR
function seleccionarMascotaJugador() {
        //sectionSeleccionarMascota.style.display = 'none'

        if (inputHipodoge.checked){
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id
        } else if (inputCapipepo.checked){
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
        } else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
        } else {
            alert("No has seleccionado tu mascota")
            return
        }

        sectionSeleccionarMascota.style.display = 'none'

        seleccionarMokepon(mascotaJugador)
        
        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
    }

    function seleccionarMokepon(mascotaJugador) {
        fetch(`http://192.168.100.201:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

    //EXTRAER ATAQUES
function extraerAtaques(mascotaJugador) {
        let ataques
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador == mokepones[i].nombre) {
                ataques = mokepones[i].ataques
            }
            
        }
        mostrarAtaques(ataques)
}

    //MOSTRAR ATAQUES
function mostrarAtaques(ataques) {
        ataques.forEach((ataque) => {
            ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque b-ataque">${ataque.nombre}</button>`

            contenedorAtaques.innerHTML += ataquesMokepon
        })

        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.b-ataque')
    }

    //SECUENCIA DE ATAQUE
function secuenciaAtaque() {
        botones.forEach((boton) => {
            boton.addEventListener('click', (e) =>{
                if (e.target.textContent === '🔥'){
                    ataqueJugador.push('Fuego')
                    console.log(ataqueJugador)
                    boton.style.background = '#645CAA'
                    boton.disabled = true
                } else if (e.target.textContent === '💧'){
                    ataqueJugador.push('Agua')
                    console.log(ataqueJugador)
                    boton.style.background = '#645CAA'
                    boton.disabled = true
                } else {
                    ataqueJugador.push('Tierra')
                    console.log(ataqueJugador)
                    boton.style.background = '#645CAA'
                    boton.disabled = true
                }
                if (ataqueJugador.length === 5) {
            enviarAtaques()
            }
        })
    })
}

    //ENVIAR ATAQUES
function enviarAtaques(){
    fetch(`http://192.168.100.201:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    interValo = setInterval(obtenerAtaques, 50)
}

    //OBTENER ATAQUES
function obtenerAtaques() {
    fetch(`http://192.168.100.201:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res) {
        if(res.ok) {
            res.json()
                .then(function({ ataques }) {
                    if(ataques.length === 5) { 
                        ataqueEnemigo = ataques
                        combate()
                }
            })
        }
    })
}

    //SELECCIONAR MASCOTA ENEMIGO
    function seleccionarMascotaEnemigo(){
        let mascotaAleatoria = aleatorio(0, mokepones.length -1)

        spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
        ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
        secuenciaAtaque()
    }

    //ATAQUE ENEMIGO
    function ataqueAleatorioEnemigo(){
        console.log('Ataque enemigo', ataquesMokeponEnemigo)
        let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
        if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
            ataqueEnemigo.push('Fuego')
        } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
            ataqueEnemigo.push('Agua')
        } else {
            ataqueEnemigo.push('Tierra')
        }
        console.log(ataqueEnemigo)
        iniciarPelea()
}

    //INICIAR PELEA
function iniciarPelea(){
        if (ataqueJugador.length === 5){
            combate()
        }
}

    //INDEX OPONENTES
function indexAmbosOponentes(jugador,enemigo){
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

    //COMBATE
function combate(){
    clearInterval(interValo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra'){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

    //REVISAR VIDAS
function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (vidasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicidades! GANASTE:)")
    } else {
        crearMensajeFinal("Lo siento! PERDISTE :(")
    }
} 

    //CREAR MENSAJE
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

    //CREAR MENSAJE FINAL
function crearMensajeFinal(resultadoFinal) {
    sectionMensaje.innerHTML = resultadoFinal

    sectionSeleccionarReiniciar.style.display = 'block'
}

    //REINICIAR
function reiniciarJuego(){
    location.reload()
}

    //ALEATORIO
function aleatorio(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)}

    //PINTAR
function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.clientHeight)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
        mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        mokeponesEnemigos.forEach(function (mokepon){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.201:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}

    //MOVER 
function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default: alert("Tecla incorrecta")
            break
    }
}

    //INICIAR MAPA
function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    interValo = setInterval(pintarCanvas, 50)

        window.addEventListener('keydown', sePresionoUnaTecla)
        window.addEventListener('keyup', detenerMovimiento)
}

    //OBTENER OBJETO MASCOTA
function obtenerObjetoMascota(){
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador == mokepones[i].nombre) {
                return mokepones[i]
            }
        }
    }

    //REVISAR COLISION
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo) {
        return
    }

    detenerMovimiento()
    clearInterval(interValo)
    console.log('Colision');

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)