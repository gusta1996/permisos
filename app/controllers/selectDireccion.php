<?php
require_once '../models/direccion-model.php';
echo json_encode(Direccion::selectDireccion());