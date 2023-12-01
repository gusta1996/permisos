<?php
require_once '../models/estructura-model.php';
echo json_encode(Estructura::obtenerEstructura($_POST['id_estructura']));