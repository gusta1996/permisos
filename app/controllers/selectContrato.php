<?php
require_once '../models/contrato-model.php';
echo json_encode(Contrato::selectContrato());