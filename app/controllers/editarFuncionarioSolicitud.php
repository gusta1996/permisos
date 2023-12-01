<?php
require_once '../models/funcionarioSolicitud-model.php';
echo json_encode(funcionarioSolicitud::obtenerFuncionarioSolicitud($_POST['id_funcionario_solicitud']));