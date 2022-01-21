<?php

namespace Arkounay\Bundle\UxMediaBundle\Form;

use Arkounay\Bundle\UxCollectionBundle\Form\UxCollectionType;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UxMediaCollectionType extends UxCollectionType implements DataTransformerInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);
        $builder->addModelTransformer($this);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        parent::configureOptions($resolver);

        $entryOptionsNormalizer = function (Options $options, $value) {
            $value['conf'] = $options['conf'];
            $value['block_name'] = 'entry';
            $value['label'] = false;

            return $value;
        };

        $resolver->setDefaults([
            'allow_add' => true,
            'allow_delete' => true,
            'prototype' => true,
            'prototype_data' => null,
            'prototype_name' => '__name__',
            'entry_type' => UxMediaType::class,
            'delete_empty' => false,
            'by_reference' => false,
            'required' => false,
            'min' => 0,
            'max' => null,
            'tree' => 0,
            'error_bubbling' => false,
            'extra' => [],
        ]);

        $resolver->setRequired('conf');

        $resolver->setNormalizer('entry_options', $entryOptionsNormalizer);
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        parent::buildView($view, $form, $options);

        $view->vars = array_replace($view->vars, [
            'conf' => $options['conf'],
            'tree' => $options['tree'],
            'extra' => $options['extra'],
            'collection' => 'true',
        ]);
    }

    public function getBlockPrefix(): string
    {
        return 'ux_media_collection';
    }

    /**
     * {@inheritdoc}
     */
    public function transform($value): mixed
    {
        return $value;
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($value): mixed
    {
        if (\count($value) === 0) {
            return null;
        }

        return array_values(array_filter(($value instanceof Collection) ? $value->toArray() : $value));
    }
}
