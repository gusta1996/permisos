<?php
require_once '../models/categoria-model.php';
$arrayName = array(
    'id_categoria' => $_POST['id_categoria'],
    'estado' => 'Anulado'
);

echo json_encode(Categoria::eliminarCategoria( $arrayName ));