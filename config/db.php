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
$isProd = getenv('ENVIRONMENT') === 'production';

return [
    'dsn' => App::env('DB_DSN') ?: null,
    'driver' => App::env('DB_DRIVER'),
    'server' => !$isProd ? App::env('DB_SERVER') : url["user"],
    'port' => App::env('DB_PORT'),
    'database' => !$isProd ? App::env('DB_DATABASE') : substr($url["path"],1),
    'user' => !$isProd ? App::env('DB_USER') : $url["user"],
    'password' => !$isProd ? App::env('DB_PASSWORD') : $url["pass"],
    'schema' => App::env('DB_SCHEMA'),
    'tablePrefix' => App::env('DB_TABLE_PREFIX'),
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',

];