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

    this.tablaAdministrador = document.querySelector('#tabla-completa.tabla-administrador');
    this.tablaAutorizador = document.querySelector('#tabla-completa.tabla-autorizador');
    this.tablaValidador = document.querySelector('#tabla-completa.tabla-validador');

    this.subirDocumentoFirmado = (id_funcionario, numero_solicitud, id_funcionario_solicitud) => {
        // enviar datos
        var docFirmado = document.getElementById('subir-doc-firmado');
        var formDocFirma = new FormData();
        formDocFirma.append('id_funcionario', id_funcionario);
        formDocFirma.append('numero_solicitud', numero_solicitud);
        formDocFirma.append('id_funcionario_solicitud', id_funcionario_solicitud);
        if (docFirmado.files[0]) {
            // icono de boton cargando
            document.getElementById('btn-firmar-solicitud').innerHTML = `
                <svg class="animate-spin fill-white" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
                </svg> Guardando
            `;
            // guarda documento firmado
            formDocFirma.append('docFirmado', docFirmado.files[0]);
        } else {        
            alert('¡No has seleccionado el documento firmado!');
            return;
        }
        fetch("../controllers/subirDocumentoFirmado.php", { method: "POST", body: formDocFirma })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                if (data == true) {
                    window.location.href = '../views/solicitud.php';
                } else {
                    // Mensaje de error para cuando una firma ya fue subida
                    this.mensajeError.innerHTML = '';
                    // Mostrar mensaje
                    this.mensajeError.classList.remove('hidden');
                    this.mensajeError.innerHTML = `
                        <p class="font-medium rounded-md p-4 bg-red-100">${data}</p>
                    `;

                }
            })
            .catch((error) => alert('¡Error! ' + error));
    }
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
                        let color_class_FF = item[i].firma_estandar == true ? 'green' : 'red';
                        let color_class_FA = item[i].firma_autorizador == true ? 'green' : 'red';
                        let color_class_FV = item[i].firma_validador == true ? 'green' : 'red';
                        html += `
                        <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                            <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                            <td class="text-slate-700 pr-4">${item[i].numero}</td>
                            <td class="text-slate-700 pr-4 leading-6">
                                <div>${item[i].apellidos} ${item[i].nombres}</div>
                                <div>CI: ${item[i].cedula}</div>
                            </td>
                            <td class="text-slate-700 pr-4">${item[i].razon}</td>
                            <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                            <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                            <td class="pr-4">
                                <div class="flex justify-end flex-row items-center gap-4 h-16 w-fit">
                                    <!-- Icono firma funcionario -->
                                    <div title="${item[i].firma_estandar == true ? 'Firmado por el funcionario' : 'Firma del funcionario pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FF}-50 text-${color_class_FF}-700 ring-${color_class_FF}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                    </div>

                                    <!-- Icono firma Autorizador -->
                                    <div title="${item[i].firma_autorizador == true ? 'Firmado por el autorizador' : 'Firma del autorizador pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FA}-50 text-${color_class_FA}-700 ring-${color_class_FA}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                            <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
                                        </svg>
                                    </div>

                                    <!-- Icono firma Validador -->
                                    <div title="${item[i].firma_validador == true ? 'Firmado por el validador' : 'Firma del validador pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FV}-50 text-${color_class_FV}-700 ring-${color_class_FV}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-gear" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                ${(this.tablaAdministrador || this.tablaAutorizador || this.tablaValidador) && ((item[i].firma_estandar == false && item[i].fs_estado == 'pendiente' ) && item[i].id_funcionario_fk == this.cuentaIdFuncionario.innerHTML) ? `
                                    <!-- Firmar como funcionario -->
                                    <a href="./solicitud.php?page=firmar&numero_solicitud=${item[i].numero}&id_funcionario_solicitud=${item[i].id_funcionario_solicitud}" title="Firmar como funcionario" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-feather" viewBox="0 0 16 16">
                                            <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173"/>
                                        </svg>
                                    </a>
                                ` : ``}
                                ${(this.tablaAutorizador) && ((item[i].firma_estandar == true &&  item[i].firma_autorizador == false )) ? `
                                    <!-- Aprobar como autorizador -->
                                    <a href="./solicitud.php?page=firmar&numero_solicitud=${item[i].numero}&id_funcionario_solicitud=${item[i].id_funcionario_solicitud}" title="Aprobar como autorizador" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                    </a>
                                ` : ``}
                                ${(this.tablaAutorizador) && (item[i].firma_estandar == false && item[i].fs_estado == 'pendiente') ? `
                                    <!-- Aprobar como autorizador BLOQUEADO -->
                                    <button title="Esta solicitud necesita ser firmada por el funcionario" class="btn-aprobar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                    </button>
                                ` : ``}

                                ${this.tablaValidador && item[i].firma_autorizador == true && item[i].fs_estado == 'pendiente' ? `
                                    <!-- Aprobar como validador -->
                                    <a href="./solicitud.php?page=firmar&numero_solicitud=${item[i].numero}&id_funcionario_solicitud=${item[i].id_funcionario_solicitud}" title="Aprobar como validador" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                    </a>
                                ` : ``}
                                ${this.tablaValidador && item[i].firma_autorizador == false && item[i].fs_estado == 'pendiente' ? `
                                    <!-- Aprobar como validador BLOQUEADO -->
                                    <button title="Esta solicitud necesita ser firmada por el funcionario y un autorizador" class="btn-aprobar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                        </svg>
                                    </button>
                                ` : ``}


                                ${item[i].firma_estandar == false && !this.tablaAutorizador && item[i].fs_estado != 'anulado' ? `
                                    <!-- Boton editar -->
                                    <button onclick="appSolicitud.editarSolicitudCompleta(${item[i].id_funcionario_solicitud})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : ``}
                                ${(!this.tablaAutorizador) && (item[i].firma_estandar == true || item[i].fs_estado == 'anulado') ? `
                                    <!-- Boton editar BLOQUEADO -->
                                    <button title="Una solicitud firmada, aprobada o anulada no se puede editar" class="btn-editar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : ``}
                                ${this.tablaAutorizador ? `
                                    <!-- Boton editar BLOQUEADO -->
                                    <button title="No tienes permisos para editar" class="btn-editar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : ``}

                                ${item[i].fs_estado != 'anulado' ? `
                                    <!-- Boton anular -->
                                    <button onclick="appSolicitud.eliminarSolicitud(${item[i].numero}, ${item[i].id_funcionario_solicitud})" title="Anular" class="btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                ` : ``}
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
                        let color_class_FF = item[i].firma_estandar == true ? 'green' : 'red';
                        let color_class_FA = item[i].firma_autorizador == true ? 'green' : 'red';
                        let color_class_FV = item[i].firma_validador == true ? 'green' : 'red';
                        html += `
                        <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                            <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                            <td class="text-slate-700 pr-4">${item[i].numero}</td>
                            <td class="text-slate-700 pr-4">${item[i].razon}</td>
                            <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                            <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                            <td class="pr-4">
                                <div class="flex justify-end flex-row items-center gap-4 h-16 w-fit">
                                    <!-- Icono firma funcionario -->
                                    <div title="${item[i].firma_estandar == true ? 'Firmado por el funcionario' : 'Firma del funcionario pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FF}-50 text-${color_class_FF}-700 ring-${color_class_FF}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                    </div>

                                    <!-- Icono firma Autorizador -->
                                    <div title="${item[i].firma_autorizador == true ? 'Firmado por el autorizador' : 'Firma del autorizador pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FA}-50 text-${color_class_FA}-700 ring-${color_class_FA}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                            <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
                                        </svg>
                                    </div>

                                    <!-- Icono firma Validador -->
                                    <div title="${item[i].firma_validador == true ? 'Firmado por el validador' : 'Firma del validador pendiente'}" class="cursor-help flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FV}-50 text-${color_class_FV}-700 ring-${color_class_FV}-600/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-gear" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                ${(!this.tablaAdministrador && !this.tablaAutorizador && !this.tablaValidador) && (item[i].firma_estandar == false) && (item[i].fs_estado != 'anulado') ? `
                                    <!-- Firmar como estandar -->
                                    <a href="./solicitud.php?page=firmar&numero_solicitud=${item[i].numero}&id_funcionario_solicitud=${item[i].id_funcionario_solicitud}" title="Firmar" class="flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-feather" viewBox="0 0 16 16">
                                            <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173"/>
                                        </svg>
                                    </a>
                                ` : ``}

                                ${item[i].firma_estandar == false && item[i].fs_estado != 'anulado' ? `
                                    <!-- Boton editar -->
                                    <button onclick="appSolicitud.editarSolicitudSimple(${item[i].id_funcionario_solicitud})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : ``}
                                ${item[i].firma_estandar == true || item[i].fs_estado == 'anulado' ? `
                                    <!-- Boton editar BLOQUEADO -->
                                    <button title="Una solicitud firmada, aprobada o anulada no se puede editar" class="btn-editar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                ` : ``}

                                ${item[i].fs_estado == 'pendiente' ? `
                                    <!-- Boton anular -->
                                    <button onclick="appSolicitud.eliminarSolicitud(${item[i].numero}, ${item[i].id_funcionario_solicitud}, 'estandar')" title="Anular" class="btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                ` : ``}

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
                        let color_class_FF = item[i].firma_estandar == true ? 'green' : 'red';
                        let color_class_FA = item[i].firma_autorizador == true ? 'green' : 'red';
                        let color_class_FV = item[i].firma_validador == true ? 'green' : 'red';
                        html += `
                            <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                                <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_fk}</td>
                                <td class="text-slate-700 pr-4">${item[i].numero}</td>
                                <td class="text-slate-700 pr-4 leading-6">
                                    <div>${item[i].apellidos} ${item[i].nombres}</div>
                                    <div>CI: ${item[i].cedula}</div>
                                </td>
                                <td class="text-slate-700 pr-4">${item[i].razon}</td>
                                <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                                <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].fs_estado}</td>
                                <td class="pr-4">
                                    <div class="flex justify-end flex-row items-center gap-4 h-16 w-fit">
                                        <!-- Icono firma funcionario -->
                                        <div title="${item[i].firma_estandar == true ? 'Firmado por el funcionario' : 'Firma del funcionario pendiente'}" class="flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FF}-50 text-${color_class_FF}-700 ring-${color_class_FF}-600/10 ring-1 ring-inset">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                            </svg>
                                        </div>

                                        <!-- Icono firma Autorizador -->
                                        <div title="${item[i].firma_autorizador == true ? 'Firmado por el autorizador' : 'Firma del autorizador pendiente'}" class="flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FA}-50 text-${color_class_FA}-700 ring-${color_class_FA}-600/10 ring-1 ring-inset">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
                                            </svg>
                                        </div>

                                        <!-- Icono firma Validador -->
                                        <div title="${item[i].firma_validador == true ? 'Firmado por el validador' : 'Firma del validador pendiente'}" class="flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-${color_class_FV}-50 text-${color_class_FV}-700 ring-${color_class_FV}-600/10 ring-1 ring-inset">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-gear" viewBox="0 0 16 16">
                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    ${(this.tablaAutorizador) && (item[i].firma_estandar == true && item[i].firma_autorizador == false) ? `
                                        <!-- Aprobar como autorizador -->
                                        <a href="" title="Aprobar como autorizador" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </a>
                                    ` : ``}
                                    ${(this.tablaAutorizador) && (item[i].firma_estandar == false && item[i].firma_autorizador == false) ? `
                                        <!-- Aprobar como autorizador BLOQUEADO -->
                                        <a href="" title="Esta solicitud necesita ser firmada por el funcionario" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </a>
                                    ` : ``}

                                    ${(this.tablaValidador) && (item[i].firma_estandar == true && item[i].firma_autorizador == true && item[i].firma_validador == false) ? `
                                        <!-- Aprobar como validador -->
                                        <a href="" title="Aprobar como validador" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </a>
                                    ` : ``}
                                    ${(this.tablaValidador) && ((item[i].firma_estandar == false && item[i].firma_autorizador == false && item[i].firma_validador == false) || (item[i].firma_estandar == true && item[i].firma_autorizador == false && item[i].firma_validador == false)) ? `
                                        <!-- Aprobar como validador BLOQUEADO -->
                                        <a href="" title="Esta solicitud necesita ser firmada por el funcionario y un autorizador" class="btn-aprobar flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </a>
                                    ` : ``}

                                    ${this.tablaAdministrador || this.tablaValidador ? `
                                        <!-- Boton editar -->
                                        <button onclick="appSolicitud.${listadoSolicitud}(${item[i].id_funcionario_solicitud})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    ` : ``}
                                    ${this.tablaAutorizador ? `
                                        <!-- Boton editar BLOQUEADO -->
                                        <button onclick="" title="No tienes permisos para editar" class="btn-editar cursor-no-drop flex items-center gap-2 min-h-fit rounded-md px-3 py-2 text-xs font-medium bg-gray-50 text-gray-700 ring-gray-700/10 ring-1 ring-inset">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    ` : ``}

                                    ${item[i].fs_estado != 'anulado' ? `
                                        <!-- Boton -->
                                        <button onclick="appSolicitud.eliminarSolicitud(${item[i].numero}, ${item[i].id_funcionario_solicitud})" title="Anular" class="btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                        </button>
                                    ` : ``}
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
        // icono de boton cargando
        document.getElementById('btn-crear-solicitud').innerHTML = `
            <svg class="animate-spin fill-white" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
            </svg> Creando
        `;
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
                if (data.id_funcionario == this.cuentaIdFuncionario.innerHTML) {
                    alert('¡Solicitud generada con éxito, firme el documento para su aprobación!');
                    window.location.href = '../views/solicitud.php?page=firmar&numero_solicitud=' + data.numero_solicitud + '&id_funcionario_solicitud=' + data.id_funcionario_solicitud;
                } else {
                    alert('¡Solicitud generada con éxito, firme el documento para su aprobación!');
                    window.location.href = '../views/solicitud.php';

                }
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
                                        <div class="col-span-full">
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
    this.eliminarSolicitud = (numero_solicitud, id_funcionario_solicitud, usuario) => {
        var confirmar = confirm('¿Estas seguro que quieres anular?');
        if (confirmar == true) {
            var formSolicitud = new FormData();
            formSolicitud.append('numero_solicitud', numero_solicitud);
            formSolicitud.append('id_funcionario_solicitud', id_funcionario_solicitud);
            fetch("../controllers/eliminarFuncionarioSolicitud.php", { method: "POST", body: formSolicitud })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado != 'anulado') {
                        alert('¡No se pudo anular, esta solicitud está siendo usada!');
                        return;
                    }
                    app.notificacion('¡Solicitud eliminada!', 'Se ha eliminado una solicitud.', 'eliminar');
                    if (usuario == 'estandar') { this.listadoSolicitudSimple(); } 
                    else { this.listadoSolicitudCompleta(); }
                    if (this.busqueda) { this.busqueda.value = null; }
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