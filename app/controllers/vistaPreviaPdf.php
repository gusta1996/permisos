<?php
require_once '../models/funcionarioSolicitud-model.php';
echo json_encode(funcionarioSolicitud::obtenerDatosPDF($_POST['id_funcionario_solicitud']));