<?php
require_once '../models/categoria-model.php';
$arrayName = array(
    'detalle' => $_POST['detalle'],
    'estado' => 'activo'
);

echo json_encode(Categoria::guardarCategoria($arrayName));