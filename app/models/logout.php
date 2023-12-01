<?php
require './user_session.php';

$userSession = new UserSession();
$userSession->closeSession();

header('location: ../../index.php');