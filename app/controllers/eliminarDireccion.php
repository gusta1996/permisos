<?php
require_once '../models/direccion-model.php';
$arrayName = array(
    'id_direccion' => $_POST['id_direccion'],
    'estado' => 'anulado'
);

echo json_encode(Direccion::eliminarDireccion( $arrayName ));