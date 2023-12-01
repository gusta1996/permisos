<?php
require_once '../models/funcionarioEstructura-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'id_contrato' => $_POST['id_contrato'],
    'id_estructura' => $_POST['id_estructura'],
    'estado' => 'Activo'
);

echo json_encode(funcionarioEstructura::guardarFuncionarioEstructura($arrayName));