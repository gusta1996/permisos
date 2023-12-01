<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Cargo::busquedaCargo($arrayName));