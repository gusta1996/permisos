<?php
require_once '../models/funcionarioEstructura-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'tipo' => $_POST['tipo'],
    'pagina' => $_POST['pagina'],
    'registro' => $_POST['registro']
);

echo json_encode(funcionarioEstructura::busquedaFuncionarioEstructura($arrayName));