<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'id_estructura' => $_POST['id_estructura'],
    'cargo' => $_POST['cargo'],
    'seccion' => $_POST['seccion'],
    'unidad' => $_POST['unidad'],
    'direccion' => $_POST['direccion'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Estructura::actualizarEstructura($arrayName));