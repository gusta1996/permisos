<?php
require_once '../models/area-model.php';
echo json_encode(Area::selectArea());