<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'id_departamento' => $_POST['id_departamento'],
    'detalle' => strtolower($_POST['detalle']),
    'area' => $_POST['area'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Departamento::actualizarDepartamento($arrayName));