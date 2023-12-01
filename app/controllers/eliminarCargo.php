<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'id_cargo' => $_POST['id_cargo'],
    'estado' => 'Anulado'
);

echo json_encode(Cargo::eliminarCargo( $arrayName ));