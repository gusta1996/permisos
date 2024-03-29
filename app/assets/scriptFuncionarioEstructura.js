const appFuncionarioEstructura = new (function () {
    this.tbodyFuncionarioEstructura = document.getElementById('tbodyFuncionarioEstructura');
    this.funcionario = document.getElementById('funcionario-funcionarioEstructura');
    this.iconoCarga = document.getElementById('icono-carga');
    this.verGuardarContratoEstructura = document.getElementById('ver-guardar-contratoEstructura');
    this.verFuncionario = document.getElementById('ver-funcionario');
    this.verGuardarContrato = document.getElementById('ver-guardar-contrato');
    this.verGuardarEstructura = document.getElementById('ver-guardar-estructura');
    this.mensajeNoGuardado = document.getElementById('mensaje-no-guardado');
    this.busqueda = document.getElementById('busqueda-funcionarioEstructura');
    this.busquedaTipo = document.getElementById('busqueda-tipo');
    this.paginacion = document.getElementById('paginacion');

    this.verContratoEstructura = () => {
        var id_funcionario = this.funcionario.value;
        // Vaciar todo para una nueva consulta
        this.verGuardarContratoEstructura.classList.add('hidden');
        this.verGuardarContrato.innerHTML = '';
        this.verGuardarEstructura.innerHTML = '';
        this.mensajeNoGuardado.innerHTML = '';
        // Mostrar icono de carga
        this.iconoCarga.classList.remove('hidden');
        this.iconoCarga.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
            </svg>
        `;
        // Cargar contenido: envia id_funcionario para consultar datos
        var formContratoEstructura = new FormData();
        formContratoEstructura.append('id_funcionario', id_funcionario);
        fetch("../controllers/verFuncionarioEstructura.php", { method: "POST", body: formContratoEstructura })
            .then((resultado) => resultado.json())
            .then((data) => {
                // Insertar funcionario
                this.verFuncionario.innerHTML = `
                    <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                    <input type="text" id="id-funcionario" disabled value="${id_funcionario}" class="funcionario-id-${data.id_funcionario} bg-white block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                `;

                // Insertar contrato y agrega todos los <option>
                this.verGuardarContrato.innerHTML = `
                    <div class="flex items-center gap-2 bg-emerald-200 rounded-md shadow-sm mb-6 p-4 text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                        <p>Todos los <a href="./contrato.php" class="text-indigo-600 font-semibold">contratos</a> y <a href="./estructura.php" class="text-indigo-600 font-semibold">cargos</a> deben estar previamente registrados.</p>
                    </div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Contrato:</label>
                    <div class="mt-2">
                        <select id="opciones-contrato" required class="contrato-id-${data.id_contrato} selectBuscador bg-white h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value selected disabled>-- Selecciona --</option>
                        </select>
                    </div>
                `;
                this.selectContrato();

                // Inserta estructura y agrega todos los <option>
                this.verGuardarEstructura.innerHTML = `
                    <label class="block text-sm font-medium leading-6 text-gray-900">Cargo y dirección:</label>
                    <div class="mt-2">
                        <select id="opciones-estructura" required class="estructura-id-${data.id_estructura} selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value selected disabled>-- Selecciona: --</option>
                        </select>
                    </div>
                `;
                this.selectEstructura();

                $(document).ready(function () {
                    $('.selectBuscador').select2();
                    $('.select2').addClass('bg-white h-[38px] block !w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6');
                });
            })
            .catch((error) => console.log(error));

        // Efecto de carga 0.5 segundo
        setTimeout(function () {
            // Quitar icono de carga
            document.getElementById('icono-carga').innerHTML = '';
            document.getElementById('icono-carga').classList.add('hidden');
            // Mostrar contenido cargado
            document.getElementById('ver-guardar-contratoEstructura').classList.remove('hidden');
        }, 500);
    }
    this.selectFuncionarios = () => {
        fetch("../controllers/selectFuncionarios.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Capitalizar letras minusculas
                    const nombres = item.nombres.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                    const apellidos = item.apellidos.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                    // Imprimir las opciones
                    this.funcionario.innerHTML += `
                        <option value="${item.id_funcionario}">${apellidos} ${nombres}</option>
                    `;
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectContrato = () => {
        var opcionesContrato = document.getElementById('opciones-contrato');
        fetch("../controllers/selectContrato.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (opcionesContrato) {
                        var seleted = 'contrato-id-' + item.id_contrato == opcionesContrato.classList.item(0) ? 'selected' : '';
                        opcionesContrato.innerHTML += `
                            <option ${seleted} value="${item.id_contrato}">${item.detalle}</option>
                        `;
                    } else {
                        opcionesContrato.innerHTML += `
                            <option value="${item.id_contrato}">${item.detalle}</option>
                        `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.selectEstructura = () => {
        var opcionesEstructura = document.getElementById('opciones-estructura');
        fetch("../controllers/selectEstructura.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    // Imprimir las opciones
                    if (opcionesEstructura) {
                        var seleted = 'estructura-id-' + item.id_estructura == opcionesEstructura.classList.item(0) ? 'selected' : '';
                        opcionesEstructura.innerHTML += `
                        <option ${seleted} value="${item.id_estructura}">${item.cargo_detalle} ( Dirección: ${item.direccion_detalle} )</option>
                    `;
                    } else {
                        this.estructura.innerHTML += `
                        <option value="${item.id_estructura}">${item.cargo_detalle} ( Dirección: ${item.direccion_detalle} )</option>
                    `;
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.actualizarContratoEstructura = () => {
        // Vaciar todo para una nueva consulta
        this.mensajeNoGuardado.innerHTML = '';
        // obtener los id
        var idFuncionario = document.getElementById('id-funcionario').value;
        var idContrato = document.getElementById('opciones-contrato').value;
        var idEstructura = document.getElementById('opciones-estructura').value;
        // Crear form y enviar datos para guardar
        var formFuncionarioEstructura = new FormData();
        formFuncionarioEstructura.append('id_funcionario', idFuncionario);
        formFuncionarioEstructura.append('id_contrato', idContrato);
        formFuncionarioEstructura.append('id_estructura', idEstructura);
        fetch("../controllers/actualizarFuncionarioEstructura.php", { method: "POST", body: formFuncionarioEstructura })
            .then((resultado) => resultado.json())
            .then((data) => {
                if (data == true) {
                    // Guardado con exito
                    app.notificacion('¡Contrato y cargo guardado!', 'Se ha actualizado el contrato y el cargo.', 'guardar');
                    this.listadoFuncionarioEstructura();
                } else {
                    // Mostrar mensaje de 'No se ha realizado cambios'
                    this.mensajeNoGuardado.classList.remove('hidden');
                    this.mensajeNoGuardado.innerHTML = `
                        <p class="font-medium rounded-md p-4 bg-red-100">${data}</p>
                    `;
                }
            })
            .catch((error) => console.log(error));
    }
    this.listadoFuncionarioEstructura = (pagina, registro) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        var formListadoFE = new FormData();
        formListadoFE.append('pagina', pagina);
        formListadoFE.append('registro', registro);
        fetch("../controllers/listadoFuncionarioEstructura.php", { method: "POST", body: formListadoFE })
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
                                    <td class="pr-4">${item[i].id_funcionario_estructura}</td>
                                    <td class="capitalize pr-4">
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8"/>
                                            </svg>${item[i].apellidos} ${item[i].nombres}
                                        </div>
                                    </td>
                                    <td class="pr-4 ${item[i].c_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].c_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].contrato_detalle}</td>
                                    <td class="pr-4 ${item[i].cargo_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].cargo_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].cargo_detalle}</td>
                                    <td class="font-medium capitalize ${item[i].fe_estado == 'activo' ? 'text-green-600' : ''}${item[i].fe_estado == 'suspendido' ? 'text-amber-400' : ''} pr-4">${item[i].fe_estado}</td>
                                </tr>
                            `;
                        
                    }
                } else {
                    html += '<p class="w-full mt-5">No se encontró resultados.</p>';
                }

                this.tbodyFuncionarioEstructura.innerHTML = html;
                this.paginacionFuncionarioEstructura(pagina, totalPaginas, false, registro);
            });
    }
    this.listadoRegistroFuncionarioEstructura = (pagina, registro) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        var formListadoRFE = new FormData();
        formListadoRFE.append('pagina', pagina);
        formListadoRFE.append('registro', registro);
        fetch("../controllers/listadoFuncionarioEstructura.php", { method: "POST", body: formListadoRFE })
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
                            <td class="pr-4">${item[i].id_funcionario_estructura}</td>
                            <td class="capitalize pr-4">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                    </svg>${item[i].apellidos} ${item[i].nombres}
                                </div>
                            </td>
                            <td class="pr-4 ${item[i].c_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].c_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].contrato_detalle}</td>
                            <td class="pr-4 ${item[i].cargo_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].cargo_estado == 'anulado' ? 'text-red-600' : ''}">${item[i].cargo_detalle}</td>
                            <td class="font-medium capitalize ${item[i].fe_estado == 'activo' ? 'text-green-600' : ''}${item[i].fe_estado == 'suspendido' ? 'text-amber-400' : ''} pr-4">${item[i].fe_estado}</td>
                        </tr>
                    `;
                    }
                } else {
                    html += '<p class="w-full mt-5">No se encontró resultados.</p>';
                }

                this.tbodyFuncionarioEstructura.innerHTML = html;
                this.paginacionFuncionarioEstructura(pagina, totalPaginas, false, registro);
            });
    }
    this.busquedaFuncionarioEstructura = (pagina, registro) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('tipo', this.busquedaTipo.value);
        formBusqueda.append('pagina', pagina);
        formBusqueda.append('registro', registro);
        fetch("../controllers/busquedaFuncionarioEstructura.php", { method: "POST", body: formBusqueda })
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
                                <td class="text-slate-700 pr-4">${item[i].id_funcionario_estructura}</td>
                                <td class="capitalize pr-4">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>${item[i].apellidos} ${item[i].nombres}
                                    </div>
                                </td>
                                <td class="capitalize pr-4">${item[i].contrato_detalle}</td>
                                <td class="capitalize pr-4">${item[i].cargo_detalle}</td>
                                <td class="font-medium capitalize ${item[i].fe_estado == 'activo' ? 'text-green-600' : ''}${item[i].fe_estado == 'suspendido' ? 'text-amber-400' : ''} pr-4">${item[i].fe_estado}</td>
                            </tr>
                        `;
                    }
                } else {
                    html += '<p class="w-full my-5">No se encontró resultados.</p>';
                }

                this.tbodyFuncionarioEstructura.innerHTML = html;
                this.paginacionFuncionarioEstructura(pagina, totalPaginas, true, registro);
            });
    }
    this.paginacionFuncionarioEstructura = (pagina_actual, total_paginas, buscador, registro) => {
        let html = '';
        //let registro = ( registro == true) ? 'Registro' : '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appFuncionarioEstructura.listado${registro == true ? 'Registro' : '' }FuncionarioEstructura(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appFuncionarioEstructura.listado${registro == true ? 'Registro' : '' }FuncionarioEstructura(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:appFuncionarioEstructura.busquedaFuncionarioEstructura(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appFuncionarioEstructura.busquedaFuncionarioEstructura(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
});

if (document.getElementById('contrato-cargo')) {
    // pagina asignar cargos
    appFuncionarioEstructura.selectFuncionarios();
    appFuncionarioEstructura.listadoFuncionarioEstructura(undefined, 0);
} else if (document.getElementById('registro-contrato-cargo')) {
    // pagina historial de cargos
    appFuncionarioEstructura.listadoRegistroFuncionarioEstructura(undefined, 1);
}