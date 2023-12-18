<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'nombres' => strtolower($_POST['nombresPerfil']),
    'apellidos' => strtolower($_POST['apellidosPerfil']),
    'cedula' => $_POST['cedulaPerfil'],
    'direccion' => strtolower($_POST['direccionPerfil']),
    'telefono' => $_POST['telefonoPerfil'],
    'email' => strtolower($_POST['emailPerfil'])
);
if ( isset($_FILES['imagenPerfil']) ) {
    // si la variable de la imagen está definida...
    $arrayName['imagen'] = $_FILES['imagenPerfil'];
}
if( isset($_POST['eliminarImagenPerfil']) ) {
    // si se elimino la imagen seleccionada...
    $arrayName['eliminarImagen'] = $_POST['eliminarImagenPerfil'];
}

echo json_encode(Funcionario::actualizarPerfil($arrayName));