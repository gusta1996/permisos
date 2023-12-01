<?php
require_once '../models/funcionarioEstructura-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'tipo' => $_POST['tipo'],
    'pagina' => $_POST['pagina']
);

echo json_encode(funcionarioEstructura::busquedaFuncionarioEstructura($arrayName));