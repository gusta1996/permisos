<?php
require_once '../models/unidad-model.php';
echo json_encode(Unidad::obtenerUnidad($_POST['id_unidad']));