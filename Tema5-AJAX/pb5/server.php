<?php

function getDirectoryStructure($path) {
    $directoryStructure = [];

    if (is_dir($path)) {
        $files = scandir($path);

        foreach ($files as $file) {
            if ($file === "." || $file === "..") {
                continue;
            }

            $itemPath = $path . "/" . $file;
            $item = [ "name" => $file ];

            if (is_dir($itemPath)) {
                $item["type"] = "directory";
                // $item["contents"] = getDirectoryStructure($itemPath);
            } else {
                $item["type"] = "file";
            }

            $item["path"] = $itemPath;

            $directoryStructure[] = $item;
        }
    }

    return $directoryStructure;
}

function getFileContents($filePath) {
    if (is_file($filePath)) {
        return file_get_contents($filePath);
    } else {
        return "Fișierul nu exista.";
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $directoryPath = "C:/xampp/htdocs/ajaxweb";
    $directoryStructure = getDirectoryStructure($directoryPath);
    echo json_encode($directoryStructure);

} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {

    $requestData = $_POST;

    if (isset($requestData["directory"])) {
        $directoryPath = $requestData["directory"];
        $directoryContents = getDirectoryStructure($directoryPath);
        echo json_encode($directoryContents);

    } elseif (isset($requestData["file"])) {
        $filePath = $requestData["file"];
        $fileContents = getFileContents($filePath);
        echo $fileContents;
    }
}
?>
