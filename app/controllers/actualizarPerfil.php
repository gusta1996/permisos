<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'nombres' => $_POST['nombresPerfil'],
    'apellidos' => $_POST['apellidosPerfil'],
    'cedula' => $_POST['cedulaPerfil'],
    'direccion' => $_POST['direccionPerfil'],
    'telefono' => $_POST['telefonoPerfil'],
    'email' => $_POST['emailPerfil']
);
if (!empty($_FILES['imagenPerfil'])) {
    $arrayName['imagen'] = $_FILES['imagenPerfil'];
}
echo json_encode(Funcionario::actualizarPerfil($arrayName));