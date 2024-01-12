<?php
require_once '../models/proceso-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'estado' => 'activo'
);

echo json_encode(Proceso::guardarProceso($arrayName));