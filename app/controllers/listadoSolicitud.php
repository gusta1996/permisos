<?php
require_once '../models/funcionarioSolicitud-model.php';

if (isset($_GET['id']) && $_GET['rol'] == 'estandar') {
    echo json_encode(funcionarioSolicitud::listaFuncionarioSolicitudSimple( $_GET['page'], $_GET['id'] ));
} elseif (isset($_GET['id']) && $_GET['rol'] == 'autorizador') {
    echo json_encode(funcionarioSolicitud::listaFuncionarioSolicitudAutorizador( $_GET['page'], $_GET['id'] ));
} else {
    echo json_encode(funcionarioSolicitud::listaFuncionarioSolicitudCompleto( $_GET['page'] ));
}