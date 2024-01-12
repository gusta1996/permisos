<?php
require_once '../models/unidad-model.php';
echo json_encode(Unidad::mostrarUnidades( $_GET['page'] ));