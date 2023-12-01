<?php
require_once '../models/funcionarioEstructura-model.php';
echo json_encode(funcionarioEstructura::obtenerIdFuncionarioEstructura($_POST['id_funcionario']));