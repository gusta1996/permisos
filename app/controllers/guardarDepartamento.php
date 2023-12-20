<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'estado' => 'activo'
);

echo json_encode(Departamento::guardarDepartamento($arrayName));