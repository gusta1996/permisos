<?php
require_once '../models/area-model.php';
$arrayName = array(
    'id_area' => $_POST['id_area'],
    'detalle' => strtolower($_POST['detalle']),
    'estado' => strtolower($_POST['estado']),
    'categoria' => $_POST['categoria']
);

echo json_encode(Area::actualizarArea($arrayName));