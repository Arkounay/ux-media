<?php

namespace Arkounay\Bundle\UxMediaBundle\Service;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * ImageTwig extension.
 */
class UxMediaTwig extends AbstractExtension
{

    public function getFunctions(): array
    {
        return [
            new TwigFunction('ux_path_decode', [$this, 'pathDecode'], ['is_safe' => ['html']]),
        ];
    }

    public function pathDecode(?string $path): ?string
    {
        if ($path !== null && $path[0] === '/') {
            $path = urldecode(mb_substr($path, 1));
        }

        return $path;
    }
}
