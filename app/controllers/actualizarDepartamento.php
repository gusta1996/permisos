<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'id_departamento' => $_POST['id_departamento'],
    'detalle' => $_POST['detalle'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Departamento::actualizarDepartamento($arrayName));