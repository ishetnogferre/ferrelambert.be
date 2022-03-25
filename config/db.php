<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

use craft\helpers\App;

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

return [
    'dsn' => App::env('DB_DSN') ?: null,
    'driver' => App::env('DB_DRIVER'),
    'server' => $url["host"],
    'port' => App::env('DB_PORT'),
    'database' => substr($url["path"],1),
    'user' => $url["user"],
    'password' => $url["pass"],
    'schema' => App::env('DB_SCHEMA'),
    'tablePrefix' => App::env('DB_TABLE_PREFIX'),
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
];