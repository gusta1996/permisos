const appDireccion = new (function () {
    this.tbodyDireccion = document.getElementById('tbodyDireccion');
    this.detalle = document.getElementById('detalle-direccion');
    this.errorDireccion = document.getElementById('error-direccion');
    this.proceso = document.getElementById('proceso-direccion');
    this.busqueda = document.getElementById('busqueda-direccion');
    this.paginacion = document.getElementById('paginacion');

    this.guardarDireccion = () => {
        // Esconder mensaje de error al guardar cada vez
        this.errorDireccion.classList.add('hidden');
        this.errorDireccion.innerHTML = '';
        // Enviar formulario para la consulta
        var formDireccion = new FormData();
        formDireccion.append('detalle', this.detalle.value);
        formDireccion.append('proceso', this.proceso.value);
        fetch("../controllers/guardarDireccion.php", { method: "POST", body: formDireccion })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Dirección guardada!', 'Se ha agregado una nueva dirección.', 'guardar');
                    this.listadoDireccion();
                    this.limpiarDireccion();
                } else {
                    // Mostrar mensaje de error al guardar
                    this.errorDireccion.classList.remove('hidden');
                    this.errorDireccion.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.selectProceso = () => {
        var editarProceso = document.getElementById('editar-proceso-direccion');
        fetch("../controllers/selectProceso.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Imprimir las opciones
                    if (editarProceso) {
                        var seleted = 'proceso-id-' + item.id_proceso == editarProceso.classList.item(0) ? 'selected' : '';
                        editarProceso.innerHTML += `
                            <option ${seleted} value="${item.id_proceso}">${item.detalle}</option>
                        `;
                    } else {
                        this.proceso.innerHTML += `
                            <option value="${item.id_proceso}">${item.detalle}</option>
                        `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.listadoDireccion = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoDireccion.php?page=" + pagina)
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                if (item != '') {
                    for (let i = 0; i < item.length; i++) {
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">   
                                <td class="pr-4">${item[i].id_direccion}</td>
                                <td class="pr-4">${item[i].direccion_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].proceso_estado == 'activo' ? 'text-green-600' : ''}${item[i].proceso_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].proceso_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].proceso_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].direccion_estado == 'activo' ? 'text-green-600' : ''}${item[i].direccion_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].direccion_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].direccion_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appDireccion.editarDireccion(${item[i].id_direccion})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appDireccion.eliminarDireccion(${item[i].id_direccion})" title="Anular" class="${item[i].direccion_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
                }

                this.tbodyDireccion.innerHTML = html;
                this.paginacionDireccion(pagina, totalPaginas, false);
            });
    }
    this.busquedaDireccion = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaDireccion.php", { method: "POST", body: formBusqueda })
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                if (item != '') {
                    for (let i = 0; i < item.length; i++) {
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">   
                                <td class="pr-4">${item[i].id_direccion}</td>
                                <td class="pr-4">${item[i].direccion_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].proceso_estado == 'activo' ? 'text-green-600' : ''}${item[i].proceso_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].proceso_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].proceso_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].direccion_estado == 'activo' ? 'text-green-600' : ''}${item[i].direccion_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].direccion_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].direccion_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appDireccion.editarDireccion(${item[i].id_direccion})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appDireccion.eliminarDireccion(${item[i].id_direccion})" title="Anular" class="${item[i].direccion_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
                }

                this.tbodyDireccion.innerHTML = html;
                this.paginacionDireccion(pagina, totalPaginas, true);
            });
    }
    this.paginacionDireccion = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appDireccion.listadoDireccion(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
                `;
            }
            if (total_paginas > 1) {
                html += `
                    <div class="pagina-actual grow">
                        <p class="font-medium m-0 text-slate-700">Pagina <b>${pagina_actual}</b> de <b>${total_paginas}</b></p>
                    </div>
                `;
            }
            if (pagina_actual < total_paginas) {
                html += `
                    <a href="javascript:appDireccion.listadoDireccion(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appDireccion.busquedaDireccion(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
                `;
            }
            if (total_paginas > 1) {
                html += `
                    <div class="pagina-actual grow">
                        <p class="font-medium m-0 text-slate-700">Pagina <b>${pagina_actual}</b> de <b>${total_paginas}</b></p>
                    </div>
                `;
            }
            if (pagina_actual < total_paginas) {
                html += `
                    <a href="javascript:appDireccion.busquedaDireccion(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarDireccion = () => {
        // Esconder mensaje de error al guardar cada vez
        var editarErrorDireccion = document.getElementById('editar-error-direccion');
        editarErrorDireccion.classList.add('hidden');
        editarErrorDireccion.innerHTML = '';
        // Enviar formulario para la consulta
        var formDireccion = new FormData();
        var editarId_Direccion = document.getElementById('editar-id-direccion');
        var editarDetalle = document.getElementById('editar-detalle-direccion');
        var editarProceso = document.getElementById('editar-proceso-direccion');
        var editarEstado = document.getElementById('editar-estado-direccion');
        formDireccion.append('id_direccion', editarId_Direccion.value);
        formDireccion.append('detalle', editarDetalle.value);
        formDireccion.append('proceso', editarProceso.value);
        formDireccion.append('estado', editarEstado.value);
        fetch("../controllers/actualizarDireccion.php", { method: "POST", body: formDireccion })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Dirección actualizada!', 'Se ha actualizado una dirección.', 'actualizar');
                    this.listadoDireccion();
                    this.cerrarModalDireccion();
                    this.busqueda.value = null;
                } else {
                    // Mostrar mensaje de error al guardar
                    editarErrorDireccion.classList.remove('hidden');
                    editarErrorDireccion.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.editarDireccion = (id_direccion) => {
        var formDireccion = new FormData();
        formDireccion.append('id_direccion', id_direccion);
        fetch("../controllers/editarDireccion.php", { method: "POST", body: formDireccion })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalDireccion = document.getElementById('modal-direccion');
                modalDireccion.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="appDireccion.actualizarDireccion()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar direccion</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-direccion" value="${data.id_direccion}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Dirección -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                                            <input type="text" id="editar-detalle-direccion" value="${data.detalle}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Proceso -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Proceso:</label>
                                            <select id="editar-proceso-direccion" required class="proceso-id-${data.id_proceso_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-direccion" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                        <!-- Mensaje error -->
                                        <div id="editar-error-direccion" class="hidden sm:col-span-6">
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appDireccion.cerrarModalDireccion()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectProceso();
                // Jquery para trabajar con la biblioteca Select2
                $('#editar-proceso-direccion').select2();
                $('#editar-estado-direccion').select2();
                $('.select2').addClass('bg-white h-[38px] block !w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6');
            })
            .catch((error) => console.log(error));
    }
    this.eliminarDireccion = (id_direccion) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formDireccion = new FormData();
            formDireccion.append('id_direccion', id_direccion);
            fetch("../controllers/eliminarDireccion.php", { method: "POST", body: formDireccion })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, esta dirección está siendo usada!');
                        return;
                    }
                    app.notificacion('¡Dirección eliminada!', 'Se ha eliminado una dirección.', 'eliminar');
                    this.listadoDireccion();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.limpiarDireccion = () => {
        // Jquery para trabajar con la biblioteca Select2
        // variables
        var selectProceso = $('#proceso-direccion');
        // resetear opciones
        this.detalle.value = '';
        selectProceso.val(null).trigger('change');
    }
    this.cerrarModalDireccion = () => {
        var modalDireccion = document.getElementById('modal-direccion');
        modalDireccion.innerHTML = '';
    }
});
appDireccion.selectProceso();
appDireccion.listadoDireccion();