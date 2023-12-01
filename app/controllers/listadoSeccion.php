<?php
require_once '../models/seccion-model.php';
echo json_encode(Seccion::mostrarSecciones( $_GET['page'] ));