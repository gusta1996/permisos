const appDepartamento = new (function () {
    this.tbodyDepartamento = document.getElementById('tbodyDepartamento');
    this.detalle = document.getElementById('detalle-departamento');
    this.area = document.getElementById('area-departamento');
    this.errorDepartamento = document.getElementById('error-departamento');
    this.busqueda = document.getElementById('busqueda-departamento');
    this.paginacion = document.getElementById('paginacion');

    this.guardarDepartamento = () => {
        // Esconder mensaje de error al guardar cada vez
        this.errorDepartamento.classList.add('hidden');
        this.errorDepartamento.innerHTML = '';
        // Enviar formulario para la consulta
        var formDepartamento = new FormData();
        formDepartamento.append('detalle', this.detalle.value);
        formDepartamento.append('area', this.area.value);
        fetch("../controllers/guardarDepartamento.php", { method: "POST", body: formDepartamento })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Departamento guardado!', 'Se ha agregado un nuevo departamento.', 'guardar');
                    this.listadoDepartamento();
                    this.limpiarDepartamento();
                } else {
                    // Mostrar mensaje de error al guardar
                    this.errorDepartamento.classList.remove('hidden');
                    this.errorDepartamento.innerHTML += '<p class="font-medium rounded-md p-4 bg-red-100">' + data + '</p>';
                }
            })
            .catch((error) => console.log(error));
    }
    this.selectArea = () => {
        var editarArea = document.getElementById('editar-area-departamento');
        fetch("../controllers/selectArea.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Imprimir las opciones
                    if (editarArea) {
                        var seleted = 'area-id-' + item.id_area == editarArea.classList.item(0) ? 'selected' : '';
                        editarArea.innerHTML += `
                        <option ${seleted} value="${item.id_area}">${item.detalle}</option>
                    `;
                    } else {
                        this.area.innerHTML += `
                        <option value="${item.id_area}">${item.detalle}</option>
                    `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.listadoDepartamento = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoDepartamento.php?page=" + pagina)
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
                                <td class="pr-4">${item[i].id_departamento}</td>
                                <td class="pr-4">${item[i].departamento_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].area_estado == 'activo' ? 'text-green-600' : ''}${item[i].area_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].area_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].departamento_estado == 'activo' ? 'text-green-600' : ''}${item[i].departamento_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].departamento_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].departamento_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appDepartamento.editarDepartamento(${item[i].id_departamento})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appDepartamento.eliminarDepartamento(${item[i].id_departamento})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<p class="w-full mt-5">No se encontró resultados.</p>';
                }

                this.tbodyDepartamento.innerHTML = html;
                this.paginacionDepartamento(pagina, totalPaginas, false);
            });
    }
    this.busquedaDepartamento = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaDepartamento.php", { method: "POST", body: formBusqueda })
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
                                <td class="pr-4">${item[i].id_departamento}</td>
                                <td class="pr-4">${item[i].departamento_detalle}</td>
                                <td class="pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].area_estado == 'activo' ? 'text-green-600' : ''}${item[i].area_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].area_detalle}
                                    </div>
                                </td>
                                <td class="font-medium capitalize ${item[i].departamento_estado == 'activo' ? 'text-green-600' : ''}${item[i].departamento_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].departamento_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].departamento_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appDepartamento.editarDepartamento(${item[i].id_departamento})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appDepartamento.eliminarDepartamento(${item[i].id_departamento})" title="Anular" class="${item[i].estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<p class="w-full mt-5">No se encontró resultados.</p>';
                }

                this.tbodyDepartamento.innerHTML = html;
                this.paginacionDepartamento(pagina, totalPaginas, true);
            });
    }
    this.paginacionDepartamento = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appDepartamento.listadoDepartamento(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appDepartamento.listadoDepartamento(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appDepartamento.busquedaDepartamento(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appDepartamento.busquedaDepartamento(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarDepartamento = () => {
        var formDepartamento = new FormData();
        var editarId_Departamento = document.getElementById('editar-id-departamento');
        var editarDetalle = document.getElementById('editar-detalle-departamento');
        var editarArea = document.getElementById('editar-area-departamento');
        var editarEstado = document.getElementById('editar-estado-departamento');
        formDepartamento.append('id_departamento', editarId_Departamento.value);
        formDepartamento.append('detalle', editarDetalle.value);
        formDepartamento.append('area', editarArea.value);
        formDepartamento.append('estado', editarEstado.value);
        fetch("../controllers/actualizarDepartamento.php", { method: "POST", body: formDepartamento })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                app.notificacion('¡Departamento actualizado!', 'Se ha actualizado un departamento.', 'actualizar');
                this.listadoDepartamento();
                this.cerrarModalDepartamento();
                this.busqueda.value = null;
            })
            .catch((error) => console.log(error));
    }
    this.editarDepartamento = (id_departamento) => {
        var formDepartamento = new FormData();
        formDepartamento.append('id_departamento', id_departamento);
        fetch("../controllers/editarDepartamento.php", { method: "POST", body: formDepartamento })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalDepartamento = document.getElementById('modal-departamento');
                modalDepartamento.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="appDepartamento.actualizarDepartamento()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar departamento</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-departamento" value="${data.id_departamento}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Departamento -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Departamento:</label>
                                            <input type="text" id="editar-detalle-departamento" value="${data.detalle}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Area -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Área</label>
                                            <select id="editar-area-departamento" required class="area-id-${data.id_area_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-departamento" value="${data.estado}" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appDepartamento.cerrarModalDepartamento()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectArea();
                // Jquery para trabajar con la biblioteca Select2
                $('#editar-area-departamento').select2();
                $('#editar-estado-departamento').select2();
                $('.select2').addClass('bg-white h-[38px] block !w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6');
            })
            .catch((error) => console.log(error));
    }
    this.eliminarDepartamento = (id_departamento) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formDepartamento = new FormData();
            formDepartamento.append('id_departamento', id_departamento);
            fetch("../controllers/eliminarDepartamento.php", { method: "POST", body: formDepartamento })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, este departamento está siendo usado!')
                    }
                    app.notificacion('¡Departamento eliminado!', 'Se ha eliminado un departamento.', 'eliminar');
                    this.listadoDepartamento();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.limpiarDepartamento = () => {
        // Jquery para trabajar con la biblioteca Select2
        // variables
        var selectArea = $('#area-departamento');
        // resetear opciones
        this.detalle.value = '';
        selectArea.empty().append('<option selected disabled>-- Selecciona --</option>');
    }
    this.cerrarModalDepartamento = () => {
        var modalDepartamento = document.getElementById('modal-departamento');
        modalDepartamento.innerHTML = '';
    }
});
appDepartamento.selectArea();
appDepartamento.listadoDepartamento();