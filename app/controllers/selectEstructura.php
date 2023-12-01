<?php
require_once '../models/estructura-model.php';
echo json_encode(Estructura::selectEstructura());