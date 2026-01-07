<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['nom'])) {
    echo json_encode(["connecte" => true, "nom" => $_SESSION['nom']]);
} else {
    echo json_encode(["connecte" => false]);
}
