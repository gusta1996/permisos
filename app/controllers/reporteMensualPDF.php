<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'funcionario' => $_POST['funcionario'],
    'direccion' => $_POST['direccion'],
    'fecha_mes' => $_POST['fecha_mes'],
    'fecha_ano' => $_POST['fecha_ano']
);

echo json_encode(funcionarioSolicitud::mostrarReporteMensual($arrayName));