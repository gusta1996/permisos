const app = new (function () {
    this.tbodyArea = document.getElementById('tbodyArea');
    this.detalle = document.getElementById('detalle-area');
    this.categoria = document.getElementById('categoria-area');
    this.busqueda = document.getElementById('busqueda-area');
    this.paginacion = document.getElementById('paginacion');

    this.guardarArea = () => {
        var formArea = new FormData();
        formArea.append('detalle', this.detalle.value);
        formArea.append('categoria', this.categoria.value);
        fetch("../controllers/guardarArea.php", { method: "POST", body: formArea })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                alert('¡Area guardada con exito!');
                window.location.href = '../views/area.php';
            })
            .catch((error) => console.log(error));
    }
    this.selectCategoria = () => {
        var editarCategoria = document.getElementById('editar-categoria-area');
        fetch("../controllers/selectCategoria.php")
            .then((resultado) => resultado.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.estado === 'activo') {
                        // Capitalizar letras minusculas
                        let categoria = item.detalle.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
                        // Imprimir las opciones
                        if (editarCategoria) {
                            var seleted = 'categoria-id-' + item.id_categoria == editarCategoria.classList.item(0) ? 'selected' : '';
                            editarCategoria.innerHTML += `
                            <option ${seleted} value="${item.id_categoria}">${categoria}</option>
                        `;
                        } else {
                            this.categoria.innerHTML += `
                            <option value="${item.id_categoria}">${categoria}</option>
                        `;
                        }
                    }
                });
            })
            .catch((error) => console.log(error));
    }
    this.listadoArea = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        fetch("../controllers/listadoArea.php?page=" + pagina)
            .then(response => response.json())
            .then(data => {
                // Datos de la lista y total de paginas
                let item = data.resultado;
                let totalPaginas = data.totalPaginas;

                let html = '';
                for (let i = 0; i < item.length; i++) {
                    html += `
                        <tr class="h-16 border-b last:border-b-0 border-b-white-100">   
                            <td class="text-slate-700 pr-4">${item[i].id_area}</td>
                            <td class="capitalize text-slate-700 pr-4">${item[i].area_detalle}</td>
                            <td class="capitalize pr-4">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].categoria_estado == 'activo' ? 'text-green-600' : ''}${item[i].categoria_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].categoria_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                    </svg>${item[i].categoria_detalle}
                                </div>
                            </td>
                            <td class="font-medium capitalize ${item[i].area_estado == 'activo' ? 'text-green-600' : ''}${item[i].area_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].area_estado}</td>
                            <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                <button onclick="app.editarArea(${item[i].id_area})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button onclick="app.eliminarArea(${item[i].id_area})" title="Anular" class="${item[i].area_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `;
                }
                this.tbodyArea.innerHTML = html;
                this.paginacionArea(pagina, totalPaginas, false);
            });
    }
    this.busquedaArea = (pagina) => {
        // al cargar la pagina, la variable pagina es igual 1
        var pagina = !pagina ? 1 : pagina;
        // Si existe texto de busqueda, buscar
        var text = this.busqueda.value;
        var formBusqueda = new FormData();
        formBusqueda.append('busqueda', text);
        formBusqueda.append('pagina', pagina);
        fetch("../controllers/busquedaArea.php", { method: "POST", body: formBusqueda })
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
                                <td class="text-slate-700 pr-4">${item[i].id_area}</td>
                                <td class="capitalize text-slate-700 pr-4">${item[i].area_detalle}</td>
                                <td class="font-medium capitalize ${item[i].categoria_estado == 'activo' ? 'text-green-600' : ''}${item[i].categoria_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].categoria_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].categoria_detalle}</td>
                                <td class="font-medium capitalize ${item[i].area_estado == 'activo' ? 'text-green-600' : ''}${item[i].area_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].area_estado == 'anulado' ? 'text-red-600' : ''} pr-4">${item[i].area_estado}</td>
                                <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                                    <button onclick="app.editarArea(${item[i].id_area})" title="Editar" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button onclick="app.eliminarArea(${item[i].id_area})" title="Anular" class="${item[i].area_estado === 'anulado' ? 'hidden ' : ''}btn-eliminar flex items-center gap-2 min-h-fit rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
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

                this.tbodyArea.innerHTML = html;
                this.paginacionArea(pagina, totalPaginas, true);
            });
    }
    this.paginacionArea = (pagina_actual, total_paginas, buscador) => {
        let html = '';
        if (buscador == false) {
            // Paginacion para la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:app.listadoArea(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:app.listadoArea(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        } else {
            // Paginacion para la busqueda en la lista
            if (pagina_actual > 1) {
                html += `
                    <a href="javascript:app.busquedaArea(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:app.busquedaArea(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
            }
        }
        this.paginacion.innerHTML = html;
    }
    this.actualizarArea = () => {
        var formArea = new FormData();
        var editarId_Area = document.getElementById('editar-id-area');
        var editarDetalle = document.getElementById('editar-detalle-area');
        var editarCategoria = document.getElementById('editar-categoria-area');
        var editarEstado = document.getElementById('editar-estado-area');
        formArea.append('id_area', editarId_Area.value);
        formArea.append('detalle', editarDetalle.value);
        formArea.append('categoria', editarCategoria.value);
        formArea.append('estado', editarEstado.value);
        fetch("../controllers/actualizarArea.php", { method: "POST", body: formArea })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                alert('¡Area actualizada con exito!');
                this.listadoArea();
                this.cerrarModalArea();
                this.busqueda.value = null;
            })
            .catch((error) => console.log(error));
    }
    this.editarArea = (id_area) => {
        var formArea = new FormData();
        formArea.append('id_area', id_area);
        fetch("../controllers/editarArea.php", { method: "POST", body: formArea })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                var modalArea = document.getElementById('modal-area');
                modalArea.innerHTML = `
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50 ease-out duration-300">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <form action="javascript:void(0);" onsubmit="app.actualizarArea()">
                                <div class="border-b border-gray-900/10 px-4 py-3">
                                    <h3 class="text-md font-semibold leading-7 text-gray-900">Editar area</h3>
                                </div>
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <!-- ID -->
                                        <div class="hidden">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">ID:</label>
                                            <input type="text" id="editar-id-area" value="${data.id_area}" class="block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Detalle -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Detalle:</label>
                                            <input type="text" id="editar-detalle-area" value="${data.detalle}" class="capitalize block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        </div>
                                        <!-- Categoria -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Categoría</label>
                                            <select id="editar-categoria-area" required class="categoria-id-${data.id_categoria_fk} h-[38px] capitalize block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                            </select>
                                        </div>
                                        <!-- Estado -->
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium leading-6 text-gray-900">Estado:</label>
                                            <select id="editar-estado-area" required class="h-[38px] capitalize block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                                <option disabled>-- Selecciona --</option>
                                                <option ${data.estado === 'activo' ? 'selected' : ''}>Activo</option>
                                                <option ${data.estado === 'suspendido' ? 'selected' : ''}>Suspendido</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Guardar</button>
                                    <button type="button" onclick="app.cerrarModalArea()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `;
                this.selectCategoria();
            })
            .catch((error) => console.log(error));
    }
    this.eliminarArea = (id_area) => {
        var confirmar = confirm('¿Estas seguro que quieres eliminar?');
        if (confirmar == true) {
            var formArea = new FormData();
            formArea.append('id_area', id_area);
            fetch("../controllers/eliminarArea.php", { method: "POST", body: formArea })
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    if (data.estado == 'anulado') {
                        alert('¡Área anulada con éxito!');
                    } else {
                        alert('¡No se pudo anular, esta área está siendo usada!')
                    }
                    this.listadoArea();
                    this.busqueda.value = null;
                })
                .catch((error) => alert('¡Error! ' + error));
        } else {

        }
    }
    this.cerrarModalArea = () => {
        var modalArea = document.getElementById('modal-area');
        modalArea.innerHTML = '';
    }
});

app.listadoArea();
app.selectCategoria();