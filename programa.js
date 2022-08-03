//DEFINO EL OBJETO QUE IRA DENTRO DEL ARRAY TURNOS AGENDADOS DE CADA USUARIO, EN EL MISMO VOY A GUARDAR EL ID DEL MEDICO Y EL TURNO EN SI
class Turno {
  constructor(idMedico, turno) {
    this.idMedico = idMedico
    this.turno = turno
  }
}

const datosUsuario = document.getElementById(`datosUsuario`) //consulto el div donde voy a mostrar los datos del usuario activo
const usuarioActivo = localStorage.getItem(`usuarioActivo`) //traigo el dni del usuario que inicio cesion
const usuariosRegistrados = JSON.parse(localStorage.getItem(`usuariosRegistrados`))
const medicosDisponiblesStorage = JSON.parse(localStorage.getItem(`medicosDisponibles`)) ?? localStorage.setItem(`medicosDisponibles`,JSON.stringify(medicosDisponibles)) //CARGO LOS OBJETOS MEDICOS AL LOCALSTORAGE
let i, indice, valor, medico

//AGREGO LOS DATOS DEL USUARIO ACTIVO EN EL HEADER
usuariosRegistrados.forEach((user) => {
  if (user.dni === usuarioActivo) {
    datosUsuario.innerHTML = `
            <p>Bienvenido al sistema de turnos ${user.nombre} ${user.apellido}</p>
            `
  }
})

const btnReservar = document.getElementById(`btnReservar`)
const btnVer = document.getElementById(`btnVer`)
const btnCancelar = document.getElementById(`btnCancelar`)
const divPrograma = document.getElementById(`divPrograma`)

//BOTON RESERVAR TURNOS
btnReservar.addEventListener(`click`, () => {
  divPrograma.innerHTML = ``
  medicosDisponiblesStorage.sort(function (a, b) {
      if (a.especialidad > b.especialidad) {
        return 1
      } //ordeno por especialidad y de mayor a menor las cards
      if (a.especialidad < b.especialidad) {
        return -1
      }

      return 0
    })
    .forEach((medicos) => {
      //agrego las cards con los medicos disponibles
      divPrograma.innerHTML += `
                     <div class="card" id="cards${medicos.id}" style="width: 18rem; margin: 15px; box-shadow: 10px 10px 5px 5px rgba(0, 0, 255, 0.295) ">
                     <img src="./img/persona.jpg" class="card-img-top" alt="...">
                         <div class="card-body">                                     
                             <h4 class="card-title">${medicos.nombreApellido}</h4>
                             <h5>${medicos.especialidad}<h5>  
                             <p class="card-text">Dias de atencion ${medicos.diasAtencion}</p>
                            <button class="btn btn-primary" >Ver Turnos Disponibles</button>
                         </div>
                     </div>
                     `
    })
  medicosDisponiblesStorage.forEach((medicos) => {
    //una vez que selecciono una card pongo en pantalla la que seleccione + los turnos disponibles
    document.getElementById(`cards${medicos.id}`).lastElementChild.lastElementChild.lastElementChild.addEventListener(`click`,() => {
          divPrograma.innerHTML = `       
            <div class="card" id="cards${medicos.id}" style="width: 18rem; margin-left:400px; box-shadow: 10px 10px 5px 5px rgba(0, 0, 255, 0.295) ">
            <img src="./img/persona.jpg" class="card-img-top" alt="...">
            <div class="card-body">                                          
            <h4 class="card-title">${medicos.nombreApellido}</h4>
            <h5>${medicos.especialidad}<h5>  
            <p class="card-text">Dias de atencion ${medicos.diasAtencion}</p>
            </div>
            </div>
            `

          medicos.turnosDisponibles.forEach((turno, i) => {
            //muestro los turnos disponibles
                     
            divPrograma.innerHTML += `
                    <div id="btn${i}">  
                    <label> Reservar ${turno} </label>
                    <button  class="btn btn-primary estiloBot" >Reservar </button>
                    </div>
                    `
                          })

          
          medicos.turnosDisponibles.forEach((turno, i) => {
            document.getElementById(`btn${i}`).lastElementChild.addEventListener(`click`, () => {
                Swal.fire({
                  icon: "success",
                  title: "Turno Reservado con Exito"
                })

                divPrograma.innerHTML = ``
                let indice = i
              

                let turnoReser = medicos.turnosDisponibles[i]
                let idMedico = medicos.id //GUARDO EL ID DEL MEDICO DEL CUAL SE TOMO EL TURNO PARA LUEGO PODER DEVOLVERLE AL MISMO EN CASO DE CANCELAR
                let turnoReservado = new Turno(idMedico, turnoReser); //CREO UN OBJETO CON EL ID DEL MEDICO + EL TURNO PARA GUARDAR EN EL ARRAY DE TURNOS RESERVADOS DEL USUARIO
                
                usuariosRegistrados.forEach((usuarios, i) => {
                  if (usuarios.dni === usuarioActivo) {
                    valor = i
                    usuariosRegistrados[valor].turnosAgendados.push(turnoReservado) //guardo el turno en el array que esta dentro del objeto/usuario activo
                    console.log(usuariosRegistrados[valor].turnosAgendados)
                  }
                })
                console.log(medicos.turnosDisponibles[indice])
                medicos.turnosDisponibles.splice(indice, 1); //borro el turno disponible que ya fue tomado por el usuario
                localStorage.setItem(`usuariosRegistrados`,JSON.stringify(usuariosRegistrados)) //guardo en el localStorage
                localStorage.setItem(`medicosDisponibles`,JSON.stringify(medicosDisponiblesStorage)) //GUARDO EN EL LOCALSTORAGE LOS OBJETOS MEDICOS CON SUS TURNO DISPONIBLES ACTUALIZADOS
              })
          })
        }
      )
  })
})

//BOTON DE VER TURNOS
btnVer.addEventListener(`click`, () => {
  divPrograma.innerHTML = `Turnos Agendados`
  usuariosRegistrados.forEach((usuarios, index) => {
    if (usuarios.dni === usuarioActivo) {
      indice = index
      usuariosRegistrados[indice].turnosAgendados.forEach((turno) => {
        medicosDisponiblesStorage.forEach((medicos) => {
          if (turno.idMedico === medicos.id) {
            medico = `${medicos.nombreApellido}, ${medicos.especialidad} `
          }
        })
        divPrograma.innerHTML += `
                <p>Turnos con ${medico} el ${turno.turno}</p>
                `
      })
    }
  })
})

//BOTON CANCELAR TURNO
btnCancelar.addEventListener(`click`, () => {
  divPrograma.innerHTML = `Turnos a Cancelar`

  //TRAIGO EL TURNO GUARDADO EN EL ARRAY JUNTO AL ID DEL MEDICO CUYO TURNO SE RESERVO. PARA MOSTRAR EL NOMBRE DEL MEDICO, ESPECIALIDAD Y EL TURNO
  usuariosRegistrados.forEach((usuarios, index) => {
    if (usuarios.dni === usuarioActivo) {
      indice = index
      usuariosRegistrados[indice].turnosAgendados.forEach((turno, i) => {
        medicosDisponiblesStorage.forEach((medicos) => {
          if (turno.idMedico === medicos.id) {
            medico = `${medicos.nombreApellido}, ${medicos.especialidad} `
          }
        })

        //MUESTRO ESOS DATOS EN FORMA DE BOTON PARA CLICKEAR Y CANCELAR

        divPrograma.innerHTML += `
                    <div id="btnCancel${i}">
                    <lavel> ${medico}, ${turno.turno}</label>
                    <button class="btn btn-primary estiloBot" >Cancelar </button>
                    </div>
                    `
      })

      //UNA VEZ QUE APRETO CANCELA EL TURNO ELIMINANDOLO DEL ARRAY DEL TURNOS AGENDADOS DEL USUARIO Y DEVOLVIENDOLO AL ARRAY DE TURNO DISPONIBLES DEL MEDICO
      usuariosRegistrados[indice].turnosAgendados.forEach((turno, i) => {
        document.getElementById(`btnCancel${i}`).lastElementChild.addEventListener(`click`, () => {
            usuariosRegistrados[indice].turnosAgendados.splice(i, 1)

            medicosDisponiblesStorage.forEach((medicos, i) => {
              if (medicos.id === turno.idMedico) {
                let turnoAgregado = turno.turno
                medicosDisponiblesStorage[i].turnosDisponibles.push(turnoAgregado)
              }
            })

            //ACTUALIZO LOS DATOS EN EL LOCAL STORAGE
            localStorage.setItem(`usuariosRegistrados`,JSON.stringify(usuariosRegistrados))
            localStorage.setItem(`medicosDisponibles`,JSON.stringify(medicosDisponiblesStorage))

            //MUESTRO UN CARTEL DE QUE EL TURNO SE CANCELO
            Toastify({
              text: "Turno Cancelado",
              duration: 3000,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(-45deg, #dbeff1 0%, #0061ff 100%)",
                border: "solid 2px black",
              },
              onClick: function () {}, // Callback after click
            }).showToast()
            divPrograma.innerHTML = `
                       
                        `
          })
      })
    }
  })
})