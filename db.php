<?php
$host = "3306";
$user = "root";
$password = "";
$dbname = "landing_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>