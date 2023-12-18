<?php
require_once '../models/area-model.php';
$arrayName = array(
    'detalle' => $_POST['detalle'],
    'estado' => 'activo',
    'categoria' => $_POST['categoria']
);

echo json_encode(Area::guardarArea($arrayName));