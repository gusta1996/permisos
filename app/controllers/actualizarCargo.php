<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'id_cargo' => $_POST['id_cargo'],
    'detalle' => strtolower($_POST['detalle']),
    'seccion' => $_POST['seccion'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Cargo::actualizarCargo($arrayName));