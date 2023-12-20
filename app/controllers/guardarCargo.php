<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'estado' => 'activo'
);

echo json_encode(Cargo::guardarCargo($arrayName));