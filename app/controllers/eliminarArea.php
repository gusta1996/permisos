<?php
require_once '../models/area-model.php';
$arrayName = array(
    'id_area' => $_POST['id_area'],
    'estado' => 'anulado'
);

echo json_encode(Area::eliminarArea( $arrayName ));