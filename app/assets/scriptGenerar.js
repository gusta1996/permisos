const appGenerar = new (function () {
  this.cuentaIdFuncionario = document.getElementById('cuenta-id-funcionario');
  this.tbodyGenerar = document.getElementById('tbodyGenerar');
  this.tablaCompleta = document.getElementById('tabla-completa');
  this.tablaSimple = document.getElementById('tabla-simple');
  this.generarPdf = document.getElementById('generar-pdf');
  this.visorPdf = document.getElementById('visor-pdf');
  this.busqueda = document.getElementById('busqueda-solicitud');
  this.busquedaTipo = document.getElementById('busqueda-tipo');
  this.paginacion = document.getElementById('paginacion');

  this.listadoGenerarCompleta = (pagina) => {
    // al cargar la pagina, la variable pagina es igual 1
    var pagina = !pagina ? 1 : pagina;
    fetch("../controllers/listadoGenerarPDF.php?page=" + pagina)
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
                    <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                    <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                    <td class="text-slate-700 pr-4 leading-6">
                        <div>${item[i].apellidos} ${item[i].nombres}</div>
                        <div>CI: ${item[i].cedula}</div>
                    </td>
                    <td class="text-slate-700 pr-4">${item[i].razon}</td>
                    <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                    <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                        <button onclick="appGenerar.GenerarPDF(${item[i].id_funcionario_solicitud})" title="Generar PDF" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                `;
          }
        } else {
          html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
        }

        this.tbodyGenerar.innerHTML = html;
        this.paginacionGenerarPDF(pagina, totalPaginas, false);
      });
  }
  this.listadoGenerarSimple = (pagina) => {
    // al cargar la pagina, la variable pagina es igual 1
    var pagina = !pagina ? 1 : pagina;
    var cuentaIdFuncionario = this.cuentaIdFuncionario.innerHTML;
    fetch("../controllers/listadoGenerarPDF.php?page=" + pagina + "&id=" + cuentaIdFuncionario)
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
                    <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                    <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                    <td class="text-slate-700 pr-4">${item[i].razon}</td>
                    <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                    <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                        <button onclick="appGenerar.GenerarPDF(${item[i].id_funcionario_solicitud})" title="Generar PDF" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                `;
          }
        } else {
          html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
        }

        this.tbodyGenerar.innerHTML = html;
        this.paginacionGenerarPDF(pagina, totalPaginas, false);
      });
  }
  this.busquedaGenerarPDF = (pagina) => {
    // al cargar la pagina, la variable pagina es igual 1
    var pagina = !pagina ? 1 : pagina;
    // Si existe texto de busqueda, buscar
    var text = this.busqueda.value;
    var formBusqueda = new FormData();
    formBusqueda.append('busqueda', text);
    formBusqueda.append('tipo', this.busquedaTipo.value);
    formBusqueda.append('pagina', pagina);
    fetch("../controllers/busquedaGenerarPDF.php", { method: "POST", body: formBusqueda })
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
                          <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                          <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                          <td class="text-slate-700 pr-4 leading-6">
                              <div>${item[i].apellidos} ${item[i].nombres}</div>
                              <div>CI: ${item[i].cedula}</div>
                          </td>
                          <td class="text-slate-700 pr-4">${item[i].razon}</td>
                          <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                          <td class="flex justify-end flex-row items-center gap-4 h-16 w-fit ml-auto">
                              <button onclick="appGenerar.GenerarPDF(${item[i].id_funcionario_solicitud})" class="btn-editar flex items-center gap-2 min-h-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
                                  </svg>
                              </button>
                          </td>
                      </tr>
                      `;
          }
        } else {
          html += '<tr class="h-16"><td colspan="5">No se encontró resultados.</td></tr>';
        }

        this.tbodyGenerar.innerHTML = html;
        this.paginacionGenerarPDF(pagina, totalPaginas, true);
      });
  }
  this.paginacionGenerarPDF = (pagina_actual, total_paginas, buscador) => {
    let html = '';
    var listadoGenerar = this.tablaCompleta ? 'listadoGenerarCompleta' : 'listadoGenerarSimple';
    if (buscador == false) {
      // Paginacion para la lista
      if (pagina_actual > 1) {
        html += `
                  <a href="javascript:appGenerar.${listadoGenerar}(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                  <a href="javascript:appGenerar.${listadoGenerar}(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
              `;
      }
    } else {
      // Paginacion para la busqueda en la lista
      if (pagina_actual > 1) {
        html += `
                  <a href="javascript:appGenerar.busquedaGenerarPDF(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                  <a href="javascript:appGenerar.busquedaGenerarPDF(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
              `;
      }
    }
    this.paginacion.innerHTML = html;
  }
  this.formatearNumero = (numero, longitud) => {
    return String(numero).padStart(longitud, '0');
  }
  this.convertirHTMLaPDF = async (elemento, numeroPermiso) => {
    try {
      // Usar html2canvas para crear un canvas con el contenido del elemento
      const canvas = await html2canvas(elemento);
      // Convertir el canvas en una imagen PNG
      const imagen = canvas.toDataURL("image/png");

      // Crear un nuevo documento PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      // Obtener el ancho y el alto del documento PDF
      const margin = 8;
      const pageWidth = (doc.internal.pageSize.getWidth()) - margin * 2;
      // Obtener las propiedades de la imagen
      const imgProps = doc.getImageProperties(imagen);
      // Calcular la relación de aspecto entre el ancho y el alto de la imagen
      const ratioImg = imgProps.width / imgProps.height;
      // Calcular el alto de la imagen según el ancho de la página y la relación de aspecto
      const pageHeight = pageWidth / ratioImg;
      // Agregar la imagen al documento PDF con el ancho y el alto calculados
      doc.addImage(imagen, "PNG", margin, margin, pageWidth, pageHeight);

      // Guardar el documento PDF
      doc.save("Permiso_" + numeroPermiso + ".pdf");
      // Quita el icono "Cargando"
      document.getElementById('btn-descargar').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
        Descargar
      `;
    } catch (error) {
      // Manejar el error
      console.error("Error al convertir el elemento en imagen y PDF", error);
    }
  }
  this.descargarSolicitud = (numeroPermiso) => {
    // Actualiza boton descargando...
    var btnDescargar = document.getElementById('btn-descargar');
    btnDescargar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="animate-spin bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
    Descargando...
    `;
    // Convertir el html en imagen y luego en pdf
    this.convertirHTMLaPDF(this.generarPdf, numeroPermiso);
  }
  this.cerrarSolicitud = () => {
    // ocultar vista previa de solicitud
    this.visorPdf.classList.add('hidden');
    this.generarPdf.innerHTML = ``;
  }
  this.GenerarPDF = (id_funcionario_solicitud) => {
    var formGenerar = new FormData();
    formGenerar.append('id_funcionario_solicitud', id_funcionario_solicitud);
    fetch("../controllers/generarPdf.php", { method: "POST", body: formGenerar })
      .then((resultado) => resultado.json())
      .then((data) => {
        const solicitudPermiso = this.formatearNumero(data.numero, 9);
        const cargo = data.detalle;
        const salida = new Date(`${data.fecha_salida} ${data.hora_salida}`);
        const entrada = new Date(`${data.fecha_entrada} ${data.hora_entrada}`);
        const diferenciaTiempo = Math.abs(salida - entrada);
        const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
        // Mostrar vista previa de PDF
        this.visorPdf.classList.remove('hidden');
        // Generar botones
        const btnGenerarPdf = document.getElementById('btn-generar-pdf');
        btnGenerarPdf.innerHTML = `
          <button onclick="appGenerar.descargarSolicitud(${data.numero})" id="btn-descargar" class="flex gap-2 items-center rounded-md shadow-sm bg-green-500 px-4 py-3 mb-4 text-base font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            Descargar
          </button>
          <button onclick="appGenerar.cerrarSolicitud()" class="flex gap-2 items-center rounded-md shadow-sm bg-red-500 px-4 py-3 mb-4 text-base font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
            Cerrar
          </button>
        `;
        // Generar Vista previa del PDF
        this.generarPdf.innerHTML = `
          <div class="text-sm w-full border border-2 border-black rounded-lg overflow-hidden">
            <div class="flex items-center justify-around p-4 bg-cyan-100">
              <img class="h-20" src="../../public/images/ElGuaboParaPDF.png">
              <div class="flex flex-col justify-center text-center">
                <h1 class="text-lg font-semibold">
                  GOBIERNO MUNICIPAL DEL CANTÓN EL GUABO
                </h1>
                <h2 class="text-base font-semibold -pt-2 pb-3">
                  CREADO POR D.S. 2834 DEL 30 DE AGOSTO DEL 1978
                </h2>
                <div class="flex border border-black rounded-md overflow-hidden">
                  <div class="w-full -pt-2 pb-3 bg-black text-white font-semibold">Solicitud de permiso</div>
                  <div class="w-full -pt-2 pb-3 bg-white">${solicitudPermiso}</div>
                </div>
              </div>
            </div>

            <div class="bg-white">
              <div class="capitalize border-b border-stone-600 -pt-2 pb-3 pl-3"><b>Nombres:</b> ${data.apellidos} ${data.nombres}</div>
              <div class="capitalize border-b border-stone-600 -pt-2 pb-3 pl-3"><b>Cargo:</b> ${cargo}</div>
              <div class="capitalize border-b border-stone-600 -pt-2 pb-3 pl-3"><b>Dirección:</b> ${data.direccion}</div>

              <div class="grid grid-cols-2">
                <div class="border-r border-stone-600">
                  <div class="text-center border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <b>TIEMPO</b>
                  </div>
                  <div class="border-b border-stone-600 -pt-2 pb-3 pl-3"><b>Tiempo de permiso:</b> ${dias} días y ${horas} horas.</div>
                  <div class="grid grid-cols-2 border-b border-stone-600">                  
                    <div class="border-r border-stone-600 -pt-2 pb-3 pl-3"><b>Fecha salida:</b> ${data.fecha_salida}</div>
                    <div class="-pt-2 pb-3 pl-3"><b>Fecha entrada:</b> ${data.fecha_entrada}</div>
                  </div>
                  <div class="grid grid-cols-2 border-b border-stone-600">                  
                    <div class="border-r border-stone-600 -pt-2 pb-3 pl-3"><b>Hora salida:</b> ${data.hora_salida}</div>
                    <div class="-pt-2 pb-3 pl-3"><b>Hora entrada:</b> ${data.hora_entrada}</div>
                  </div>
                  <div class="border-b border-stone-600 -pt-2 pb-3 pl-3"><b>Fecha de solicitud:</b> ${data.fecha}</div>
                </div>

                <div>
                  <div class="text-center border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <b>RAZÓN</b>
                  </div>
                  <div class="flex border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <div class="w-full"><b>Particular:</b></div>
                    <div class="w-full">
                      [&nbsp; ${data.descripcion == 'particular' ? 'X' : '&nbsp;&nbsp;'} &nbsp;]
                    </div>
                  </div>
                  <div class="flex border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <div class="w-full"><b>Calamidad domestica:</b></div>
                    <div class="w-full">
                      [&nbsp; ${data.descripcion == 'calamidad domestica' ? 'X' : '&nbsp;&nbsp;'} &nbsp;]
                    </div>
                  </div>
                  <div class="flex border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <div class="w-full"><b>Enfermedad:</b></div>
                    <div class="w-full">
                      [&nbsp; ${data.descripcion == 'enfermedad' ? 'X' : '&nbsp;&nbsp;'} &nbsp;]
                    </div>
                  </div>
                  <div class="flex border-b border-stone-600 -pt-2 pb-3 pl-3">
                    <div class="w-full"><b>Otro:</b></div>
                    <div class="w-full">
                      [&nbsp; ${data.descripcion == 'otro' ? 'X' : '&nbsp;&nbsp;'} &nbsp;]
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid border-b border-stone-600 -pt-2 pb-3 pl-3">
                <b class="pb-3">Observaciones:</b>
                <div class="-pt-2 pb-3 min-h-20">
                  ${data.observacion}
                </div>
              </div>
            </div>

            <div class="bg-white flex text-center">
              <div class="w-1/4 p-4 border-r border-stone-600">
                <img class="h-28 m-auto" src="../../public/images/EscudoDeElGuaboParaPDF.png">
              </div>
              <div class="flex justify-center items-end w-1/4 p-4 -pt-2 pb-3 pl-3 border-r border-stone-600">
                <b>SERVIDOR</b>
              </div>
              <div class="flex justify-center items-end w-1/4 p-4 -pt-2 pb-3 pl-3 border-r border-stone-600">
                <b>JEFE INMEDIATO</b>
              </div>
              <div class="flex justify-center items-end w-1/4 p-4 -pt-2 pb-3 pl-3 ">
                <b>DIRECTOR DE TALENTO HUMANO</b>
              </div>
            </div>
          </div
        `;
      })
      .catch((error) => console.log(error));
  }
});

// Solo existe en: solicitud-index.php
var tablaCompleta = document.getElementById('tabla-completa');
var tablaSimple = document.getElementById('tabla-simple');
if (tablaCompleta) {
  appGenerar.listadoGenerarCompleta();
} else if (tablaSimple) {
  appGenerar.listadoGenerarSimple();
}