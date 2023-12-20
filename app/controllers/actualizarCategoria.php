<?php
require_once '../models/categoria-model.php';
$arrayName = array(
    'id_categoria' => $_POST['id_categoria'],
    'detalle' => strtolower($_POST['detalle']),
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Categoria::actualizarCategoria($arrayName));