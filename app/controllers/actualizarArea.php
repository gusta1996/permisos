<?php
require_once '../models/area-model.php';
$arrayName = array(
    'id_area' => $_POST['id_area'],
    'detalle' => strtolower($_POST['detalle']),
    'categoria' => $_POST['categoria'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Area::actualizarArea($arrayName));