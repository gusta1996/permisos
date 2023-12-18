<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'id_contrato' => $_POST['id_contrato'],
    'estado' => 'anulado'
);
echo json_encode(Contrato::eliminarContrato( $arrayName ));