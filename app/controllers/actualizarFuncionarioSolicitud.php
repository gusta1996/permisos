<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'id_funcionario_solicitud' => $_POST['id_funcionario_solicitud'],
    'id_solicitud' => $_POST['id_solicitud'],
    'id_tiempo' => $_POST['id_tiempo'],
    'id_razon' => $_POST['id_razon'],
    'fecha_salida' => $_POST['fecha_salida'],
    'fecha_entrada' => $_POST['fecha_entrada'],
    'hora_salida' => $_POST['hora_salida'],
    'hora_entrada' => $_POST['hora_entrada'],
    'razon' => strtolower($_POST['razon']),
    'observacion' => $_POST['observacion']
);

echo json_encode(funcionarioSolicitud::actualizarFuncionarioSolicitud($arrayName));