<?php

namespace Arkounay\Bundle\UxMediaBundle\Controller;

use Artgris\Bundle\FileManagerBundle\Service\FilemanagerService;
use Gregwar\Image\Image;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CropController extends AbstractController
{

    public function __construct(private FilemanagerService $filemanagerService){}

    #[Route('/crop/', name: 'ux_media_ajax_crop')]
    public function ajaxCrop(Request $request): JsonResponse
    {
        $post = $request->request;
        $src = $post->get('src');
        $src = strtok($src, '?');
        $x = $post->getInt('x');
        $y = $post->getInt('y');
        $width = $post->getInt('width');
        $height = $post->getInt('height');
        $scaleX = $post->getInt('scaleX', 1);
        $scaleY = $post->getInt('scaleY', 1);
        $rotate = $post->getInt('rotate');
        $conf = $post->get('conf');
        $extra = $post->get('extra');

        $fileManager = $this->getParameter('artgris_file_manager');

        $destinationFolder = null;
        if ($conf !== null) {
            $artgrisConf = $this->filemanagerService->getBasePath(['conf' => $conf, 'extra' => $extra ?? []]);
            $destinationFolder = $artgrisConf['dir'];
        }

        $flipX = $scaleX !== 1;
        $flipY = $scaleY !== 1;

        if ($flipX) {
            $rotate = -$rotate;
        }
        if ($flipY) {
            $rotate = -$rotate;
        }

        $pathinfo = pathinfo(parse_url($src, PHP_URL_PATH));
        $extension = $pathinfo['extension'];

        if ($src[0] === '/') {
            $src = urldecode($fileManager['web_dir'].$src);
        }

        if (!file_exists($src)) {
            return new JsonResponse('');
        }

        $image = Image::open($src)
            ->rotate(-$rotate)
            ->flip($flipY, $flipX);

        if ($width > 0 && $height > 0) {
            $image->crop($x, $y, $width, $height);
        }

        $savedPath = '/';

        if ($destinationFolder !== null) {

            if (substr($destinationFolder, -1) !== DIRECTORY_SEPARATOR) {
                $destinationFolder .= DIRECTORY_SEPARATOR;
            }

            $cropStrAdd = '_crop_';
            $filename = $pathinfo['filename'];
            $cropPos = mb_strpos($filename, $cropStrAdd);
            if ($cropPos !== false) {
                $filename = mb_substr($filename, 0, $cropPos);
            }
            $croppedPath = $this->getParameter('ux_media')['cropped_path'];
            $savedPath = $image->save($destinationFolder . $croppedPath . urldecode($filename) . $cropStrAdd . uniqid() . '.' . $extension, 'guess', 85);

            $savedPath = mb_substr($savedPath, mb_strlen($fileManager['web_dir']));
            if ($savedPath[0] !== '/') {
                $savedPath = $src;
            }
        } else {
            if ($extension === 'png') {
                $savedPath .= $image->png();
            } else {
                $savedPath .= $image->jpeg();
            }
        }

        return new JsonResponse($savedPath);
    }
}
