<?php
$servername = "bjbcrnej0i2hxjanz1c7-mysql.services.clever-cloud.com";
$username = "u7bpy8rz18std4ed";
$password = "YEW3nhvWMOYgMgxK4nPT";
$dbname = "bjbcrnej0i2hxjanz1c7";
$port = "3306";

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}