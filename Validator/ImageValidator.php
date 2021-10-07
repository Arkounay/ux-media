<?php

namespace Arkounay\Bundle\UxMediaBundle\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ImageValidator extends ConstraintValidator
{

    public const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

    public function validate($value, Constraint $constraint)
    {
        if (null === $value) {
            return;
        }

        if (is_iterable($value)) {
            foreach ($value as $item) {
                $this->checkExtension($constraint, $item);
            }
        } else {
            $this->checkExtension($constraint, $value);
        }
    }

    private function checkExtension(Constraint $constraint, string $path): void
    {
        if ($path = parse_url($path)) {
            $extension = mb_strtolower(pathinfo($path['path'], PATHINFO_EXTENSION));
        }

        if ($constraint instanceof Image) {
            $supportedExtensions = $constraint->supportedExtensions;
        } else {
            $supportedExtensions = self::SUPPORTED_EXTENSIONS;
        }

        if (!\in_array($extension, $supportedExtensions)) {
            $this->context->buildViolation($constraint->message)->addViolation();
        }
    }
}