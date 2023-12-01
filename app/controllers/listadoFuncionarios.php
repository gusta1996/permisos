<?php
require_once '../models/funcionarios-model.php';
echo json_encode(Funcionario::mostrarFuncionarios( $_GET['page'] ));