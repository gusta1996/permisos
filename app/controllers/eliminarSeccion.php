<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'id_seccion' => $_POST['id_seccion'],
    'estado' => 'Anulado'
);

echo json_encode(Seccion::eliminarSeccion( $arrayName ));