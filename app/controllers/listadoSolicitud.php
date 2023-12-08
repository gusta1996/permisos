<?php
require_once '../models/funcionarioSolicitud-model.php';

if (isset($_GET['id'])) {
    echo json_encode(funcionarioSolicitud::listaFuncionarioSolicitudSimple( $_GET['page'], $_GET['id'] ));
} else {
    echo json_encode(funcionarioSolicitud::listaFuncionarioSolicitudCompleto( $_GET['page'] ));
}