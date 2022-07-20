//OBJETOS DE USUARIOS
class Usuario {
    constructor(nombre, apellido, dni, telefono, mail, clave, turnosAgendados) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.telefono = telefono
        this.mail = mail
        this.clave = clave
        this.turnosAgendados = turnosAgendados //array

    }
}


const btnRegistro = document.getElementById(`btnRegistro`) //CONSULTO EL BOTON REGISTRARSE
const divContenido = document.getElementById(`divContenido`) //CONSULTO EL DIV DONDE VOY AGREGAR EL FORMULARIO DE REGISTRO


//BOTON REGISTRARSE
btnRegistro.addEventListener(`click`, () => { //EVENTO SOBRE EL BOTON REGISTRARSE, AGREGA UN FORMULARIO DE REGISTRO

    
  //AGREGO DINAMICAMENTE EL FORMULARIO DE REGISTRO
  divContenido.innerHTML = `                            
    <form class="row g-3 estiloForm container" id="formRegistro" >
    <div class="col-md-4">
      <label for="validationCustom01" class="form-label">Ingrese se Nombre</label>
      <input type="text" class="form-control" id="inputNombre" value="" required>
      
    </div>
    <div class="col-md-4">
      <label for="validationCustom02" class="form-label">Ingrese su Apellido</label>
      <input type="text" class="form-control" id="inputApellido" name="apellido" required>
   
    </div>
    <div class="col-md-4">
      <label for="validationCustomUsername" class="form-label">Ingrese su DNI</label>
      <input type="text" class="form-control" id="inputDNI"  pattern=".{7,}" required placeholder="Minimo 7 caracteres">
       
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustom03" class="form-label">Ingrese un telefono de contacto</label>
      <input type="text" class="form-control" id="inputContacto" pattern=".{6,}" required placeholder="Minimo 6 caracteres">
     
    </div>
    <div class="col-md-8">
        <label for="validationCustom03" class="form-label">Ingrese su Email</label>
        <input type="email" class="form-control" id="inputEmail" pattern=".{6,}" required placeholder="Minimo 6 caracteres">
       
    </div>
    <div class="col-md-6">
      <label for="validationCustom04" class="form-label">Ingrese su contraseña</label>
      <input type="password" class="form-control" id="inputClave" pattern=".{4,}" required placeholder="Minimo 4 caracteres">
  
    </div>
    
    <div class="col-12">
      <button class="btn btn-primary" id="btnRegistro" type="submit">Registrarse</button>
    </div>
  </form>
  <div class="mensajeRegistro"  id="mensaje2"></div>

    `
    let usuarioNuevo = [] //CREO UN ARRAY DONDE VOY A GUARDAR LOS USUARIOS QUE SE REGISTREN
    
    //VEO SI ESTA CREADO EL LOCALsTORAGE
    if (localStorage.getItem(`usuariosRegistrados`)) {
        usuarioNuevo = JSON.parse(localStorage.getItem(`usuariosRegistrados`)) 

    } else {
        localStorage.setItem(`usuariosRegistrados`, JSON.stringify(usuarioNuevo))
    }
    
    const formRegistro = document.getElementById(`formRegistro`) //CONSULTO EL FORMULARIO PARA LUEGO DARLE UN EVENTO

    formRegistro.addEventListener(`submit`, (event) => { //LE AGREGO UN EVENTO AL BOTON DEL FORMULARIO
        event.preventDefault()
        let nombre = document.getElementById(`inputNombre`).value
        let apellido = document.getElementById(`inputApellido`).value
        let dni = document.getElementById(`inputDNI`).value //DATOS QUe PIDO Y ALMACENOEN VARIABLES PARA LUEGO CARGAR COMO UN OBJETO EN EL ARRAY DE USUARIOS
        let contacto = document.getElementById(`inputContacto`).value
        let email = document.getElementById(`inputEmail`).value
        let clave = document.getElementById(`inputClave`).value

        const turnoAgendado = []
        const userNuevo = new Usuario(nombre, apellido, dni, contacto, email, clave, turnoAgendado) //cargo los datos que saco de los input a un nuevo objeto
        formRegistro.reset()
        usuarioNuevo.push(userNuevo) //cargo en el array definido antes al nuevo usuario

        localStorage.setItem(`usuariosRegistrados`, JSON.stringify(usuarioNuevo)) //Piso en el local storage el aray de usuarios ya actualizado con el nuevo usuario

        divContenido.innerHTML = `
        <p>Registro Exitoso</p>
       `
    })
})

//BOTON INICIO DE CESION

const btnInicio = document.getElementById(`btnInicio`) //CONSULTO EL BOTON INICIO DE CESION
const idUsuario = document.getElementById(`idUsuario`)
const idClave = document.getElementById(`idClave`)

btnInicio.addEventListener(`click`, () => { //LE APLICO UN EVENTO AL BOTON
    if (localStorage.getItem(`usuariosRegistrados`)) {
        usuarioNuevo = JSON.parse(localStorage.getItem(`usuariosRegistrados`)) //con esto veo si esta creado el localStorage lo guardo en una variable y sino lo creo
    } else {
      divContenido.innerHTML = `
      <p> No existe el usuario</p>
      `
      idUsuario.value = ""
      idClave.value = ""
    }

    let flag = usuarioNuevo.some(user => user.dni === idUsuario.value && idClave.value === user.clave)
    //guardo en una variable true o False que devuelve some del comparar lo que ingreso por teclado el usuario con lo archivado en el localStorage
    if (flag === true) {

        let usuarioActivo = idUsuario.value //guardo en una variable el usuario que ingreso
       
        localStorage.setItem(`usuarioActivo`, usuarioActivo) //lo guardo en el localStorage para luego consultarlo en el programa
      
        idUsuario.value = ""
        idClave.value = ""
        divContenido.innerHTML = `
        <p> Ingreso Exitoso</p>
        `
        setTimeout(function () {
            window.location = "programa.html" //cambia a otra ventana y le doy unos segundos de tiempo para que se vea el mensaje de ingreso
        }, 1500)

    } else {
        divContenido.innerHTML = `
       <p> Error de usuario y/o contraseña</p>
   `
        idUsuario.value = ""
        idClave.value = ""
    }
})
