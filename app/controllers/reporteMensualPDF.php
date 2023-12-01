<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'fecha_mes' => $_POST['fecha_mes']
);

echo json_encode(funcionarioSolicitud::mostrarReporteMensual($arrayName));