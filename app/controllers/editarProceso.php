<?php
require_once '../models/proceso-model.php';
echo json_encode(Proceso::obtenerProceso($_POST['id_proceso']));