<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'id_estructura' => $_POST['id_estructura'],
    'estado' => 'anulado'
);

echo json_encode(Estructura::eliminarEstructura( $arrayName ));