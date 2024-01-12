<?php
require_once '../models/proceso-model.php';
echo json_encode(Proceso::mostrarProcesos( $_GET['page'] ));