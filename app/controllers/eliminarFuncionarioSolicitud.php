<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'id_funcionario_solicitud' => $_POST['id_funcionario_solicitud'],
    'estado' => 'Anulado'
);

echo json_encode(funcionarioSolicitud::eliminarFuncionarioSolicitud( $arrayName ));