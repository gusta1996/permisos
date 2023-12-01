<?php
require_once '../models/departamento-model.php';
$arrayName = array(
    'id_departamento' => $_POST['id_departamento'],
    'estado' => 'Anulado'
);

echo json_encode(Departamento::eliminarDepartamento( $arrayName ));