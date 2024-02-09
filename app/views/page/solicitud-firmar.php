<!-- visor de pdf -->
<div id="visor-pdf" class="hidden w-full relative z-[100]">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed w-screen inset-0 z-10 overflow-y-auto">
        <div class="flex w-full items-end justify-center px-4 py-8">
            <div class="max-w-[980px] w-full">
                <div id="btn-generar-pdf" class="flex gap-4 float-right">

                </div>
                <div id="generar-pdf" class="w-full float-right">
                </div>
            </div>
        </div>
    </div>
</div>

<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<a href="./solicitud.php" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
    </svg>Volver
</a>

<div class="flex items-center gap-2 bg-emerald-200 rounded-md shadow-sm mb-6 p-4 text-emerald-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
    </svg>
    <p>Una vez subido una firma no se puede reemplazar.</p>
</div>
<?php if ($autorizador || $validador) : ?>
    <div class="flex items-center gap-2 bg-red-200 rounded-md shadow-sm mb-6 p-4 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
        </svg>
        <p>Es su responsabilidad revisar las firmas electronicas.</p>
    </div>
<?php endif; ?>

<div id="crear-solicitud" class="bg-white rounded-md shadow-sm">
    <div class="border-b border-gray-900/10 p-4">
        <?php
        if ($autorizador || $validador) {
            $titulo_seccion = 'Firmar el documento para aprobar la solicitud número '. $_GET['numero_solicitud'];
        } else {
            $titulo_seccion = 'Firmar la solicitud número '. $_GET['numero_solicitud'];
        }
        ?>
        <h2 class="text-lg font-semibold leading-7 text-gray-900"><?php echo $titulo_seccion ?></h2>
    </div>
    <!-- Formulario Solicitud -->
    <div class="sm:flex gap-4 p-4">
        <div class="basis-1/2">
            <span><b>Paso 1:</b> Descarga el documento</span>
            <!-- Vista previa y Descarga el documento-->
            <a onclick="appGenerar.vistaPreviaPdf(<?php echo $_GET['id_funcionario_solicitud']; ?>)" class="mt-4 border border-gray-900/10 rounded-md cursor-pointer flex flex-col items-center justify-center gap-4 h-36">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                    <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                </svg>
                <span class="font-semibold">DESCARGAR PDF</span>
            </a>
        </div>
        <div class="basis-1/2">
            <span><b>Paso 2:</b> Sube el documento firmado</span>
            <div class="mt-4 border border-gray-900/10 rounded-md flex items-center justify-center h-36">
                <!-- Formulario para subir pdf firmado -->
                <form action="javascript:void(0);" onsubmit="appSolicitud.subirDocumentoFirmado(<?php echo $user->getIdFuncionario() . ', ' . $_GET['numero_solicitud'] . ', ' . $_GET['id_funcionario_solicitud']; ?>)" class="flex items-center flex-col gap-2">
                    <input type="file" id="subir-doc-firmado" accept="application/pdf">
                    <button type="submit" id="btn-firmar-solicitud" class="flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js"></script>
<script src="../assets/scriptSolicitud.js"></script>
<script src="../assets/scriptGenerar.js"></script>