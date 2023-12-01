<?php
require_once '../models/seccion-model.php';
echo json_encode(Seccion::obtenerSeccion($_POST['id_seccion']));