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
    'username' => strtolower($_POST['username']),
    'id_rol' => $_POST['id_rol'],
    'estado' => strtolower($_POST['estado'])
);

echo json_encode(Funcionario::actualizarFuncionarios($arrayName));