const appUnidad = new (function () {
    this.tbodyUnidad = document.getElementById('tbodyUnidad');
    this.unidadSinNombre = document.getElementById('unidad-sin-nombre');
    this.detalle = document.getElementById('detalle-unidad');
    this.direccion = document.getElementById('direccion-unidad');
    this.errorUnidad = document.getElementById('error-unidad');
    this.busqueda = document.getElementById('busqueda-unidad');
    this.paginacion = document.getElementById('paginacion');

    this.checkboxUnidadSinNombre = () => {
        // comprueba el checkbox
        if (this.unidadSinNombre.checked == true) {
            // si el checkbox es esta activo, desabilita el input detalle
            this.detalle.setAttribute('disabled', false);
            // vacia el valor del input detalle
            this.detalle.value = '';

            /* JQUERY */
            let inputDetalle = $('#detalle-unidad');
            let selectDireccion = $('#direccion-unidad');
            // el texto del select se agrega al input
            inputDetalle.attr("placeholder", selectDireccion.find("option:selected").text());
            selectDireccion.on('select2:select', function (e) {
                inputDetalle.attr("placeholder", selectDireccion.find("option:selected").text());
                inputDetalle.val(selectDireccion.find("option:selected").text());
            });
        } else {
            // si el checkbox es esta desactivado, habilita el input detalle
            this.detalle.removeAttribute('disabled', true);
            // vacia el valor del input detalle
            this.detalle.value = '';
            this.detalle.placeholder = '';

            /* JQUERY */
            let inputDetalle = $('#detalle-unidad');
            let selectDireccion = $('#direccion-unidad');
            // vacia el valor del input detalle
            selectDireccion.on('select2:select', function (e) {
                inputDetalle.attr("placeholder", '');
                inputDetalle.val('');
            });
        }
    }
    this.guardarUnidad = () => {
        // Esconder mensaje de error al guardar cada vez
        this.errorUnidad.classList.add('hidden');
        this.errorUnidad.innerHTML = '';
        // Enviar formulario para la consulta
        var formUnidad = new FormData();
        formUnidad.append('detalle', this.detalle.value);
        formUnidad.append('direccion', this.direccion.value);
        fetch("../controllers/guardarUnidad.php", { method: "POST", body: formUnidad })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Unidad guardada!', 'Se ha agregado una nueva unidad.', 'guardar');
                    this.listadoUnidad();
                    this.limpiarUnidad();
                } else {
                    // Mostrar mensaje de error al guardar
                    this.errorUnidad.classList.remove('hidden');
                    this.errorUnidad.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.selectDireccion = () => {
        var editarDireccion = document.getElementById('editar-direccion-unidad');
        fetch("../controllers/selectDireccion.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Imprimir las opciones
                    if (editarDireccion) {
                        var seleted = 'direccion-id-' + item.id_direccion == editarDireccion.classList.item(0) ? 'selected' : '';
                        editarDireccion.innerHTML += `
                        <option ${seleted} value="${item.id_direccion}">${item.detalle}</option>
                    `;
                    } else {
                        this.direccion.innerHTML += `
                        <option value="${item.id_direccion}">${item.detalle}</option>
                    `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.listadoUnidad = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoUnidad.php?page=" + pagina)
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
                                <td class="pr-4">${item[i].id_unidad}</td>
                                <td class="pr-4">${item[i].unidad_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].direccion_estado == 'activo' ? 'text-green-600' : ''}${item[i].direccion_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].direccion_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].direccion_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].unidad_estado == 'activo' ? 'text-green-600' : ''}${item[i].unidad_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].unidad_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].unidad_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appUnidad.editarUnidad(${item[i].id_unidad})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appUnidad.eliminarUnidad(${item[i].id_unidad})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
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

                this.tbodyUnidad.innerHTML = html;
                this.paginacionUnidad(pagina, totalPaginas, false);
            });
    }
    this.busquedaUnidad = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaUnidad.php", { method: "POST", body: formBusqueda })
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
                                <td class="pr-4">${item[i].id_unidad}</td>
                                <td class="pr-4">${item[i].unidad_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].direccion_estado == 'activo' ? 'text-green-600' : ''}${item[i].direccion_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].direccion_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].direccion_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].unidad_estado == 'activo' ? 'text-green-600' : ''}${item[i].unidad_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].unidad_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].unidad_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appUnidad.editarUnidad(${item[i].id_unidad})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appUnidad.eliminarUnidad(${item[i].id_unidad})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
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

                this.tbodyUnidad.innerHTML = html;
                this.paginacionUnidad(pagina, totalPaginas, true);
            });
    }
    this.paginacionUnidad = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appUnidad.listadoUnidad(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appUnidad.listadoUnidad(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appUnidad.busquedaUnidad(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appUnidad.busquedaUnidad(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarUnidad = () => {
        // Esconder mensaje de error al guardar cada vez
        var editarErrorUnidad = document.getElementById('editar-error-unidad');
        editarErrorUnidad.classList.add('hidden');
        editarErrorUnidad.innerHTML = '';
        // Enviar formulario para la consulta
        var formUnidad = new FormData();
        var editarId_Unidad = document.getElementById('editar-id-unidad');
        var editarDetalle = document.getElementById('editar-detalle-unidad');
        var editarDireccion = document.getElementById('editar-direccion-unidad');
        var editarEstado = document.getElementById('editar-estado-unidad');
        formUnidad.append('id_unidad', editarId_Unidad.value);
        formUnidad.append('detalle', editarDetalle.value);
        formUnidad.append('direccion', editarDireccion.value);
        formUnidad.append('estado', editarEstado.value);
        fetch("../controllers/actualizarUnidad.php", { method: "POST", body: formUnidad })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Unidad actualizada!', 'Se ha actualizado una unidad.', 'actualizar');
                    this.listadoUnidad();
                    this.cerrarModalUnidad();
                    this.busqueda.value = null;
                } else {
                    // Mostrar mensaje de error al guardar
                    editarErrorUnidad.classList.remove('hidden');
                    editarErrorUnidad.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.editarUnidad = (id_unidad) => {
        var formUnidad = new FormData();
        formUnidad.append('id_unidad', id_unidad);
        fetch("../controllers/editarUnidad.php", { method: "POST", body: formUnidad })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalUnidad = document.getElementById('modal-unidad');
                modalUnidad.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="appUnidad.actualizarUnidad()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar unidad</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-unidad" value="${data.id_unidad}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Unidad -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Unidad:</label>
                                            <input type="text" id="editar-detalle-unidad" value="${data.detalle}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Direccion -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                            <select id="editar-direccion-unidad" required class="direccion-id-${data.id_direccion_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-unidad" value="${data.estado}" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                        <!-- Mensaje error -->
                                        <div id="editar-error-unidad" class="hidden sm:col-span-6">
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appUnidad.cerrarModalUnidad()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectDireccion();
                // Jquery para trabajar con la biblioteca Select2
                $('#editar-direccion-unidad').select2();
                $('#editar-estado-unidad').select2();
                $('.select2').addClass('bg-white h-[38px] block !w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6');
            })
            .catch((error) => console.log(error));
    }
    this.eliminarUnidad = (id_unidad) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formUnidad = new FormData();
            formUnidad.append('id_unidad', id_unidad);
            fetch("../controllers/eliminarUnidad.php", { method: "POST", body: formUnidad })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, este unidad está siendo usado!')
                    }
                    app.notificacion('¡Unidad eliminada!', 'Se ha eliminado una unidad.', 'eliminar');
                    this.listadoUnidad();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.limpiarUnidad = () => {
        // Jquery para trabajar con la biblioteca Select2
        // variables
        var selectDireccion = $('#direccion-unidad');
        // resetear opciones
        this.detalle.value = '';
        selectDireccion.val(null).trigger('change');
    }
    this.cerrarModalUnidad = () => {
        var modalUnidad = document.getElementById('modal-unidad');
        modalUnidad.innerHTML = '';
    }
});
appUnidad.selectDireccion();
appUnidad.listadoUnidad();