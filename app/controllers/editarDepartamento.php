<?php
require_once '../models/departamento-model.php';
echo json_encode(Departamento::obtenerDepartamento($_POST['id_departamento']));