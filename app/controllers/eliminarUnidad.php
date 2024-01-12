<?php
require_once '../models/unidad-model.php';
$arrayName = array(
    'id_unidad' => $_POST['id_unidad'],
    'estado' => 'anulado'
);

echo json_encode(Unidad::eliminarUnidad( $arrayName ));