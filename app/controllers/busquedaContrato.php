<?php
require_once '../models/contrato-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Contrato::busquedaContrato($arrayName));