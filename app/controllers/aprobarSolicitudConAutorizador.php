<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'id_funcionario_solicitud' => $_POST['id_funcionario_solicitud'],
    'estado_autorizador' => 'aprobado'
);

echo json_encode(funcionarioSolicitud::aprobarSolicitudConAutorizador( $arrayName ));