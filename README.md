# Ux Media

Symfony UX async document upload form type using ArtgrisFileManager, a [MediaBundle](https://github.com/artgris/MediaBundle) version that works without having to use most of its dependecies like jQuery / jQuery UI / Font awesome etc (but **still requires bootstrap 5**)

## Installation

**Before you start, make sure you have [StimulusBundle](https://symfony.com/bundles/StimulusBundle/current/index.html) configured in your app.**

Install the bundle using Composer and Symfony Flex:

```sh
composer require arkounay/ux-media
```

If you're using WebpackEncore, install your assets and restart Encore (not needed if you're using AssetMapper):

```sh
npm install --force
npm run watch

# or use yarn
yarn install --force
yarn watch
```


### Configuration prerequisites

This bundles uses [FileManagerBundle](https://github.com/artgris/FileManagerBundle).
Make sure its routing is enabled, as well as UxMedia routes :

`config/routes.yaml`:
```yaml
artgris_file_manager:
    resource: "@ArtgrisFileManagerBundle/Controller"
    type:     attribute
    prefix:   /admin/manager

ux_media:
    resource: "@ArkounayUxMediaBundle/Controller"
    type:     attribute
    prefix:   /admin/ux-media
```

Also, make sure you have a conf that is defined :

`packages/artgris_file_manager.yaml`:
```yaml
artgris_file_manager:
    conf:
        default:
            dir: '%kernel.project_dir%/public/uploads'
```

If your project is **NOT** using bootstrap, you need to enable the bootstrap_modal controller and enable scss :

- Add Encore.enableSassLoader() to your webpack.config.js file
- Install sass ` yarn add sass-loader@^12.0.0 sass --dev`

And import the propoer bootstrap scss class :

```json
{
    "controllers": {
        "@arkounay/ux-collection": {
            "collection": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "@arkounay/ux-collection/src/style.css": true,
                    "@arkounay/ux-collection/src/style-when-not-using-bootstrap-5.css": false
                }
            }
        },
        "@arkounay/ux-media": {
            "media": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "@arkounay/ux-media/src/style.css": true
                }
            },
            "upload": {
                "enabled": true,
                "fetch": "eager"
            },
            "crop": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "cropperjs/dist/cropper.min.css": true,
                    "@arkounay/ux-media/src/crop_style.css": true
                }
            },
            "bootstrap_modal": {
                "enabled": true,
                "fetch": "eager",
                "autoimport": {
                    "@arkounay/ux-media/src/bootstrap_modal.scss": true
                }
            }
        }
    },
    "entrypoints": []
}
```


## Usage

Works like [Artgris/MediaBundle](https://github.com/artgris/MediaBundle) except you have to use UxMediaType and UxMediaCollectionType 

```php
$builder->add('Media', UxMediaType::class, [
    'conf' => 'default',
    'tree' => true,
    'display_file_manager' => true,
    'display_clear_button' => true,
    'allow_crop' => true,
    'crop_options' => [
        'display_crop_data' => true,
        'allow_flip' => true,
        'allow_rotation' => true,
        'ratio' => false,
    ]
])
```

### EasyAdmin integration

For [easyadmin](https://github.com/EasyCorp/EasyAdminBundle) 3+ you need to manually specify the form theme by overriding configureCrud in your DashboardController to add the themes s`@ArkounayUxCollection/ux_collection_form_theme.html.twig` and `@ArkounayUxMedia/ux_media_form_theme.html.twig`
```php
public function configureCrud(): Crud
{
    return Crud::new()
        ->addFormTheme('@ArkounayUxCollection/ux_collection_form_theme.html.twig')
        ->addFormTheme('@ArkounayUxMedia/ux_media_form_theme.html.twig')
    ;
}
```

If you're using WebpackEncore, you will need to configure your admin to use it so Symfony UX is taken into account, for example:
```php
public function configureAssets(Assets $assets): Assets
{
    return parent::configureAssets($assets)
        ->addWebpackEncoreEntry('app');
}
```
