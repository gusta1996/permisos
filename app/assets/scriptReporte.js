const appReporte = new (function () {
  this.tbodyReporte = document.getElementById('tbodyReporte');
  this.btnReportePDF = document.getElementById('btn-reporte-pdf');
  this.reporteMensual = document.getElementById('reporte-mensual');
  this.selectFuncionario = document.getElementById('select-funcionario');
  this.selectDireccion = document.getElementById('select-direccion');
  this.selectMes = document.getElementById('select-mes');
  this.selectAno = document.getElementById('select-ano');
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
        if (item != '') {
          for (let i = 0; i < item.length; i++) {
            let salida = new Date(`${item[i].fecha_salida} ${item[i].hora_salida}`);
            let entrada = new Date(`${item[i].fecha_entrada} ${item[i].hora_entrada}`);
            let diferenciaTiempo = Math.abs(salida - entrada);
            let dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
            let horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
            html += `
                  <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                      <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                      <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                      <td class="text-slate-700 pr-4 leading-5">
                          <div>${item[i].apellidos} ${item[i].nombres}</div>
                          <div>CI: ${item[i].cedula}</div>
                      </td>
                      <td class="text-slate-700 pr-4">${item[i].razon}</td>
                      <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                      <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha_salida}</td>
                      <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha_entrada}</td>
                      <td class="text-slate-700 pr-4">${dias} días y ${horas} horas</td>
                      <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}">${item[i].fs_estado}</td>
                    </tr>
                  `;
          }
        } else {
          html += '<tr class="h-16"><td colspan="8">No se encontró resultados.</td></tr>';
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
              <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                <td class="hidden text-slate-700 pr-4">${item[i].id_funcionario_solicitud}</td>
                <td id="numero-solicitud" class="text-slate-700 pr-4">${item[i].numero}</td>
                <td class="text-slate-700 pr-4 leading-5">
                    <div>${item[i].apellidos} ${item[i].nombres}</div>
                    <div>CI: ${item[i].cedula}</div>
                </td>
                <td class="text-slate-700 pr-4">${item[i].razon}</td>
                <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha}</td>
                <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha_salida}</td>
                <td class="text-slate-700 pr-4 whitespace-nowrap">${item[i].fecha_entrada}</td>
                <td class="text-slate-700 pr-4">${dias} días y ${horas} horas</td>
                <td class="font-medium capitalize ${item[i].fs_estado == 'aprobado' ? 'text-green-600' : ''}${item[i].fs_estado == 'anulado' ? 'text-red-600' : ''}${item[i].fs_estado == 'pendiente' ? 'text-amber-600' : ''}">${item[i].fs_estado}</td>
              </tr>
              `;
          }
        } else {
          html += '<tr class="h-16"><td colspan="8">No se encontró resultados.</td></tr>';
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
  this.filtrosReporte = () => {
    fetch("../controllers/filtrosReporte.php")
      .then((resultado) => resultado.json())
      .then((data) => {
        // Mes
        data.mes.forEach((item) => {
          // Con jquery seleccionar el mes mas reciente en el select #select-mes que usa select2
          $('#select-mes').val(item.mes).trigger('change.select2');
        });
        // Año
        data.ano.forEach((item) => {
          this.selectAno.innerHTML += `
            <option value="${item.ano}">${item.ano}</option>
          `;
        });
        // Funcionarios
        this.selectFuncionario.innerHTML += `<option value="todos" selected="">Todos</option>`;
        data.funcionario.forEach((item) => {
          this.selectFuncionario.innerHTML += `
            <option value="${item.id_funcionario}">${item.apellidos} ${item.nombres}</option>
          `;
        })
        // Area (direccion)
        this.selectDireccion.innerHTML += `<option value="todos" selected="">Todos</option>`;
        data.direccion.forEach((item) => {
          this.selectDireccion.innerHTML += `
            <option value="${item.id_direccion}">${item.direccion}</option>
          `;
        })
      })
      .catch((error) => console.log(error));
  }
  this.descargarReporte = () => {
    // Obtener contenido del reporte
    var contenido = this.reporteMensual.innerHTML;
    // Reemplazar el contenido del body con el contenido del reporte
    document.body.innerHTML = contenido;
    document.body.classList.add('writing-mode');
    // imprimir con el navegador
    window.print();
    // recargar pagina
    window.location.href = '../views/reporte.php?page=descargar';
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
    // Generar botones
    this.btnReportePDF.innerHTML = `
     <button onclick="appReporte.descargarReporte()" id="btn-descargar-reporte" class="flex gap-2 items-center rounded-md shadow-sm bg-green-500 px-4 py-3 mb-4 text-base font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
           <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
           <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
       </svg> Guardar o imprimir
     </button>
   `;
    // Enviar mes y año para peticion de datos
    let formReportePDF = new FormData();
    formReportePDF.append('funcionario', this.selectFuncionario.value);
    formReportePDF.append('direccion', this.selectDireccion.value);
    formReportePDF.append('fecha_mes', this.selectMes.value);
    formReportePDF.append('fecha_ano', this.selectAno.value);
    fetch("../controllers/reporteMensualPDF.php", { method: "POST", body: formReportePDF })
      .then((resultado) => resultado.json())
      .then((data) => {
        let fechaMesAno = this.convierteFormatoFecha(this.selectAno.value + '-' + this.selectMes.value);
        let filas = '';
        if (data.length > 0) {
          data.forEach(item => {
            let salida = new Date(`${item.fecha_salida} ${item.hora_salida}`);
            let entrada = new Date(`${item.fecha_entrada} ${item.hora_entrada}`);
            let diferenciaTiempo = Math.abs(salida - entrada);
            let dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
            let horas = Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24);
            filas += `
              <tr class="h-16 border-b last:border-b-0 border-b-white-100">
                  <td class="text-slate-700 pr-4 leading-5">
                      <div>${item.apellidos} ${item.nombres}</div>
                      <div>CI: ${item.cedula}</div>
                  </td>
                  <td class="text-slate-700 pr-4">${item.direccion}</td>
                  <td class="text-slate-700 pr-4">${item.razon}</td>
                  <td class="text-slate-700 pr-4 whitespace-nowrap">${item.fecha}</td>
                  <td class="text-slate-700 pr-4 leading-5 whitespace-nowrap">
                    <div>${item.fecha_salida}</div>
                    <div>${item.fecha_entrada}</div>
                  </td>
                  <td class="text-slate-700 pr-4">${dias} días y ${horas} horas</td>
                  <td class="font-medium capitalize ${item.fs_estado == 'aprobado' ? 'text-green-600' : ''}${item.fs_estado == 'anulado' ? 'text-red-600' : ''}${item.fs_estado == 'pendiente' ? 'text-amber-600' : ''}">${item.fs_estado}</td>
                </tr>
              `;
          });
        } else {
          filas += `
            <tr class="h-16">
              <td colspan="8">No se encontró resultados.</td>
            </tr>
          `;
        }
        thead = `
          <tr class="h-16 border-b border-b-slate-400">
            <th class="font-medium pr-4">Funcionario</th>
            <th class="font-medium pr-4">Área</th>
            <th class="font-medium pr-4">Razón</th>
            <th class="font-medium pr-4">Fecha solicitud</th>
            <th class="font-medium pr-4 leading-5">
              <div>Salida</div>
              <div>Retorno</div>
            </th>
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
          <table class="w-full text-xs text-left">
            ${thead}
            ${tbody}
          </table>
        `;
        let html = `
          <div class="bg-white rounded-md shadow-sm mb-6">
            <div class="p-4 rounded-md mb-4">
              <div class="w-full bg-gray-100 p-2 rounded-md mb-4">
                <h1 class="text-lg font-bold text-center">Reporte de solicitudes de permisos del G.A.D. El Guabo – Municipio de El Guabo</h1>
              </div>
              <p class="mb-4"><b>Fecha:</b>  ${fechaMesAno}</p>
              ${table}
            </div>
          </div>
        `;
        appReporte.reporteMensual.innerHTML = html;
      })
      .catch((error) => console.log(error));
  }
});

var tbodyReporte = document.getElementById('tbodyReporte');
var filtros = document.getElementById('filtros-reporte');

if (tbodyReporte) {
  // Solo existe en: reporte-index.php
  appReporte.listadoReporte();
} else if (filtros) {
  // Solo existe en: reporte-descargar.php
  appReporte.filtrosReporte();
}