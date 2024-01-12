<?php
require_once '../models/direccion-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Direccion::busquedaDireccion($arrayName));