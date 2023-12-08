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
if ( $_FILES['imagenPerfil'] != null ) {
    $arrayName['imagen'] = $_FILES['imagenPerfil'];
} else {
    $arrayName['imagen'] = null;
}
echo json_encode(Funcionario::actualizarPerfil($arrayName));