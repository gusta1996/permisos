const appContrato = new (function () {
    this.tbodyContrato = document.getElementById('tbodyContrato');
    this.detalle = document.getElementById('detalle-contrato');
    this.errorContrato = document.getElementById('error-contrato');
    this.tipo = document.getElementById('tipo-contrato');
    this.busqueda = document.getElementById('busqueda-contrato');
    this.paginacion = document.getElementById('paginacion');

    this.guardarContrato = () => {
        // Esconder mensaje de error al guardar cada vez
        this.errorContrato.classList.add('hidden');
        this.errorContrato.innerHTML = '';
        // Enviar formulario para la consulta
        var formContrato = new FormData();
        formContrato.append('detalle', this.detalle.value);
        formContrato.append('tipo', this.tipo.value);
        fetch("../controllers/guardarContrato.php", { method: "POST", body: formContrato })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Contrato guardado!', 'Se ha agregado un nuevo contrato.', 'guardar');
                    this.listadoContrato();
                    this.limpiarContrato();
                } else {
                    // Mostrar mensaje de error al guardar
                    this.errorContrato.classList.remove('hidden');
                    this.errorContrato.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.listadoContrato = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoContrato.php?page=" + pagina)
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
                            <td class="pr-4">${item[i].id_contrato}</td>
                            <td class="pr-4">${item[i].detalle}</td>
                            <td class="pr-4">${item[i].tipo}</td>
                            <td class="font-medium ${item[i].estado == 'activo' ? 'text-green-600' : ''}${item[i].estado == 'suspendido' ? 'text-amber-600' : ''}${item[i].estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                <button onclick="appContrato.editarContrato(${item[i].id_contrato})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button onclick="appContrato.eliminarContrato(${item[i].id_contrato})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
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

                this.tbodyContrato.innerHTML = html;
                this.paginacionContrato(pagina, totalPaginas, false);
            });
    }
    this.busquedaContrato = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaContrato.php", { method: "POST", body: formBusqueda })
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
                            <td class="pr-4">${item[i].id_contrato}</td>
                            <td class="pr-4">${item[i].detalle}</td>
                            <td class="pr-4">${item[i].tipo}</td>
                            <td class="font-medium ${item[i].estado == 'activo' ? 'text-green-600' : ''}${item[i].estado == 'suspendido' ? 'text-amber-600' : ''}${item[i].estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                <button onclick="appContrato.editarContrato(${item[i].id_contrato})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button onclick="appContrato.eliminarContrato(${item[i].id_contrato})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
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

                this.tbodyContrato.innerHTML = html;
                this.paginacionContrato(pagina, totalPaginas, true);
            });
    }
    this.paginacionContrato = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appContrato.listadoContrato(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appContrato.listadoContrato(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appContrato.busquedaContrato(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appContrato.busquedaContrato(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarContrato = () => {
        // Esconder mensaje de error al guardar cada vez
        var editarErrorContrato = document.getElementById('editar-error-contrato');
        editarErrorContrato.classList.add('hidden');
        editarErrorContrato.innerHTML = '';
        // Enviar formulario para la consulta
        var formContrato = new FormData();
        var editarId_Contrato = document.getElementById('editar-id-contrato');
        var editarDetalle = document.getElementById('editar-detalle-contrato');
        var editarTipo = document.getElementById('editar-tipo-contrato');
        var editarEstado = document.getElementById('editar-estado-contrato');
        formContrato.append('id_contrato', editarId_Contrato.value);
        formContrato.append('detalle', editarDetalle.value);
        formContrato.append('tipo', editarTipo.value);
        formContrato.append('estado', editarEstado.value);
        fetch("../controllers/actualizarContrato.php", { method: "POST", body: formContrato })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Contrato actualizado!', 'Se ha actualizado un contrato.', 'actualizar');
                    this.listadoContrato();
                    this.cerrarModalContrato();
                    this.busqueda.value = null;
                } else {
                    // Mostrar mensaje de error al guardar
                    editarErrorContrato.classList.remove('hidden');
                    editarErrorContrato.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.editarContrato = (id_contrato) => {
        var formContrato = new FormData();
        formContrato.append('id_contrato', id_contrato);
        fetch("../controllers/editarContrato.php", { method: "POST", body: formContrato })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalContrato = document.getElementById('modal-contrato');
                modalContrato.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="appContrato.actualizarContrato()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar contrato</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-contrato" value="${data.id_contrato}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Detalle -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Detalle:</label>
                                            <input type="text" id="editar-detalle-contrato" value="${data.detalle}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Tipo -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Tipo:</label>
                                            <input type="text" id="editar-tipo-contrato" value="${data.tipo}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-contrato" value="${data.estado}" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                        <!-- Mensaje error -->
                                        <div id="editar-error-contrato" class="hidden sm:col-span-6">
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appContrato.cerrarModalContrato()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
            })
            .catch((error) => console.log(error));
    }
    this.limpiarContrato = () => {
        this.detalle.value = '';
        this.tipo.value = '';
    }
    this.eliminarContrato = (id_contrato) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formContrato = new FormData();
            formContrato.append('id_contrato', id_contrato);
            fetch("../controllers/eliminarContrato.php", { method: "POST", body: formContrato })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, este contrato está siendo usado!');
                        return;
                    }
                    app.notificacion('¡Contrato eliminado!', 'Se ha eliminado un contrato.', 'eliminar');
                    this.listadoContrato();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalContrato = () => {
        var modalContrato = document.getElementById('modal-contrato');
        modalContrato.innerHTML = '';
    }
});
appContrato.listadoContrato();
