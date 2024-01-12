<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'cargo' => $_POST['cargo'],
    'seccion' => $_POST['seccion'],
    'unidad' => $_POST['unidad'],
    'direccion' => $_POST['direccion'],
    'estado' => 'activo'
);

echo json_encode(Estructura::guardarEstructura($arrayName));