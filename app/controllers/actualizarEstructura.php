<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'id_estructura' => $_POST['id_estructura'],
    'cargo' => $_POST['cargo'],
    'seccion' => $_POST['seccion'],
    'departamento' => $_POST['departamento'],
    'area' => $_POST['area'],
    'estado' => $_POST['estado']
);

echo json_encode(Estructura::actualizarEstructura($arrayName));