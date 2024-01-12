<?php
require_once '../models/proceso-model.php';
$arrayName = array(
    'id_proceso' => $_POST['id_proceso'],
    'detalle' => strtolower($_POST['detalle']),
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Proceso::actualizarProceso($arrayName));