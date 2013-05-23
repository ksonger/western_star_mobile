

<?php

header("Content-type: text/html; charset=utf-8"); 

require 'Slim/Slim.php';

$app = new Slim();
$app->contentType('text/html; charset=utf-8');
$app->get('/strings', 'getStrings');
$app->get('/users', 'getUsers');
$app->get('/assets', 'getAssets');
$app->get('/thumbnails', 'getThumbnails');
$app->get('/images', 'getImages');
$app->get('/interiors_categories', 'getInteriorCategories');
$app->get('/interiors_subcategories', 'getInteriorSubCategories');
$app->get('/interiors_images', 'getInteriorImages');
$app->get('/interiors_nav', 'getInteriorNav');
$app->get('/menu', 'getMenu');

$app->run();


  function utf8_encode_deep(&$input) {
    if (is_string($input)) {
        $input = utf8_encode($input);
    } else if (is_array($input)) {
        foreach ($input as &$value) {
            utf8_encode_deep($value);
        }

        unset($value);
    } else if (is_object($input)) {
        $vars = array_keys(get_object_vars($input));

        foreach ($vars as $var) {
            utf8_encode_deep($input->$var);
        }
    }
}

function getMenu() {
	$sql = "select * FROM library_menu";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$primarymenu = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		$top_level_ids = array(1,2,3,4,5);
		$library_menu = new stdClass();
        $library_menu->primary_nav = array();

        for($i = 0; $i < sizeof($primarymenu); ++$i)	{
        	for($h = 0;$h < sizeof($top_level_ids); ++$h)	{
        		if($primarymenu[$i]->id == $top_level_ids[$h])	{
        			array_push($library_menu->primary_nav, $primarymenu[$i]);
        			$prim = $library_menu->primary_nav[sizeof($library_menu->primary_nav)-1];
		            $child_arr = explode(",", $prim->child_id_set);
		            $prim->child_menus = array();
		            for($j = 0;$j < sizeof($child_arr); ++$j)	{
		            	for($k = 0; $k < sizeof($primarymenu); ++$k)	{
		            		if($child_arr[$j] == $primarymenu[$k]->id)	{
		            			array_push($prim->child_menus, $primarymenu[$k]);
		            			
		            			$child_arr2 = explode(",", $prim->child_menus[sizeof($prim->child_menus)-1]->child_id_set);
		            			$prim->child_menus[sizeof($prim->child_menus)-1]->child_menus = array();
		            			for($l = 0;$l < sizeof($child_arr2); ++$l)	{
					            	for($m = 0; $m < sizeof($primarymenu); ++$m)	{
					            		if($child_arr2[$l] == $primarymenu[$m]->id)	{
					            			array_push($prim->child_menus[sizeof($prim->child_menus)-1]->child_menus, $primarymenu[$m]);
					            		}
					            	}
					            }
					            
		            		}
		            	}
		            }
        		}
        	}
        }
        echo json_encode($library_menu);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getStrings()	{
	$sql = "SET NAMES utf8";	
	try {
		$db = getConnection();

		$stmt = $db->query($sql);  
		$sql = "select * FROM strings";
		$stmt = $db->query($sql);  
		$strings = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
        echo json_encode($strings);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getUsers() {
	$sql = "select * FROM users";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($users);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAssets() {
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

function getThumbnails() {
	$sql = "select * FROM thumbnails";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$thumbs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($thumbs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getImages() {
	$sql = "select * FROM images";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$images = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($images);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getInteriorCategories() {
	$sql = "select * FROM interiors_categories";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$cats = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($cats);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getInteriorSubCategories() {
	$sql = "select * FROM interiors_subcategories";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$subcats = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($subcats);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getInteriorImages() {
	$sql = "select * FROM interiors_images";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$images = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($images);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getInteriorNav() {
	$sql = "select * FROM interiors_navigation";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$nav = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
                echo json_encode($nav);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}




function getConnection() {
	$dbhost="localhost";
	$dbuser="ksonger";
	$dbpass="wR8yezad";
	$dbname="kensonge_western_star";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname;charset=UTF8", $dbuser, $dbpass);

	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>