<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Departamento::busquedaDepartamento($arrayName));