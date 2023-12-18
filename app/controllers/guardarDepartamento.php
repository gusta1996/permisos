<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'detalle' => $_POST['detalle'],
    'estado' => 'activo'
);

echo json_encode(Departamento::guardarDepartamento($arrayName));