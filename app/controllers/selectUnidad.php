<?php
require_once '../models/unidad-model.php';

if ( isset($_GET['id_direccion'])) {
    // Muestra las unidades de 1 direccion
    echo json_encode(Unidad::selectUnidadIdDireccion($_GET['id_direccion']));
} else {
    // Muestra todas las unidades
    echo json_encode(Unidad::selectUnidad());
}