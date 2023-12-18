<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'id_cargo' => $_POST['id_cargo'],
    'detalle' => $_POST['detalle'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Cargo::actualizarCargo($arrayName));