<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'estado' => 'Anulado'
);

echo json_encode(Funcionario::eliminarFuncionarios( $arrayName ));