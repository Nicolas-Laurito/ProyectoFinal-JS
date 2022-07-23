//OBJETOS DE MEDICOS

class Medico {
  constructor(id, nombreApellido, especialidad, diasAtencion, turnosDisponibles) {
      this.id = id
      this.nombreApellido = nombreApellido
      this.especialidad = especialidad
      this.diasAtencion = diasAtencion
      this.turnosDisponibles = turnosDisponibles
  }
}

const medicosDisponibles = [] //creo un array donde guardo los medicos 

//creo los arrays con los turnos disponibles de cada medico
const medico1Disponible = ["05/07/22 a las 10 HS", "07/07/22 a las 10:45HS", "12/07/22 a las 14:30 HS"]
const medico2Disponible = ["04/07/22 a las 15 HS", "07/07/22 a las 18:45HS", "13/07/22 a las 17:30 HS"]
const medico3Disponible = ["08/07/22 a las 19:30 HS", "12/07/22 a las 20:30HS", "15/07/22 a las 20:15 HS"]
const medico4Disponible = ["06/07/22 a las 17:30 HS", "13/07/22 a las 16:45HS", "13/07/22 a las 19:30 HS"]
const medico5Disponible = ["06/07/22 a las 15;30 HS", "12/07/22 a las 15:45HS", "13/07/22 a las 17:15 HS"]
const medico6Disponible = ["05/07/22 a las 17 HS", "12/07/22 a las 18:15HS", "19/07/22 a las 20:30 HS"]


//Creo objetos a instancia del constructor Medico
const medico1 = new Medico(1, "JUAN GOMEZ", "PEDIATRIA", "Martes y Jueves de 10 a 15 Hs", medico1Disponible)
const medico2 = new Medico(2, "GASTON LOPEZ", "MEDICO CLINICO", "Lunes a Jueves de 15 a 19 Hs", medico2Disponible)
const medico3 = new Medico(3, "ANA GUTIERREZ", "DERMATOLOGIA", "Martes y Viernes de 18 a 21 Hs", medico3Disponible)
const medico4 = new Medico(4, "MARIANA DUARTE", "PEDIATRIA", "Lunes y Miercoles de 16 a 20 Hs", medico4Disponible)
const medico5 = new Medico(5, "GABRIELA MISTRAL", "TRAUMATOLOGIA", "Martes a Jueves de 15 a 20 Hs", medico5Disponible)
const medico6 = new Medico(6, "NICOLAS RODRIGUEZ", "ALERGISTA", "Martes de 17 a 21 Hs", medico6Disponible)

//Objetos que forman el array de medicosDisponibles
medicosDisponibles.push(medico1)
medicosDisponibles.push(medico2)
medicosDisponibles.push(medico3)
medicosDisponibles.push(medico4)
medicosDisponibles.push(medico5)
medicosDisponibles.push(medico6)

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


localStorage.setItem(`medicosDisponibles`, JSON.stringify(medicosDisponibles))  //CARGO LOS OBJETOS MEDICOS AL LOCALSTORAGE

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

    //VEO SI ESTA CREADO EL LOCALsTORAGE DE USUARIOS
    const usuarioNuevo = JSON.parse(localStorage.getItem(`usuariosRegistrados`)) ?? []
     
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
