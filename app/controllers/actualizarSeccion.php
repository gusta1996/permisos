<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'id_seccion' => $_POST['id_seccion'],
    'detalle' => $_POST['detalle'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Seccion::actualizarSeccion($arrayName));