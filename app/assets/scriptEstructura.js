const app = new (function () {
    this.tbodyEstructura = document.getElementById('tbodyEstructura');
    this.cargo = document.getElementById('cargo-estructura');
    this.seccion = document.getElementById('seccion-estructura');
    this.departamento = document.getElementById('departamento-estructura');
    this.area = document.getElementById('area-estructura');
    this.busqueda = document.getElementById('busqueda-estructura');
    this.busquedaTipo = document.getElementById('busqueda-tipo');
    this.paginacion = document.getElementById('paginacion');

    this.selectCargo = () => {
        var EditCargo = document.getElementById('editar-cargo-estructura');
        fetch("../controllers/selectCargo.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let cargo = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (EditCargo) {
                            var seleted = 'cargo-id-' + item.id_cargo == EditCargo.classList.item(0) ? 'selected' : '';
                            EditCargo.innerHTML += `
                                <option ${seleted} value="${item.id_cargo}">${cargo}</option>
                            `;
                        } else {
                            this.cargo.innerHTML += `
                                <option value="${item.id_cargo}">${cargo}</option>
                            `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectSeccion = () => {
        var editarSeccion = document.getElementById('editar-seccion-estructura');
        fetch("../controllers/selectSeccion.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let seccion = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (editarSeccion) {
                            var seleted = 'seccion-id-' + item.id_seccion == editarSeccion.classList.item(0) ? 'selected' : '';
                            editarSeccion.innerHTML += `
                                <option ${seleted} value="${item.id_seccion}">${seccion}</option>
                            `;
                        } else {
                            this.seccion.innerHTML += `
                                <option value="${item.id_seccion}">${seccion}</option>
                            `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectDepartamento = () => {
        var editarDepartamento = document.getElementById('editar-departamento-estructura');
        fetch("../controllers/selectDepartamento.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let departamento = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (editarDepartamento) {
                            var seleted = 'departamento-id-' + item.id_departamento == editarDepartamento.classList.item(0) ? 'selected' : '';
                            editarDepartamento.innerHTML += `
                            <option ${seleted} value="${item.id_departamento}">${departamento}</option>
                        `;
                        } else {
                            this.departamento.innerHTML += `
                            <option value="${item.id_departamento}">${departamento}</option>
                        `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectArea = () => {
        var editarArea = document.getElementById('editar-area-estructura');
        fetch("../controllers/selectArea.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    var detalleArea = 1;
                    var estadoArea = 2;
                    if (item[estadoArea] === 'activo') {
                        // Capitalizar letras minusculas
                        let area = item[detalleArea].toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (editarArea) {
                            var seleted = 'area-id-' + item.id_area == editarArea.classList.item(0) ? 'selected' : '';
                            editarArea.innerHTML += `
                            <option ${seleted} value="${item.id_area}">${area}</option>
                        `;
                        } else {
                            this.area.innerHTML += `
                            <option value="${item.id_area}">${area}</option>
                        `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.guardarEstructura = () => {
        var formEstructura = new FormData();
        formEstructura.append('cargo', this.cargo.value);
        formEstructura.append('seccion', this.seccion.value);
        formEstructura.append('departamento', this.departamento.value);
        formEstructura.append('area', this.area.value);
        fetch("../controllers/guardarEstructura.php", { method: "POST", body: formEstructura })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                alert('¡Estructura guardada con exito!');
                window.location.href = '../views/estructura.php';
            })
            .catch((error) => console.log(error));
    }
    this.listadoEstructura = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoEstructura.php?page=" + pagina)
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                for (let i = 0; i < item.length; i++) {
                    html += `
                        <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                            <td class="text-slate-700 pr-4">${item[i].id_estructura}</td>
                            <td class="capitalize pr-4 ${item[i].cargo_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].cargo_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].cargo_detalle}</td>
                            <td class="capitalize pr-4 ${item[i].seccion_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].seccion_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].seccion_detalle}</td>
                            <td class="capitalize pr-4 ${item[i].depa_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].depa_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].depa_detalle}</td>
                            <td class="capitalize pr-4 ${item[i].area_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].area_detalle}</td>
                            <td class="font-medium capitalize pr-4 ${item[i].estruc_estado == 'activo' ? 'text-green-600' : ''}${item[i].estruc_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].estruc_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].estruc_estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                <button onclick="app.editarEstructura(${item[i].id_estructura})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button onclick="app.eliminarEstructura(${item[i].id_estructura})" title="Anular" class="${item[i].estruc_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `;
                }
                this.tbodyEstructura.innerHTML = html;
                this.paginacionEstructura(pagina, totalPaginas, false);
            });
    }
    this.busquedaEstructura = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('tipo', this.busquedaTipo.value);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaEstructura.php", { method: "POST", body: formBusqueda })
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;
                let html = '';
                
                if ( item != '') {
                    for (let i = 0; i < item.length; i++) {
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                                <td class="text-slate-700 pr-4">${item[i].id_estructura}</td>
                                <td class="capitalize pr-4 ${item[i].cargo_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].cargo_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].cargo_detalle}</td>
                                <td class="capitalize pr-4 ${item[i].seccion_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].seccion_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].seccion_detalle}</td>
                                <td class="capitalize pr-4 ${item[i].depa_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].depa_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].depa_detalle}</td>
                                <td class="capitalize pr-4 ${item[i].area_detalle == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_detalle == 'anulado' ? 'text-red-600' : ''}">${item[i].area_detalle}</td>
                                <td class="font-medium capitalize pr-4 ${item[i].estruc_estado == 'activo' ? 'text-green-600' : ''}${item[i].estruc_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].estruc_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].estruc_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-14 w-fit ml-auto">
                                    <button onclick="app.editarEstructura(${item[i].id_estructura})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="app.eliminarEstructura(${item[i].id_estructura})" title="Anular" class="${item[i].estruc_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<p class="w-full my-5">No se encontró resultados.</p>';
                }

                this.tbodyEstructura.innerHTML = html;
                this.paginacionEstructura(pagina, totalPaginas, true);
            });
    }
    this.paginacionEstructura = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:app.listadoEstructura(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:app.listadoEstructura(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:app.busquedaEstructura(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:app.busquedaEstructura(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarEstructura = () => {
        var formEstructura = new FormData();
        var editarIdEstructura = document.getElementById('editar-id-estructura');
        var editarCargo = document.getElementById('editar-cargo-estructura');
        var editarSeccion = document.getElementById('editar-seccion-estructura');
        var editarDepartamento = document.getElementById('editar-departamento-estructura');
        var editarArea = document.getElementById('editar-area-estructura');
        var editarEstado = document.getElementById('editar-estado-estructura');
        formEstructura.append('id_estructura', editarIdEstructura.value);
        formEstructura.append('cargo', editarCargo.value);
        formEstructura.append('seccion', editarSeccion.value);
        formEstructura.append('departamento', editarDepartamento.value);
        formEstructura.append('area', editarArea.value);
        formEstructura.append('estado', editarEstado.value);
        fetch("../controllers/actualizarEstructura.php", { method: "POST", body: formEstructura })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                this.listadoEstructura();
                this.cerrarModalEstructura();
                this.busqueda.value = null;
            })
            .catch((error) => console.log(error));
    }
    this.editarEstructura = (id_estructura) => {
        var formEstructura = new FormData();
        formEstructura.append('id_estructura', id_estructura);
        fetch("../controllers/editarEstructura.php", { method: "POST", body: formEstructura })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalEstructura = document.getElementById('modal-estructura');
                modalEstructura.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="app.actualizarEstructura()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar estructura ID: ${data.id_estructura}</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                        <!-- ID -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-estructura" value="${data.id_estructura}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Cargo -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Cargo</label>
                                            <select id="editar-cargo-estructura" required class="cargo-id-${data.id_cargo_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Sección -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Sección</label>
                                            <select id="editar-seccion-estructura" required class="seccion-id-${data.id_seccion_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Departamento -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Departamento</label>
                                            <select id="editar-departamento-estructura" required class="departamento-id-${data.id_departamento_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Área -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Área</label>
                                            <select id="editar-area-estructura" required class="area-id-${data.id_area_fk} h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-estructura" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="app.cerrarModalEstructura()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectCargo();
                this.selectSeccion();
                this.selectDepartamento();
                this.selectArea();
            })
            .catch((error) => console.log(error));
    }
    this.eliminarEstructura = (id_estructura) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formEstructura = new FormData();
            formEstructura.append('id_estructura', id_estructura);
            fetch("../controllers/eliminarEstructura.php", { method: "POST", body: formEstructura })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, esta estructura está siendo usada!')
                    }
                    this.listadoEstructura();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalEstructura = () => {
        var modalEstructura = document.getElementById('modal-estructura');
        modalEstructura.innerHTML = '';
    }
});
app.listadoEstructura();
app.selectCargo();
app.selectSeccion();
app.selectDepartamento();
app.selectArea();