<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6c2fdf7831e0165b3ddec7c59f4668d2
{
    public static $files = array (
        'd1449772bc0793140a1a8b71b12155ad' => __DIR__ . '/../..' . '/includes/functions/HelperFunctions.php',
        'ee61de4254a956413e6d3b68a539f3c9' => __DIR__ . '/../..' . '/includes/functions/ExtensionsManager.php',
        '778e5eef4e413e4f89427ba8d866b38c' => __DIR__ . '/../..' . '/includes/functions/AjaxFunctions.php',
        '602529821f629547b6cfd2ff407d5ea8' => __DIR__ . '/../..' . '/includes/functions/ConditionsManager.php',
        '591e6674c763abe43c5ec927a88f0823' => __DIR__ . '/../..' . '/includes/functions/HeaderManager.php',
    );

    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Rishi\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Rishi\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6c2fdf7831e0165b3ddec7c59f4668d2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6c2fdf7831e0165b3ddec7c59f4668d2::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit6c2fdf7831e0165b3ddec7c59f4668d2::$classMap;

        }, null, ClassLoader::class);
    }
}
