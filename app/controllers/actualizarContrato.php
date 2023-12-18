<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'id_contrato' => $_POST['id_contrato'],
    'detalle' => $_POST['detalle'],
    'tipo' => $_POST['tipo'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Contrato::actualizarContrato($arrayName));