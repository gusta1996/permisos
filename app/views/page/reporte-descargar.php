<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<a href="./reporte.php" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
    </svg>Volver
</a>

<div id="filtros-reporte" class="bg-white rounded-md shadow-sm mb-6">
    <div class="p-4">
        <form action="javascript:void(0);" class="flex items-center gap-4">
            <div class="grid gap-4 w-full grid-cols-6">
                <!-- Funcionario -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                    <div class="mt-2">
                        <select id="select-funcionario" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        </select>
                    </div>
                </div>
                <!-- Área -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Área:</label>
                    <div class="mt-2">
                        <select id="select-direccion" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        </select>
                    </div>
                </div>
                <!-- Mes -->
                <div class="col-span-1">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Mes:</label>
                    <div class="mt-2">
                        <select id="select-mes" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                            <option value="01">Enero</option>
                            <option value="02">Febrero</option>
                            <option value="03">Marzo</option>
                            <option value="04">Abrir</option>
                            <option value="05">Mayo</option>
                            <option value="06">Junio</option>
                            <option value="07">Julio</option>
                            <option value="08">Agosto</option>
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                    </div>
                </div>
                <!-- Año -->
                <div class="col-span-1">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Año:</label>
                    <div class="mt-2">
                        <select id="select-ano" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" onclick="appReporte.reporteMensualPDF()"  class="flex items-center h-[38px] w-max gap-2 rounded-md bg-indigo-500 px-4 py-2 mt-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>Visualizar
            </button>
        </form>
    </div>
</div>

<div id="btn-reporte-pdf" class="flex gap-4 justify-end">

</div>

<div id="reporte-mensual" class="bg-white rounded-md shadow-sm">

</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js"></script>
<script src="../assets/scriptReporte.js"></script>