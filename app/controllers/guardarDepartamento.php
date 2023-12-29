<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'area' => $_POST['area'],
    'estado' => 'activo'
);

echo json_encode(Departamento::guardarDepartamento($arrayName));