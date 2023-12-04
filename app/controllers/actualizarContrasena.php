<?php
require_once '../models/usuario-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'actualContrasena' => $_POST['actualContrasena'],
    'nuevaContrasena' => $_POST['nuevaContrasena'],
    'confirmarContrasena' => $_POST['confirmarContrasena']
);

echo json_encode(usuario::actualizarContrasena($arrayName));