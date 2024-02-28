<?php
require_once '../models/funcionarioSolicitud-model.php';

if (isset($_GET['id']) && $_GET['rol'] == 'estandar') {
    echo json_encode(funcionarioSolicitud::ListadoGenerarSimple( $_GET['page'], $_GET['id'] ));
} elseif (isset($_GET['id']) && $_GET['rol'] == 'autorizador') {
    echo json_encode(funcionarioSolicitud::ListadoGenerarAutorizador( $_GET['page'], $_GET['id'] ));
} else {
    echo json_encode(funcionarioSolicitud::ListadoGenerarCompleto( $_GET['page'] ));
}
