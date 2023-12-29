<?php
require_once '../models/area-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'categoria' => $_POST['categoria'],
    'estado' => 'activo'
);

echo json_encode(Area::guardarArea($arrayName));