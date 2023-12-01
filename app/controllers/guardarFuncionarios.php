<?php
require_once '../models/funcionarios-model.php';
$arrayName = array(
    'nombres' => $_POST['nombres'],
    'apellidos' => $_POST['apellidos'],
    'cedula' => $_POST['cedula'],
    'direccion' => $_POST['direccion'],
    'telefono' => $_POST['telefono'],
    'email' => $_POST['email'],
    'estado'=> 'Activo',
    'usuario' => $_POST['usuario'],
    'password' => $_POST['password'],
    'id_rol' => $_POST['id_rol'],
    'id_contrato' => $_POST['id_contrato'],
    'id_estructura' => $_POST['id_estructura']
);

echo json_encode(Funcionario::guardarFuncionarios($arrayName));