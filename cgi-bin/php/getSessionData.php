<?php
session_start();
// echo json_encode();
$aRes = $_SESSION;

require_once('Services_JSON.php');
$oJson = new Services_JSON();
echo $oJson->encode($aRes);


?>