<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('content-type: application/json; charset=utf-8');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");





$count =  $_POST['count'];

	
$url = 'https://fishki.ua/front-test/?count='.$count.'&offset='.$count.'';

$obj = file_get_contents("php://input");

$result = file_get_contents($url, false, stream_context_create(array(
    'https' => array(
        'method'  => 'get',
        'cache' => false,
        'header'  => 'Content-type: application/json; charset=utf-8',
        'content' => $obj
       
    )
)));








echo json_encode($result);

	




