const appSolicitud = new (function () {
    this.cuentaIdFuncionario = document.getElementById('cuenta-id-funcionario');
    this.tbodySolicitud = document.getElementById('tbodySolicitud');
    this.tablaCompleta = document.getElementById('tabla-completa');
    this.tablaSimple = document.getElementById('tabla-simple');
    this.funcionarioSolicitud = document.getElementById('select-id-funcionario-solicitud');
    this.CuentaIdfuncionarioSolicitud = document.getElementById('cuenta-id-funcionario-solicitud');
    this.fechaSalidaSolicitud = document.getElementById('fecha-salida-solicitud');
    this.fechaEntradaSolicitud = document.getElementById('fecha-entrada-solicitud');
    this.horaSalidaSolicitud = document.getElementById('hora-salida-solicitud');
    this.horaEntradaSolicitud = document.getElementById('hora-entrada-solicitud');
    this.observacionSolicitud = document.getElementById('observacion-solicitud');
    this.razonSolicitud = document.querySelectorAll('input[type="radio"][name="razon-solicitud"]');
    this.mensajeError = document.getElementById('mensaje-error');
    this.busqueda = document.getElementById('busqueda-solicitud');
    this.busquedaTipo = document.getElementById('busqueda-tipo');
    this.paginacion = document.getElementById('paginacion');

    this.listadoSolicitudCompleta = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoSolicitud.php?page=" + pagina)
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
                            <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                            <td class="text-slate-700 pr-4">${item[i].numero}</td>
                            <td class="text-slate-700 pr-4 capitalize leading-6">
                                <div>
                                    ${item[i].apellidos} ${item[i].nombres}
                                </div>
                                <div>
                                    CI: ${item[i].cedula}
                                </div>
                            </td>
                            <td class="text-slate-700 pr-4 capitalize">${item[i].razon}</td>
                            <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                            <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                <button onclick="appSolicitud.editarSolicitudCompleta(${item[i].id_funcionario_solicitud})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button onclick="appSolicitud.aprobarSolicitud(${item[i].id_funcionario_solicitud})" title="Aprobar" class="${item[i].fs_estado != 'pendiente' ? 'hidden ' : ''}btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg>
                                </button>
                                <button onclick="appSolicitud.eliminarSolicitud(${item[i].id_funcionario_solicitud})" title="Anular" class="${item[i].fs_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `;
                    }
                } else {
                    html += '<tr class="h-16"><td colspan="6">No se encontró resultados.</td></tr>';
                }

                this.tbodySolicitud.innerHTML = html;
                this.paginacionSolicitud(pagina, totalPaginas, false);
            });
    }
    this.listadoSolicitudSimple = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        var cuentaIdFuncionario = this.cuentaIdFuncionario.innerHTML;
        fetch("../controllers/listadoSolicitud.php?page=" + pagina + "&id=" + cuentaIdFuncionario)
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
                            <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                            <td class="text-slate-700 pr-4">${item[i].numero}</td>
                            <td class="text-slate-700 pr-4 capitalize">${item[i].razon}</td>
                            <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                            <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                ${(item[i].fs_estado == 'pendiente') ? `
                                    <button onclick="appSolicitud.editarSolicitudSimple(${item[i].id_funcionario_solicitud})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : `
                                    <button onclick="" title="No se puede editar" class="btn-editar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` }
                            </td>
                        </tr>
                    `;
                    }
                } else {
                    html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
                }
                this.tbodySolicitud.innerHTML = html;
                this.paginacionSolicitud(pagina, totalPaginas, false);
            });
    }
    this.busquedaSolicitud = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('tipo', this.busquedaTipo.value);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaSolicitud.php", { method: "POST", body: formBusqueda })
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;
                var listadoSolicitud = this.tablaCompleta ? 'editarSolicitudCompleta' : 'editarSolicitudSimple';

                let html = '';
                if (item != '') {
                    for (let i = 0; i < item.length; i++) {
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                                <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                                <td class="text-slate-700 pr-4">${item[i].numero}</td>
                                <td class="text-slate-700 pr-4 capitalize leading-6">
                                    <div>
                                        ${item[i].apellidos} ${item[i].nombres}
                                    </div>
                                    <div>
                                        CI: ${item[i].cedula}
                                    </div>
                                </td>
                                <td class="text-slate-700 pr-4 capitalize">${item[i].razon}</td>
                                <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                                <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="appSolicitud.${listadoSolicitud}(${item[i].id_funcionario_solicitud})" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="appSolicitud.aprobarSolicitud(${item[i].id_funcionario_solicitud})" class="${item[i].fs_estado != 'pendiente' ? 'hidden ' : ''}btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                    </button>
                                    <button onclick="appSolicitud.eliminarSolicitud(${item[i].id_funcionario_solicitud})" class="${item[i].fs_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<tr class="h-16"><td colspan="6">No se encontró resultados.</td></tr>';
                }

                this.tbodySolicitud.innerHTML = html;
                this.paginacionSolicitud(pagina, totalPaginas, true);
            });
    }
    this.paginacionSolicitud = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        var listadoSolicitud = this.tablaCompleta ? 'listadoSolicitudCompleta' : 'listadoSolicitudSimple';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appSolicitud.${listadoSolicitud}(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appSolicitud.${listadoSolicitud}(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appSolicitud.busquedaSolicitud(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appSolicitud.busquedaSolicitud(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.selectFuncionarioEstructura = () => {
        fetch("../controllers/selectFuncionarioEstructura.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Capitalizar letras minusculas
                    let nombres = item.nombres.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                    let apellidos = item.apellidos.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                    // Imprimir las opciones
                    this.funcionarioSolicitud.innerHTML += `
                        <option value="${item.id_funcionario_estructura}">${apellidos} ${nombres}</option>
                    `;
                });
            })
            .catch((error) => console.log(error));
    }
    this.idFuncionarioEstructura = () => {
        var formFE = new FormData();
        formFE.append('id_funcionario', this.cuentaIdFuncionario.innerHTML)
        fetch("../controllers/verFuncionarioEstructura.php", { method: "POST", body: formFE })
            .then((resultado) => resultado.json())
            .then((data) => {
                if (data['id_funcionario_estructura']) {
                    this.CuentaIdfuncionarioSolicitud.value = data['id_funcionario_estructura'];
                } else {
                    this.CuentaIdfuncionarioSolicitud.value = null;
                }
            })
            .catch((error) => console.log(error));
    }
    this.guardarSolicitud = () => {
        // obtener la id_funcionario_estructura
        if (this.funcionarioSolicitud) {
            // enviar el id_funcionario_estructura (para administrador y autorizador)
            this.idFuncionarioSolicitud = this.funcionarioSolicitud;

        } else if (this.CuentaIdfuncionarioSolicitud) {
            // comprobar que el usuario tiene un funcionario_estructura asignado
            if (this.CuentaIdfuncionarioSolicitud.value == '') {
                // Si el usuario no tiene id_funcionario_estructura mostrar mensaje y cancela la ejecucion
                this.mensajeError.innerHTML = '';
                // Mostrar mensaje
                this.mensajeError.classList.remove('hidden');
                this.mensajeError.innerHTML = `
                    <p class="font-medium rounded-md p-4 bg-red-100">Ustéd no tiene un cargo asignado, hable con el departamento de sistemas</p>
                `;
                return;
            } else {
                // Si el usuario tiene id_funcionario_estructura ...
                // enviar el id_funcionario_estructura (para usuario estandar)
                this.idFuncionarioSolicitud = this.CuentaIdfuncionarioSolicitud;
            }

        }
        // La fecha de salida debe ser anterior o igual a la fecha entrada
        if (this.fechaSalidaSolicitud.value > this.fechaEntradaSolicitud.value) {
            alert('¡La fecha de salida debe ser anterior o igual a la fecha entrada!');
            return;
        }
        var formSolicitud = new FormData();
        formSolicitud.append('id_funcionario_estructura', this.idFuncionarioSolicitud.value);
        formSolicitud.append('fechaSalida', this.fechaSalidaSolicitud.value);
        formSolicitud.append('fechaEntrada', this.fechaEntradaSolicitud.value);
        formSolicitud.append('horaSalida', this.horaSalidaSolicitud.value);
        formSolicitud.append('horaEntrada', this.horaEntradaSolicitud.value);
        formSolicitud.append('observacion', this.observacionSolicitud.value);
        this.razonSolicitud.forEach((razon) => {
            if (razon.checked) {
                formSolicitud.append('razon', razon.value);
            }
        });
        fetch("../controllers/guardarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                alert('¡Solicitud guardada con exito!');
                window.location.href = '../views/solicitud.php';
            })
            .catch((error) => console.log(error));
    }
    this.actualizarSolicitud = () => {
        var formSolicitud = new FormData();
        var idFuncionarioSolicitud = document.getElementById('editar-id-funcionario-solicitud');
        var idSolicitud = document.getElementById('editar-id-solicitud');
        var idTiempo = document.getElementById('editar-id-tiempo');
        var idRazon = document.getElementById('editar-id-razon');
        var fechaSalidaSolicitud = document.getElementById('editar-fecha-salida-solicitud');
        var fechaEntradaSolicitud = document.getElementById('editar-fecha-entrada-solicitud');
        var horaSalidaSolicitud = document.getElementById('editar-hora-salida-solicitud');
        var horaEntradaSolicitud = document.getElementById('editar-hora-entrada-solicitud');
        var razonSolicitud = document.getElementById('editar-razon-solicitud');
        var editarEstado = document.getElementById('editar-estado-solicitud');
        editarEstado = editarEstado ? editarEstado.value : '';
        var observacionSolicitud = document.getElementById('editar-observacion-solicitud');
        if (fechaSalidaSolicitud.value > fechaEntradaSolicitud.value) {
            alert('¡La fecha de salida debe ser anterior o igual a la fecha entrada!');
            return
        }
        formSolicitud.append('id_funcionario_solicitud', idFuncionarioSolicitud.value);
        formSolicitud.append('id_solicitud', idSolicitud.value);
        formSolicitud.append('id_tiempo', idTiempo.value);
        formSolicitud.append('id_razon', idRazon.value);
        formSolicitud.append('fecha_salida', fechaSalidaSolicitud.value);
        formSolicitud.append('fecha_entrada', fechaEntradaSolicitud.value);
        formSolicitud.append('hora_salida', horaSalidaSolicitud.value);
        formSolicitud.append('hora_entrada', horaEntradaSolicitud.value);
        formSolicitud.append('razon', razonSolicitud.value);
        formSolicitud.append('estado', editarEstado);
        formSolicitud.append('observacion', observacionSolicitud.value);
        fetch("../controllers/actualizarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (this.tablaCompleta) {
                    app.notificacion('¡Solicitud actualizada!', 'Se ha actualizado una solicitud.', 'actualizar');
                    this.listadoSolicitudCompleta();
                } else if (this.tablaSimple) {
                    app.notificacion('¡Solicitud actualizada!', 'Se ha actualizado tu solicitud.', 'actualizar');
                    this.listadoSolicitudSimple();
                }
                this.cerrarModalSolicitud();
                this.busqueda.value = null;
            })
            .catch((error) => console.log(error));
    }
    this.editarSolicitudCompleta = (id_funcionario_solicitud) => {
        var formSolicitud = new FormData();
        formSolicitud.append('id_funcionario_solicitud', id_funcionario_solicitud);
        fetch("../controllers/editarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalSolicitud = document.getElementById('modal-solicitud');
                modalSolicitud.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <form action="javascript:void(0);" onsubmit="appSolicitud.actualizarSolicitud()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar solicitud</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID funcionario_solicitud -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-funcionario-solicitud" value="${data.id_funcionario_solicitud}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID solicitud -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-solicitud" value="${data.id_solicitud}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID tiempo -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-tiempo" value="${data.id_tiempo}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID razon -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-razon" value="${data.id_razon}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Nombres Funcionario -->
                                        <div class="col-span-full">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                                            <div class="mt-2">
                                                <input type="text" disabled placeholder="${data.apellidos} ${data.nombres}" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Fecha de Salida -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de salida:</label>
                                            <div class="mt-2">
                                                <input type="date" id="editar-fecha-salida-solicitud" value="${data.fecha_salida}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Fecha de entrada -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de entrada:</label>
                                            <div class="mt-2">
                                                <input type="date" id="editar-fecha-entrada-solicitud" value="${data.fecha_entrada}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Hora de Salida -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Hora de salida:</label>
                                            <div class="mt-2">
                                                <input type="time" id="editar-hora-salida-solicitud" value="${data.hora_salida}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Hora de entrada -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Hora de entrada:</label>
                                            <div class="mt-2">
                                                <input type="time" id="editar-hora-entrada-solicitud" value="${data.hora_entrada}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Razón -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Razón:</label>
                                            <select id="editar-razon-solicitud" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.descripcion === 'particular' ? 'selected' : ''}>Particular</option>
                                                <option ${data.descripcion === 'calamidad domestica' ? 'selected' : ''}>Calamidad domestica</option>
                                                <option ${data.descripcion === 'enfermedad' ? 'selected' : ''}>Enfermedad</option>
                                                <option ${data.descripcion === 'otro' ? 'selected' : ''}>Otro</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-3">
                                            <label class="block catext-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-solicitud" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'aprobado' ? 'selected' : ''}>Aprobado</option>
                                                <option ${data.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                                            </select>
                                        </div>
                                        <!-- Observaciones -->
                                        <div class="col-span-full">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Observaciones:</label>
                                            <div class="mt-2">
                                                <textarea id="editar-observacion-solicitud" rows="3" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">${data.observacion}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appSolicitud.cerrarModalSolicitud()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
            })
            .catch((error) => console.log(error));
    }
    this.editarSolicitudSimple = (id_funcionario_solicitud) => {
        var formSolicitud = new FormData();
        formSolicitud.append('id_funcionario_solicitud', id_funcionario_solicitud);
        fetch("../controllers/editarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalSolicitud = document.getElementById('modal-solicitud');
                modalSolicitud.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <form action="javascript:void(0);" onsubmit="appSolicitud.actualizarSolicitud()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar solicitud</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID funcionario_solicitud -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-funcionario-solicitud" value="${data.id_funcionario_solicitud}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID solicitud -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-solicitud" value="${data.id_solicitud}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID tiempo -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-tiempo" value="${data.id_tiempo}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- ID razon -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-razon" value="${data.id_razon}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Fecha de Salida -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de salida:</label>
                                            <div class="mt-2">
                                                <input type="date" id="editar-fecha-salida-solicitud" value="${data.fecha_salida}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Fecha de entrada -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de entrada:</label>
                                            <div class="mt-2">
                                                <input type="date" id="editar-fecha-entrada-solicitud" value="${data.fecha_entrada}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Hora de Salida -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Hora de salida:</label>
                                            <div class="mt-2">
                                                <input type="time" id="editar-hora-salida-solicitud" value="${data.hora_salida}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Hora de entrada -->
                                        <div class="sm:col-span-3">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Hora de entrada:</label>
                                            <div class="mt-2">
                                                <input type="time" id="editar-hora-entrada-solicitud" value="${data.hora_entrada}" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                            </div>
                                        </div>
                                        <!-- Razón -->
                                        <div class="sm:col-span-6">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Razón:</label>
                                            <select id="editar-razon-solicitud" required class="h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.descripcion === 'particular' ? 'selected' : ''}>Particular</option>
                                                <option ${data.descripcion === 'calamidad domestica' ? 'selected' : ''}>Calamidad domestica</option>
                                                <option ${data.descripcion === 'enfermedad' ? 'selected' : ''}>Enfermedad</option>
                                                <option ${data.descripcion === 'otro' ? 'selected' : ''}>Otro</option>
                                            </select>
                                        </div>
                                        <!-- Observaciones -->
                                        <div class="col-span-full">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Observaciones:</label>
                                            <div class="mt-2">
                                                <textarea id="editar-observacion-solicitud" rows="3" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">${data.observacion}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appSolicitud.cerrarModalSolicitud()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
            })
            .catch((error) => console.log(error));
    }
    this.aprobarSolicitud = (id_funcionario_solicitud) => {
        var formSolicitud = new FormData();
        formSolicitud.append('id_funcionario_solicitud', id_funcionario_solicitud);
        fetch("../controllers/aprobarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                app.notificacion('¡Solicitud aprobada!', 'Haz aprobado una solicitud.', 'guardar');
                this.listadoSolicitudCompleta();
                this.busqueda.value = null;
            })
            .catch((error) => alert('¡Error! ' + error));
    }
    this.eliminarSolicitud = (id_funcionario_solicitud) => {
        var confirmar = confirm('¿Estas seguro que quieres anular?');
        if (confirmar == true) {
            var formSolicitud = new FormData();
            formSolicitud.append('id_funcionario_solicitud', id_funcionario_solicitud);
            fetch("../controllers/eliminarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, esta solicitud está siendo usada!');
                        return;
                    }
                    app.notificacion('¡Solicitud eliminada!', 'Se ha eliminado una solicitud.', 'eliminar');
                    this.listadoSolicitudCompleta();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalSolicitud = () => {
        var modalSolicitud = document.getElementById('modal-solicitud');
        modalSolicitud.innerHTML = '';
    }
});

// Solo existe en: solicitud-index.php
var tablaCompleta = document.getElementById('tabla-completa');
var tablaSimple = document.getElementById('tabla-simple');
if (tablaCompleta) {
    appSolicitud.listadoSolicitudCompleta();
} else if (tablaSimple) {
    appSolicitud.listadoSolicitudSimple();
}

// Solo existe en: solicitud-crear.php
var select_IdFS = document.getElementById('select-id-funcionario-solicitud');
var cuenta_IdFS = document.getElementById('cuenta-id-funcionario-solicitud');
if (select_IdFS) {
    appSolicitud.selectFuncionarioEstructura();
} else if (cuenta_IdFS) {
    appSolicitud.idFuncionarioEstructura();
}