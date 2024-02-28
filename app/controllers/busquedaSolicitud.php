<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'tipo' => $_POST['tipo'],
    'pagina' => $_POST['pagina']
);

if (isset($_POST['id']) && $_POST['rol'] == 'autorizador') {
    echo json_encode(funcionarioSolicitud::busquedaFuncionarioSolicitudAutorizador($arrayName, $_POST['id']));
} else {
    echo json_encode(funcionarioSolicitud::busquedaFuncionarioSolicitud($arrayName));
}