<?php
require_once '../models/departamento-model.php';

if ( isset($_GET['id_area'])) {
    // Muestra los departamentos de 1 area
    echo json_encode(Departamento::selectDepartamentoIdArea($_GET['id_area']));
} else {
    // Muestra todos los departamentos
    echo json_encode(Departamento::selectDepartamento());
}