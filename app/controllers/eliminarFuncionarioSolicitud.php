<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'numero_solicitud' => $_POST['numero_solicitud'],
    'id_funcionario_solicitud' => $_POST['id_funcionario_solicitud'],
    'estado' => 'anulado'
);
// Borrar pdf
if ( isset($_POST['numero_solicitud']) ) {
    // Define la ruta y nombre del archivo
    $rutaArchivo = '../pdf/Solicitud_permiso_' . $_POST['numero_solicitud'].'_firmado.pdf';

    // Verifica si el archivo existe antes de intentar eliminarlo
    if (file_exists($rutaArchivo)) {
        // Elimina el archivo
        unlink($rutaArchivo);
    }
}

echo json_encode(funcionarioSolicitud::eliminarFuncionarioSolicitud( $arrayName ));