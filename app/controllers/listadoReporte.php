<?php
require_once '../models/funcionarioSolicitud-model.php';
echo json_encode(funcionarioSolicitud::mostrarReporte( $_GET['page'] ));