<?php
require_once '../models/funcionarioEstructura-model.php';
echo json_encode(funcionarioEstructura::obtenerFuncionarioEstructura($_POST['id_funcionario']));