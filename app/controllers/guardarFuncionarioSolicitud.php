<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'id_funcionario_estructura' => $_POST['id_funcionario_estructura'],
    'fechaSalida' => $_POST['fechaSalida'],
    'fechaEntrada' => $_POST['fechaEntrada'],
    'horaSalida' => $_POST['horaSalida'],
    'horaEntrada' => $_POST['horaEntrada'],
    'fecha' => date("Y-m-d"),
    'razon' => $_POST['razon'],
    'observacion' => $_POST['observacion'],
    'estado' => 'Pendiente'
);

echo json_encode(funcionarioSolicitud::guardarFuncionarioSolicitud($arrayName));