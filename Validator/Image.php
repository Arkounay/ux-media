<?php

namespace Arkounay\Bundle\UxMediaBundle\Validator;

use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
#[\Attribute]
class Image extends Constraint
{

    #[HasNamedArguments]
    public function __construct(
        public string $message = 'ux_media_validation.image',
        public array $supportedExtensions = ImageValidator::SUPPORTED_EXTENSIONS,
        array $groups = null,
        mixed $payload = null,
    ) {
        parent::__construct([], $groups, $payload);
    }

}