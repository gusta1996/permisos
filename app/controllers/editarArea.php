<?php
require_once '../models/area-model.php';
echo json_encode(Area::obtenerArea($_POST['id_area']));