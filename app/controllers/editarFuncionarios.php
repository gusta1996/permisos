<?php
require_once '../models/funcionarios-model.php';
echo json_encode(Funcionario::obtenerFuncionarios($_POST['id_funcionario']));