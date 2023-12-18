<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'cargo' => $_POST['cargo'],
    'seccion' => $_POST['seccion'],
    'departamento' => $_POST['departamento'],
    'area' => $_POST['area'],
    'estado' => 'activo'
);

echo json_encode(Estructura::guardarEstructura($arrayName));