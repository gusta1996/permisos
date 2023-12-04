<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'id_funcionario' => $_POST['id_funcionario'],
    'nombres' => $_POST['nombres'],
    'apellidos' => $_POST['apellidos'],
    'cedula' => $_POST['cedula'],
    'telefono' => $_POST['telefono'],
    'direccion' => $_POST['direccion'],
    'email' => $_POST['email'],
    'username' => $_POST['username'],
    'id_rol' => $_POST['id_rol'],
    'estado' => $_POST['estado']
);

echo json_encode(Funcionario::actualizarFuncionarios($arrayName));