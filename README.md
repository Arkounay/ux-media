# Ux Media

Symfony UX async document upload type using ArtgrisFileManager, a [MediaBundle](https://github.com/artgris/MediaBundle) version that works without having to use most of its dependecies like jQuery / jQuery UI / Font awesome etc (but **still requires bootstrap 5**)

## Installation

```sh
composer require arkounay/ux-media

# Don't forget to install the JavaScript dependencies as well and compile
yarn install --force
yarn encore dev
```

Also make sure you have at least version 3.0 of [@symfony/stimulus-bridge](https://github.com/symfony/stimulus-bridge)
in your `package.json` file.


### Configuration prerequisites

This bundles uses [FileManagerBundle](https://github.com/artgris/FileManagerBundle).
Make sure its routing is enabled, as well as UxMedia routes :

`routing.yaml`:
```yaml
artgris_file_manager:
    resource: "@ArtgrisFileManagerBundle/Controller"
    type:     annotation
    prefix:   /admin/manager

ux_media:
    resource: "@ArkounayUxMediaBundle/Controller"
    type:     annotation
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
    'display_file_manager' => true,
    'allow_crop' => true,
    'crop_options' => [
        'display_crop_data' => true,
        'allow_flip' => true,
        'allow_rotation' => true,
        'ratio' => false,
    ]
])
```
