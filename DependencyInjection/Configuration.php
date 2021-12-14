<?php

namespace Arkounay\Bundle\UxMediaBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('ux_media');
        $rootNode = $treeBuilder->getRootNode();
        $rootNode
            ->children()
            ->scalarNode('cropped_path')->defaultValue('cropped/')->end()
            ->end();

        return $treeBuilder;
    }

}
