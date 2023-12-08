const appReporte = new (function () {
  this.tbodyReporte = document.getElementById('tbodyReporte');
  this.visorReporte = document.getElementById('visor-reporte');
  this.btnReportePDF = document.getElementById('btn-reporte-pdf');
  this.reportePagina = document.getElementById('reporte-pdf');
  this.selectMeses = document.getElementById('select-meses');
  this.busqueda = document.getElementById('busqueda-reporte');
  this.busquedaTipo = document.getElementById('busqueda-tipo');
  this.paginacion = document.getElementById('paginacion');


  this.listadoReporte = (pagina) => {
    // al cargar la pagina, la variable pagina es igual 1
    var pagina = !pagina ? 1 : pagina;
    fetch("../controllers/listadoReporte.php?page=" + pagina)
      .then(response => response.json())
      .then(data => {
        // Datos de la lista y total de paginas
        let item = data.resultado;
        let totalPaginas = data.totalPaginas;

        let html = '';
        for (let i = 0; i < item.length; i++) {
          let salida = new Date(`${item[i].fecha_salida} ${item[i].hora_salida}`);
          let entrada = new Date(`${item[i].fecha_entrada} ${item[i].hora_entrada}`);
          let diferenciaTiempo = Math.abs(salida - entrada);
          let dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
          let horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
          html += `
                  <tr class="h-14 border-b last:border-b-0 border-b-white-100">
                      <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                      <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                      <td class="text-slate-700 pr-4">${item[i].apellidos} ${item[i].nombres}</td>
                      <td class="text-slate-700 pr-4">${item[i].razon}</td>
                      <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                      <td class="text-slate-700 pr-4">${dias} días y ${horas} horas</td>
                      <td class="font-semibold ${item[i].fs_estado == 'Aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'Anulado' ? 'text-red-600' : ''}${item[i].fs_estado == 'Pendiente' ? 'text-amber-600' : ''}">${item[i].fs_estado}</td>
                    </tr>
                  `;
        }
        this.tbodyReporte.innerHTML = html;
        this.paginacionReporte(pagina, totalPaginas, false);
      });
  }
  this.busquedaReporte = (pagina) => {
    // al cargar la pagina, la variable pagina es igual 1
    var pagina = !pagina ? 1 : pagina;
    // Si existe texto de busqueda, buscar
    var text = this.busqueda.value;
    var formBusqueda = new FormData();
    formBusqueda.append('busqueda', text);
    formBusqueda.append('tipo', this.busquedaTipo.value);
    formBusqueda.append('pagina', pagina);
    fetch("../controllers/busquedaReporte.php", { method: "POST", body: formBusqueda })
      .then(response => response.json())
      .then(data => {
        // Datos de la lista y total de paginas
        let item = data.resultado;
        let totalPaginas = data.totalPaginas;
        let html = '';

        if (item != '') {
          for (let i = 0; i < item.length; i++) {
            let salida = new Date(`${item[i].fecha_salida} ${item[i].hora_salida}`);
            let entrada = new Date(`${item[i].fecha_entrada} ${item[i].hora_entrada}`);
            let diferenciaTiempo = Math.abs(salida - entrada);
            let dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
            let horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
            html += `
                        <tr class="h-14 border-b last:border-b-0 border-b-white-100">
                            <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                            <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                            <td class="text-slate-700 pr-4">${item[i].apellidos} ${item[i].nombres}</td>
                            <td class="text-slate-700 pr-4">${item[i].razon}</td>
                            <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                            <td class="text-slate-700 pr-4">${dias} días y ${horas} horas</td>
                            <td class="font-semibold ${item[i].fs_estado == 'Aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'Anulado' ? 'text-red-600' : ''}${item[i].fs_estado == 'Pendiente' ? 'text-amber-600' : ''}">${item[i].fs_estado}</td>
                          </tr>
                        `;
          }
        } else {
          html += '<p class="w-full my-5">No se encontró resultados.</p>';
        }

        this.tbodyReporte.innerHTML = html;
        this.paginacionReporte(pagina, totalPaginas, true);
      });
  }
  this.paginacionReporte = (pagina_actual, total_paginas, buscador) => {
    let html = '';
    if (buscador == false) {
      // Paginacion para la lista
      if (pagina_actual > 1) {
        html += `
                    <a href="javascript:appReporte.listadoReporte(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appReporte.listadoReporte(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
      }
    } else {
      // Paginacion para la busqueda en la lista
      if (pagina_actual > 1) {
        html += `
                    <a href="javascript:appReporte.busquedaReporte(${pagina_actual - 1})" class="btn-anterior border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Anterior</a>
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
                    <a href="javascript:appReporte.busquedaReporte(${pagina_actual + 1})" class="btn-siguiente border border-slate-200 bg-slate-100 color-slate-600 p-4 rounded-md">Siguiente</a>
                `;
      }
    }
    this.paginacion.innerHTML = html;
  }
  this.selectMesDescarga = () => {
    fetch("../controllers/selectMesDescarga.php")
      .then((resultado) => resultado.json())
      .then((data) => {
        data.forEach((item) => {
          this.selectMeses.innerHTML += `
          <option value="${item.ano}-${item.mesnumero}">${item.mes} ${item.ano}</option>
          `;
        })
      })
      .catch((error) => console.log(error));
  }
  this.descargarReporte = (fecha_mensual) => {
    var btnDescargar = document.getElementById('btn-descargar-reporte');
    // Mostrar icono "cargando"
    btnDescargar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="animate-spin bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
      </svg>Descargando...
    `;
    // Genera y descarga el PDF del reporte
    // let fecha = new Date();
    let doc = new jsPDF('p', 'pt', 'a4');
    let margin = 20;
    let scale = (doc.internal.pageSize.width - margin * 2) / this.reportePagina.clientWidth;
    doc.html(this.reportePagina, {
      x: margin,
      y: margin,
      html2canvas: {
        scale: scale,
      },
      callback: function (doc) {
        //Descarga pdf
        doc.save(fecha_mensual + ".pdf");
        // Quita el icono "Cargando"
        btnDescargar.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>Descargar
        `;
      }
    });

  }
  this.convierteFormatoFecha = (fecha) => {
    let partes = fecha.split('-');
    let ano = partes[0];
    let mes = partes[1];

    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let mesEnPalabras = meses[parseInt(mes) - 1];
    textoFecha = mesEnPalabras + ' ' + ano;
    return textoFecha;
  }
  this.reporteMensualPDF = () => {
    // Visualizar reporte
    this.visorReporte.classList.remove('hidden');
    // Generar botones
    this.btnReportePDF.innerHTML = `
     <button onclick="appReporte.descargarReporte('reporte_${this.selectMeses.value}')" id="btn-descargar-reporte" class="flex gap-2 items-center rounded-md shadow-sm bg-green-500 px-4 py-3 mb-4 text-base font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
           <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
           <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
       </svg>
       Descargar
     </button>
     <button onclick="appReporte.cerrarReporte()" class="flex gap-2 items-center rounded-md shadow-sm bg-red-500 px-4 py-3 mb-4 text-base font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
           <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
       </svg>
       Cerrar
     </button>
   `;
    // Enviar fecha_mes para perticion de datos
    let formReportePDF = new FormData();
    formReportePDF.append('fecha_mes', this.selectMeses.value);
    fetch("../controllers/reporteMensualPDF.php", { method: "POST", body: formReportePDF })
      .then((resultado) => resultado.json())
      .then((data) => {
        let fechaMes = this.convierteFormatoFecha(this.selectMeses.value);
        let filas = '';
        data.forEach(item => {
          let salida = new Date(`${item.fecha_salida} ${item.hora_salida}`);
          let entrada = new Date(`${item.fecha_entrada} ${item.hora_entrada}`);
          let diferenciaTiempo = Math.abs(salida - entrada);
          let dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
          let horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
          filas += `
            <tr class="h-14 border-b last:border-b-0 border-b-white-100">
                <td id="numero-solicitud" class="text-slate-700 -pt-2 pb-2 pr-4">${item.numero}</td>
                <td class="text-slate-700 -pt-2 pb-2 pr-4">${item.apellidos} ${item.nombres}</td>
                <td class="text-slate-700 -pt-2 pb-2 pr-4">${item.razon}</td>
                <td class="text-slate-700 -pt-2 pb-2 pr-4 whitespace-nowrap">${item.fecha}</td>
                <td class="text-slate-700 -pt-2 pb-2 pr-4">${dias} días y ${horas} horas</td>
                <td class="font-semibold -pt-2 pb-2 ${item.fs_estado == 'Aprobado' ? 'text-green-600' : ''}${item.fs_estado == 'Anulado' ? 'text-red-600' : ''}${item.fs_estado == 'Pendiente' ? 'text-amber-600' : ''}">${item.fs_estado}</td>
              </tr>
            `;
        });
        thead = `
          <tr class="h-14 border-b border-b-slate-400">
            <th class="hidden font-medium pr-4">ID</th>
            <th class="font-medium pr-4">No.</th>
            <th class="font-medium pr-4">Nombres</th>
            <th class="font-medium pr-4">Razón</th>
            <th class="font-medium pr-4">Fecha</th>
            <th class="font-medium pr-4">Tiempo</th>
            <th class="font-medium">Estado</th>
          </tr>
        `;
        tbody = `
          <tbody id="tbodyReporte">
            ${filas}
          </tbody>
        `;
        table = `
          <table class="w-full text-xs md:text-sm text-left">
            ${thead}
            ${tbody}
          </table>
        `;
        let html = `
          <div class="w-full bg-gray-100 p-2 rounded-md mb-4">
            <h1 class="text-lg font-bold -pt-2 pb-3 text-center">Reporte de solicitudes de permisos del G.A.D. El Guabo – Municipio de El Guabo</h1>
          </div>
          <p class="mb-4"><b>Fecha:</b>  ${fechaMes}</p>
          ${table}
        `;
        appReporte.reportePagina.innerHTML = html;
      })
      .catch((error) => console.log(error));
  }
  this.cerrarReporte = () => {
    // ocultar vista previa del reporte
    this.visorReporte.classList.add('hidden');
    this.reportePagina.innerHTML = ``;
  }

});
appReporte.listadoReporte();
appReporte.selectMesDescarga();