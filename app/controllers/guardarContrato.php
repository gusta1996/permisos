<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'tipo' => strtolower($_POST['tipo']),
    'estado' => 'activo'
);

echo json_encode(Contrato::guardarContrato($arrayName));