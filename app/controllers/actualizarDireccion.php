<?php
require_once '../models/direccion-model.php';
$arrayName = array(
    'id_direccion' => $_POST['id_direccion'],
    'detalle' => strtolower($_POST['detalle']),
    'proceso' => $_POST['proceso'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Direccion::actualizarDireccion($arrayName));