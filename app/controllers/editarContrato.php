<?php
require_once '../models/contrato-model.php';
echo json_encode(Contrato::obtenerContrato($_POST['id_contrato']));