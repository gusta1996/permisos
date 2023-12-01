const appPermisosUsario = new (function () {
    this.permisosDeUsuario = document.getElementById('permisos-de-usuario'); 
    this.funcionario = document.getElementById('funcionario-permisos');
    this.verPermisos = document.getElementById('btn-ver-permisos');
    this.iconoCarga = document.getElementById('icono-carga');
    this.formEditarPermisos = document.getElementById('form-editar-permisos');
    this.rolUsuario = document.getElementById('rol-usuario');
    this.permisoModulos = document.getElementById('permiso-modulos');
    this.permisoActividades = document.getElementById('permiso-actividades');
    this.mensajeNoGuardado = document.getElementById('mensaje-no-guardado');
    this.btnRestaurarPermisos = document.getElementById('btn-restaurar-permisos');
    this.btnActualizarPermisos = document.getElementById('btn-actualizar-permisos');
    
    this.selectFuncionarios = () => {
        fetch("../controllers/selectFuncionarios.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    this.funcionario.innerHTML += `
                        <option value="${item.id_funcionario}">${item.apellidos} ${item.nombres}</option>
                    `;
                });
            })
            .catch((error) => console.log(error));
    }
    this.verPermisos = () => {
        // Vaciar todo para una nueva consulta
        this.formEditarPermisos.classList.add('hidden');
        this.rolUsuario.innerHTML = '';
        this.permisoModulos.innerHTML = '';
        this.permisoActividades.innerHTML = '';
        this.mensajeNoGuardado.innerHTML = '';
        // Mostrar icono de carga
        this.iconoCarga.classList.remove('hidden');
        this.iconoCarga.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
            </svg>
        `;
        // Cargar contenido: Rol, permisos(modulos y actividades)
        let id_funcionario = this.funcionario.value;
        appPermisosUsario.mostrarRol( id_funcionario );
        appPermisosUsario.mostrarModulos();
        // Efecto de carga 0.5 segundo
        setTimeout(function () {
            // Quitar icono de carga
            document.getElementById('icono-carga').classList.add('hidden');
            document.getElementById('icono-carga').innerHTML = '';
            // Mostrar contenido cargado
            document.getElementById('form-editar-permisos').classList.remove('hidden');
        }, 500);
        

        // Mostrar contenedor
/*
        let obtenerPermisos = new FormData();
        obtenerPermisos.append('id_funcionario', id_funcionario);
        fetch("../controllers/obtenerPermisos.php")
            .then((resultado) => resultado.json())
            .then((data) => {

                var checkbox = document.getElementById('modulo-3');
                checkbox.click();

            })
            .catch((error) => console.log(error)); */
    }
    this.mostrarRol = (id_funcionario) => {
        this.rolUsuario.innerHTML = '';
        let formRol = new FormData();
        formRol.append('id_funcionario', id_funcionario);
        fetch("../controllers/mostrarRol.php", { method: "POST", body: formRol })
            .then((resultado) => resultado.json())
            .then((data) => {
               this.rolUsuario.innerHTML = data.rol;
            })
            .catch((error) => console.log(error));
    }
    this.mostrarActividades = (id_modulo) => {
        let permiso = new FormData();
        permiso.append('id_modulo', id_modulo);
        fetch("../controllers/mostrarActividades.php", { method: "POST", body: permiso })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                data.forEach(item => {
                    var cajaActividadID = document.getElementById('modulo-id-' + id_modulo);
                    cajaActividadID.classList.remove('hidden');
                    cajaActividadID.innerHTML += `
                        <div class="flex items-center mt-2">
                            <input type="checkbox" id="actividad-${item.id_actividad}" name="permiso-actividad" value="${item.detalle_actividad}" class="mr-2">
                            <label for="actividad-${item.id_actividad}" class="cursor-pointer">${item.detalle_actividad}</label>
                        </div>
                    `;
                });
            })
            .catch((error) => console.log(error));
    }
    this.mostrarModulos = () => {
        this.permisoModulos.innerHTML = '';
        this.permisoActividades.innerHTML = '';
        fetch("../controllers/mostrarModulos.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'Activo') {
                        // Insertar checkbox
                        this.permisoModulos.innerHTML += `
                            <div class="flex items-center mt-2">
                                <input type="checkbox" id="modulo-${item.id_modulo}" name="permiso-modulo" value="${item.detalle}" class="mr-2">
                                <label for="modulo-${item.id_modulo}" class="cursor-pointer">${item.detalle}</label>
                            </div>
                        `;
                        this.permisoActividades.innerHTML += `
                            <div id="modulo-id-${item.id_modulo}" class="hidden mt-4">
                                <span class="block text-sm font-medium leading-6 text-gray-900">
                                    ${item.detalle}
                                </span>
                            </div>
                        `;
                        // Variables de los checkbox
                        var modulosSeleccionados = document.querySelectorAll('input[type="checkbox"][name="permiso-modulo"]');
                        // Chequear checkbox seleccionados
                        modulosSeleccionados.forEach((check) => {
                            check.addEventListener("change", function () {
                                var id_modulo = check.id.replace("modulo-", "");
                                if (check.checked) {
                                    // Mostrar actividades
                                    appPermisosUsario.mostrarActividades(id_modulo);
                                } else {
                                    // Borrar actividades (sin eliminar el contenedor o su titulo)
                                    var cajaActividadID = document.getElementById('modulo-id-' + id_modulo);
                                    var contenedorActividades = cajaActividadID.children;

                                    for (var i = contenedorActividades.length - 1; i > 0; i--) {
                                        cajaActividadID.removeChild(contenedorActividades[i]);
                                    }
                                    // Esconder contenedor
                                    cajaActividadID.classList.add('hidden');
                                }
                            });
                        });
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.guardarPermisos = () => {
        // obtener los checkbox de modulos
        let modulos = this.permisoModulos.querySelectorAll('input[type="checkbox"]');
        let formPermisos = new FormData();
        modulos.forEach(modulo => {
            console.log(modulo.id.replace('modulo-', '')+' es '+modulo.checked);
            formPermisos.append('');
        });
        // fetch("../controllers/guardarRolPermisos.php", { method: "POST", body: formPermisos })
    }
    this.actualizarFuncionarios = () => {
        var formFuncionario = new FormData();
        var editarId_funcionario = document.getElementById('editar-id-funcionarios');
        var editarNombres = document.getElementById('editar-nombres-funcionarios');
        var editarApellidos = document.getElementById('editar-apellidos-funcionarios');
        var editarCedula = document.getElementById('editar-cedula-funcionarios');
        var editarTelefono = document.getElementById('editar-telefono-funcionarios');
        var editarDireccion = document.getElementById('editar-direccion-funcionarios');
        var editarEmail = document.getElementById('editar-email-funcionarios');
        var editarEstado = document.getElementById('editar-estado-funcionarios');
        formFuncionario.append('id_funcionario', editarId_funcionario.value);
        formFuncionario.append('nombres', editarNombres.value);
        formFuncionario.append('apellidos', editarApellidos.value);
        formFuncionario.append('cedula', editarCedula.value);
        formFuncionario.append('telefono', editarTelefono.value);
        formFuncionario.append('direccion', editarDireccion.value);
        formFuncionario.append('email', editarEmail.value);
        formFuncionario.append('estado', editarEstado.value);
        fetch("../controllers/actualizarFuncionarios.php", { method: "POST", body: formFuncionario })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                alert('Funcionario actualizado con exito!');
                this.listadoFuncionarios();
                this.cerrarModalFuncionarios();
            })
            .catch((error) => console.log(error));
    }
    this.editarFuncionarios = (id_funcionario) => {
        var formFuncionarios = new FormData();
        formFuncionarios.append('id_funcionario', id_funcionario);
        fetch("../controllers/editarFuncionarios.php", { method: "POST", body: formFuncionarios })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalFuncionarios = document.getElementById('modal-funcionarios');
                modalFuncionarios.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <form action="javascript:void(0);" onsubmit="appFuncionarios.actualizarFuncionarios()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar funcionarios</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-funcionarios" value="${data.id_funcionario}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Nombres -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                                            <input type="text" id="editar-nombres-funcionarios" value="${data.nombres}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Apellidos -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Apellidos:</label>
                                            <input type="text" id="editar-apellidos-funcionarios" value="${data.apellidos}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Cédula -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Cédula:</label>
                                            <input type="tel" id="editar-cedula-funcionarios" required minlength="10" maxlength="10" value="${data.cedula}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Dirección -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                                            <input type="text" id="editar-direccion-funcionarios" value="${data.direccion}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Telefono -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Telefono:</label>
                                            <input type="tel" id="editar-telefono-funcionarios"  minlength="10" maxlength="10" value="${data.telefono}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Email -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                                            <input type="email" id="editar-email-funcionarios" value="${data.email}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-6">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-funcionarios" value="${data.estado}" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'Activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'Suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appFuncionarios.cerrarModalFuncionarios()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.listadoFuncionarios();
            })
            .catch((error) => console.log(error));
    }
    this.eliminarFuncionarios = (id_funcionario) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formFuncionarios = new FormData();
            formFuncionarios.append('id_funcionario', id_funcionario);
            fetch("../controllers/eliminarFuncionarios.php", { method: "POST", body: formFuncionarios })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado == 'Anulado') {
                        alert('¡Estructura anulada con éxito!');
                    } else {
                        alert('¡No se pudo anular, este funcionario tiene un cargo asignado!')
                    }
                    this.listadoFuncionarios();
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalRol = () => {
        var modalRol = document.getElementById('modal-rol');
        modalRol.innerHTML = '';
    }
});
appPermisosUsario.selectFuncionarios();
