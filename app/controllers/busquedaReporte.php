<?php
require_once '../models/funcionarioSolicitud-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'tipo' => $_POST['tipo'],
    'pagina' => $_POST['pagina']
);

echo json_encode(funcionarioSolicitud::busquedaReporte($arrayName));