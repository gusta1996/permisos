<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'nombres' => strtolower($_POST['nombres']),
    'apellidos' => strtolower($_POST['apellidos']),
    'cedula' => $_POST['cedula'],
    'telefono' => $_POST['telefono'],
    'direccion' => strtolower($_POST['direccion']),
    'email' => strtolower($_POST['email']),
    'username' => strtoupper($_POST['username']),
    'id_rol' => $_POST['id_rol'],
    'f_estado' => strtolower($_POST['f_estado']),
    'u_estado' => strtolower($_POST['u_estado'])
);
if ( isset($_POST['password']) ) { // si la variable está definida...
    $arrayName['password'] = $_POST['password'];
}

echo json_encode(Funcionario::actualizarFuncionarios($arrayName));