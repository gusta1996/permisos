<?php
require_once '../models/unidad-model.php';
$arrayName = array(
    'id_unidad' => $_POST['id_unidad'],
    'detalle' => strtolower($_POST['detalle']),
    'direccion' => $_POST['direccion'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Unidad::actualizarUnidad($arrayName));