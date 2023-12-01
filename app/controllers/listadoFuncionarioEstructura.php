<?php
require_once '../models/funcionarioEstructura-model.php';
echo json_encode(funcionarioEstructura::mostrarFuncionarioEstructuras( $_GET['page'] ));