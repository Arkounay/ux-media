<?php

namespace Arkounay\Bundle\UxMediaBundle\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
#[\Attribute]
class Image extends Constraint
{
    public $message = 'ux_media_validation.image';

    public $supportedExtensions = ImageValidator::SUPPORTED_EXTENSIONS;
}