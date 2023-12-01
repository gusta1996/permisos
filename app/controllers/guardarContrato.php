<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'detalle' => $_POST['detalle'],
    'tipo' => $_POST['tipo'],
    'estado' => 'Activo'
);

echo json_encode(Contrato::guardarContrato($arrayName));