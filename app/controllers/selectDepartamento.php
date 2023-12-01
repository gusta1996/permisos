<?php
require_once '../models/departamento-model.php';
echo json_encode(Departamento::selectDepartamento());