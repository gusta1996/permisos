const appFuncionarios = new (function () {
    this.cuentaIdFuncionario = document.getElementById('cuenta-id-funcionario');
    this.tbodyFuncionarios = document.getElementById('tbodyFuncionarios');
    this.btnFuncionario = document.getElementById('btn-funcionario');
    this.boxListaFuncionario = document.getElementById('lista-funcionario');
    this.boxCrearFuncionario = document.getElementById('crear-funcionario');
    this.nombresFuncionario = document.getElementById('nombres-funcionarios');
    this.apellidosFuncionario = document.getElementById('apellidos-funcionarios');
    this.cedulaFuncionario = document.getElementById('cedula-funcionarios');
    this.telefonoFuncionario = document.getElementById('telefono-funcionarios');
    this.direccionFuncionario = document.getElementById('direccion-funcionarios');
    this.emailFuncionario = document.getElementById('email-funcionarios');
    this.usuarioFuncionario = document.getElementById('usuario-funcionarios');
    this.passwordFuncionario = document.getElementById('password-funcionarios');
    this.idRolFuncionario = document.getElementById('rol-funcionarios');
    this.idContratoFuncionario = document.getElementById('contrato-funcionarios');
    this.idEstructuraFuncionario = document.getElementById('estructura-funcionarios');
    this.errorFuncionario = document.getElementById('error-funcionarios');
    this.busqueda = document.getElementById('busqueda-funcionarios');
    this.busquedaTipo = document.getElementById('busqueda-tipo');
    this.paginacion = document.getElementById('paginacion');

    this.listadoFuncionarios = (pagina, cuentaIdFuncionario = this.cuentaIdFuncionario.innerHTML) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoFuncionarios.php?page=" + pagina)
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                if (item != '') {
                    for (let i = 0; i < item.length; i++) {
                        let botones = `
                        <button onclick="appFuncionarios.editarFuncionarios(${item[i].id_funcionario})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                        <button onclick="appFuncionarios.eliminarFuncionarios(${item[i].id_funcionario})" title="Anular" class="btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </button>
                    `;
                        html += `
                        <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                            <td class="pr-4">${item[i].id_funcionario}</td>
                            <td class="pr-4 leading-6">
                                <div>${item[i].apellidos} ${item[i].nombres}</div>
                                <div>CI: ${item[i].cedula}</div>
                            </td>
                            <td class="font-medium capitalize ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-600' : ''} pr-4">${item[i].f_estado}</td>
                            <td class="max-w-40 block truncate pr-4">${item[i].email}</td>
                            <td class="pr-4">${item[i].nick}</td>
                            <td class="pr-4 capitalize">${item[i].rol}</td>
                            <td class="font-medium capitalize ${item[i].u_estado == 'activo' ? 'text-green-600' : ''}${item[i].u_estado == 'suspendido' ? 'text-amber-600' : ''}${item[i].u_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].u_estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                ${(cuentaIdFuncionario != item[i].id_funcionario) ? botones : `
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
                    html += '<tr class="h-16"><td colspan="8">No se encontró resultados.</td></tr>';
                }
                this.tbodyFuncionarios.innerHTML = html;
                this.paginacionFuncionarios(pagina, totalPaginas, false);
            });
    }
    this.busquedaFuncionarios = (pagina, cuentaIdFuncionario = this.cuentaIdFuncionario.innerHTML) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('tipo', this.busquedaTipo.value);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaFuncionarios.php", { method: "POST", body: formBusqueda })
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                if (item != '') {
                    for (let i = 0; i < item.length; i++) {
                        let botones = `
                            <button onclick="appFuncionarios.editarFuncionarios(${item[i].id_funcionario})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>
                            <button onclick="appFuncionarios.eliminarFuncionarios(${item[i].id_funcionario})" title="Anular" class="btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        `;
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                                <td class="pr-4">${item[i].id_funcionario}</td>
                                <td class="pr-4 leading-6">
                                    <div>${item[i].apellidos} ${item[i].nombres}</div>
                                    <div>CI: ${item[i].cedula}</div>
                                </td>
                                <td class="font-medium capitalize ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-600' : ''} pr-4">${item[i].f_estado}</td>
                                <td class="max-w-40 block truncate pr-4">${item[i].email}</td>
                                <td class="pr-4">${item[i].nick}</td>
                                <td class="pr-4 capitalize">${item[i].rol}</td>
                                <td class="font-medium capitalize ${item[i].u_estado == 'activo' ? 'text-green-600' : ''}${item[i].u_estado == 'suspendido' ? 'text-amber-600' : ''}${item[i].u_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].u_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    ${(cuentaIdFuncionario != item[i].id_funcionario) ? botones : `
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
                    html += '<tr class="h-16"><td colspan="8">No se encontró resultados.</td></tr>';
                }

                this.tbodyFuncionarios.innerHTML = html;
                this.paginacionFuncionarios(pagina, totalPaginas, true);
            });
    }
    this.paginacionFuncionarios = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appFuncionarios.listadoFuncionarios(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appFuncionarios.listadoFuncionarios(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appFuncionarios.busquedaFuncionarios(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appFuncionarios.busquedaFuncionarios(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.selectRol = () => {
        var editarRol = document.getElementById('editar-rol-funcionarios');
        fetch("../controllers/listadoRol.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let rol = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (editarRol) {
                            var seleted = 'rol-id-' + item.id_rol == editarRol.classList.item(0) ? 'selected' : '';
                            editarRol.innerHTML += `
                                <option ${seleted} value="${item.id_rol}">${rol}</option>
                            `;
                        } else {
                            this.idRolFuncionario.innerHTML += `
                            <option value="${item.id_rol}">${rol}</option>
                        `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectContrato = () => {
        var EditContrato = document.getElementById('editar-contrato-funcionarios');
        fetch("../controllers/selectContrato.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let contrato = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (EditContrato) {
                            var seleted = 'contrato-id-' + item.id_contrato == EditContrato.classList.item(0) ? 'selected' : '';
                            EditContrato.innerHTML += `
                            <option ${seleted} value="${item.id_contrato}">${contrato}</option>
                        `;
                        } else {
                            this.idContratoFuncionario.innerHTML += `
                            <option value="${item.id_contrato}">${contrato}</option>
                        `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectEstructura = () => {
        fetch("../controllers/selectEstructura.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estruc_estado === 'activo') {
                        // Capitalizar letras minusculas
                        let cargo = item.cargo_detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        let seccion = item.seccion_detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        let unidad = item.unidad_detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        let direccion = item.direccion_detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        this.idEstructuraFuncionario.innerHTML += `
                            <option value="${item.id_estructura}">${cargo} (Dirección: ${direccion})</option>
                        `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.guardarFuncionarios = () => {
        // Esconder mensaje de error al guardar cada vez
        this.errorFuncionario.classList.add('hidden');
        this.errorFuncionario.innerHTML = '';
        // Enviar formulario para la consulta
        var formFuncionario = new FormData();
        formFuncionario.append('nombres', this.nombresFuncionario.value);
        formFuncionario.append('apellidos', this.apellidosFuncionario.value);
        formFuncionario.append('cedula', this.cedulaFuncionario.value);
        formFuncionario.append('direccion', this.direccionFuncionario.value);
        formFuncionario.append('telefono', this.telefonoFuncionario.value);
        formFuncionario.append('email', this.emailFuncionario.value);
        formFuncionario.append('usuario', this.usuarioFuncionario.value);
        formFuncionario.append('password', this.passwordFuncionario.value);
        formFuncionario.append('id_rol', this.idRolFuncionario.value);
        formFuncionario.append('id_contrato', this.idContratoFuncionario.value);
        formFuncionario.append('id_estructura', this.idEstructuraFuncionario.value);
        fetch("../controllers/guardarFuncionarios.php", { method: "POST", body: formFuncionario })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    // Funcionario guardado con exito
                    alert('¡Funcionario guardado con exito!');
                    window.location.href = '../views/funcionarios.php';
                } else {
                    // Mostrar mensaje de error al guardar
                    this.errorFuncionario.classList.remove('hidden');
                    data.forEach(item => {
                        this.errorFuncionario.innerHTML += '<p class="font-medium rounded-md mb-4 p-4 bg-red-100">' + item + '</p>';
                    });
                }
            })
            .catch((error) => console.log(error));
    }
    this.actualizarFuncionarios = () => {
        // Esconder mensaje de error al guardar cada vez
        var editarError = document.getElementById('editar-error-funcionarios');
        editarError.classList.add('hidden');
        editarError.innerHTML = '';
        // Enviar formulario para la consulta
        var formFuncionario = new FormData();
        var editarId_funcionario = document.getElementById('editar-id-funcionarios');
        var editarNombres = document.getElementById('editar-nombres-funcionarios');
        var editarApellidos = document.getElementById('editar-apellidos-funcionarios');
        var editarCedula = document.getElementById('editar-cedula-funcionarios');
        var editarTelefono = document.getElementById('editar-telefono-funcionarios');
        var editarDireccion = document.getElementById('editar-direccion-funcionarios');
        var editarEmail = document.getElementById('editar-email-funcionarios');
        var editarUsername = document.getElementById('editar-username-funcionarios');
        var editarPassword = document.getElementById('editar-password-funcionarios');
        var editarIdRol = document.getElementById('editar-rol-funcionarios');
        var editarEstadoFuncionario = document.getElementById('editar-f_estado-funcionarios');
        var editarEstadoUsuario = document.getElementById('editar-u_estado-funcionarios');
        formFuncionario.append('id_funcionario', editarId_funcionario.value);
        formFuncionario.append('nombres', editarNombres.value);
        formFuncionario.append('apellidos', editarApellidos.value);
        formFuncionario.append('cedula', editarCedula.value);
        formFuncionario.append('telefono', editarTelefono.value);
        formFuncionario.append('direccion', editarDireccion.value);
        formFuncionario.append('email', editarEmail.value);
        formFuncionario.append('username', editarUsername.value);
        if (editarPassword.value != '') {
            formFuncionario.append('password', editarPassword.value);
        }
        formFuncionario.append('id_rol', editarIdRol.value);
        formFuncionario.append('f_estado', editarEstadoFuncionario.value);
        formFuncionario.append('u_estado', editarEstadoUsuario.value);
        fetch("../controllers/actualizarFuncionarios.php", { method: "POST", body: formFuncionario })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    app.notificacion('¡Funcionario actualizado!', 'Se ha actualizado un funcionario.', 'actualizar');
                    this.listadoFuncionarios();
                    this.cerrarModalFuncionarios();
                } else {
                    // Mostrar mensaje de error al guardar
                    editarError.classList.remove('hidden');
                    data.forEach(item => {
                        editarError.innerHTML += '<p class="font-medium rounded-md mb-4 p-4 bg-red-100">' + item + '</p>';
                    });
                }
                this.busqueda.value = null;
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
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="appFuncionarios.actualizarFuncionarios()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar funcionarios</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <!-- ID -->
                                        <div class="hidden sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-funcionarios" value="${data.id_funcionario}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Nombres -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                                            <input type="text" id="editar-nombres-funcionarios" required value="${data.nombres}" class="block capitalize w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Apellidos -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Apellidos:</label>
                                            <input type="text" id="editar-apellidos-funcionarios" required value="${data.apellidos}" class="block capitalize w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Cédula -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Cédula:</label>
                                            <input type="tel" id="editar-cedula-funcionarios" required minlength="10" maxlength="10" value="${data.cedula}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Dirección -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                                            <input type="text" id="editar-direccion-funcionarios" required value="${data.direccion}" class="block capitalize w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Telefono -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Telefono:</label>
                                            <input type="tel" id="editar-telefono-funcionarios" minlength="10" maxlength="10" value="${data.telefono}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Estado del funcionario -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado del funcionario:</label>
                                            <select id="editar-f_estado-funcionarios" value="${data.f_estado}" required class="capitalize h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.f_estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.f_estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                        <hr class="col-span-12">
                                        <!-- username -->
                                        <div class="sm:col-span-6">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Username:</label>
                                            <input type="text" id="editar-username-funcionarios" value="${data.nick}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Email -->
                                        <div class="sm:col-span-6">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                                            <input type="email" id="editar-email-funcionarios" value="${data.email}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- password -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Contraseña: (opcional)</label>
                                            <input type="password" autocomplete="new-password" id="editar-password-funcionarios" pattern="^(?=.*[a-zA-Z])(?=.*\\d).{6,}$" placeholder="Usar letras y números (min 6 digitos)" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Rol -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Rol:</label>
                                            <select id="editar-rol-funcionarios" required class="rol-id-${data.id_rol} selectBuscador capitalize h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado de usuario -->
                                        <div class="sm:col-span-4">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado de usuario:</label>
                                            <select id="editar-u_estado-funcionarios" value="${data.u_estado}" required class="capitalize h-[38px] block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.u_estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.u_estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                                <option ${data.u_estado === 'anulado' ? 'selected' : ''}>Anulado</option>
                                            </select>
                                        </div>
                                        <!-- Mensaje de error -->
                                        <div id="editar-error-funcionarios" class="hidden sm:col-span-6">
                                        </div>
                                    </div>
                                </div>
                                <div class="border-t border-gray-900/10 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="appFuncionarios.cerrarModalFuncionarios()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectRol();
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
                    if (data.f_estado != 'anulado') {
                        alert('¡No se pudo anular, este funcionario tiene un cargo asignado!');
                        return;
                    }
                    app.notificacion('¡Funcionario eliminado!', 'Se ha eliminado un funcionario.', 'eliminar');
                    this.listadoFuncionarios();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalFuncionarios = () => {
        var modalFuncionarios = document.getElementById('modal-funcionarios');
        modalFuncionarios.innerHTML = '';
    }
    this.generatePassword = () => {
        const length = 10; // Longitud de la contraseña
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras
        const numbers = "0123456789"; // Números
        const symbols = "!@#$%^&*()_+[]{}|<>,.?~"; // Signos
        const charset = letters + numbers + symbols; // Caracteres disponibles
        let password = "";

        // Asegurarse de que al menos haya una letra, un número y un signo
        password += letters[Math.floor(Math.random() * letters.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];

        for (let i = 3; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        // Mezclar la contraseña para hacerla más aleatoria
        password = password.split('');
        for (let i = password.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [password[i], password[j]] = [password[j], password[i]];
        }
        password = password.join('');

        this.passwordFuncionario.value = password;
    }
});

if (appFuncionarios.boxListaFuncionario) {
    appFuncionarios.listadoFuncionarios();
}
if (appFuncionarios.boxCrearFuncionario) {
    appFuncionarios.selectRol();
    appFuncionarios.selectContrato();
    appFuncionarios.selectEstructura();
    appFuncionarios.generatePassword();
}