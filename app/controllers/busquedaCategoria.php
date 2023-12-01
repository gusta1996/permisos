<?php
require_once '../models/categoria-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Categoria::busquedaCategoria($arrayName));