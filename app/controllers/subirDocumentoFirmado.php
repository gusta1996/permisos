<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'numero_solicitud' => $_POST['numero_solicitud'],
    'id_funcionario_solicitud' => $_POST['id_funcionario_solicitud']
);
// comprobar el documento firmado
if ( isset($_FILES['docFirmado']) ) {
    // Define la ruta y nombre del archivo
    $rutaArchivo = '../pdf/Solicitud_permiso_' . $_POST['numero_solicitud'].'_firmado.pdf';

    // Mover el archivo subido a la carpeta de destino
    move_uploaded_file($_FILES['docFirmado']['tmp_name'], $rutaArchivo);
}
echo json_encode(funcionarioSolicitud::guardarDocumentoFirmado($arrayName));