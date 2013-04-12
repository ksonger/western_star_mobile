<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/strings', 'getStrings');
$app->get('/movies', 'getMovies');
$app->get('/movies/:id', 'getMovie');
$app->post('/movies', 'addMovie');
$app->put('/movies/:id', 'updateMovie');
$app->delete('/movies/:id', 'deleteMovie');


$app->run();

function getStrings()	{
	$sql = "select * FROM strings";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$strings = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
        echo json_encode($strings);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getManifest() {
	$sql = "select * FROM assets";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$assets = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($assets);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAsset($id) {
	$sql = "SELECT * FROM assets WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$asset = $stmt->fetchObject();
		$db = null;
		return json_encode($asset);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addAsset()  {
    $request = Slim::getInstance()->request();
    $session = json_decode($request->getBody());
    $asset_id = setMovie($session->movie, $session->year);

    echo json_encode(getMovie($movie_id));
}

function setMovie($name, $year)    {
    $sql = "INSERT INTO bestmovies (movie, year) VALUES(:movie, :year)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("movie", $movie);
        $stmt->bindParam("year", $year);
        $stmt->execute();
        return $db->lastInsertId();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateMovie($movie, $year)    {
    $sql = "UPDATE bestmovies SET movie=:movie, year=:year, WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("movie", $movie);
        $stmt->bindParam("year", $year);
        $stmt->execute();
        return $db->lastInsertId();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteMovie($id) {
	$sql = "DELETE FROM bestmovies WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="ksonger";
	$dbpass="wR8yezad";
	$dbname="western_star";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>