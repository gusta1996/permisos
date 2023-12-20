<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'id_contrato' => $_POST['id_contrato'],
    'detalle' => strtolower($_POST['detalle']),
    'tipo' => strtolower($_POST['tipo']),
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Contrato::actualizarContrato($arrayName));