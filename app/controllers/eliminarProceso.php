<?php
require_once '../models/proceso-model.php';
$arrayName = array(
    'id_proceso' => $_POST['id_proceso'],
    'estado' => 'anulado'
);

echo json_encode(Proceso::eliminarProceso( $arrayName ));