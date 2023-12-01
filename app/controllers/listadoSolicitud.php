<?php
require_once '../models/funcionarioSolicitud-model.php';
echo json_encode(funcionarioSolicitud::mostrarFuncionarioSolicitudes( $_GET['page'] ));