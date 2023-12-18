<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'id_seccion' => $_POST['id_seccion'],
    'estado' => 'anulado'
);

echo json_encode(Seccion::eliminarSeccion( $arrayName ));