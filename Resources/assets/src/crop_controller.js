'use strict';

import { Controller } from '@hotwired/stimulus';
import Cropper from 'cropperjs';
import 'cropperjs';

export default class extends Controller {

    static targets = ['container', 'x', 'y', 'width', 'height', 'saveButton']
    static values = { path: String }

    parent;

    connect() {
        this.element[this.identifier] = this;
        this.element.addEventListener('shown.bs.modal', () => {
            this.openCrop();
        })
        this.element.addEventListener('hidden.bs.modal', () => {
            this.containerTarget.innerHTML = '';
        })
        this.conf = this.element.dataset.conf;
        this.extra = this.element.dataset.extra;
    }

    openCrop() {
        const img = document.createElement('img');
        img.src = this.pathValue;
        this.containerTarget.replaceChildren(img);
        const self = this;
        this.cropper = new Cropper(img, {
            aspectRatio: this.element.dataset.ratio,
            zoomable: true,
            viewMode: 1,
            autoCrop: false,
            crop(event) {
                const data = event.detail;
                self.xTarget.innerHTML = Math.round(data.x);
                self.yTarget.innerHTML = Math.round(data.y);
                self.widthTarget.innerHTML = Math.round(data.width);
                self.heightTarget.innerHTML = Math.round(data.height);
                self.saveButtonTarget.disabled =
                    ((data.width <= 4 && data.width > 0) || (data.height <= 4 && data.height > 0))
                    || (data.width === 0 && data.height === 0 && data.x === 0 && data.y === 0 && data.scaleX === 1 && data.scaleY === 1 && data.rotate === 0);
            },
            ready() {
                this.cropper.zoomTo(.9);
            },
        });
    }

    rotateLeft(event) {
        event.preventDefault();
        this.cropper.clear();
        this.cropper.rotate(-90);
    }

    rotateRight(event) {
        event.preventDefault();
        this.cropper.clear();
        this.cropper.rotate(90);
    }

    flipHorizontal(event) {
        event.preventDefault();
        this.cropper.clear();
        this.cropper.scaleX(-this.cropper.imageData.scaleX);
    }

    flipVertical(event) {
        event.preventDefault();
        this.cropper.clear();
        this.cropper.scaleY(-this.cropper.imageData.scaleY);
    }

    toggleCrop(event) {
        event.preventDefault();
        if (Object.keys(this.cropper.getCropBoxData()).length === 0) {
            this.cropper.crop();
        } else {
            this.cropper.clear();
        }
    }

    save(event) {
        event.preventDefault();

        const data = this.cropper.getData();

        const formData = new FormData();
        formData.append('conf', this.conf);
        formData.append('src', this.pathValue);
        formData.append('x', Math.round(data.x));
        formData.append('y', Math.round(data.y));
        formData.append('width', Math.round(data.width));
        formData.append('height', Math.round(data.height));
        formData.append('scaleX', data.scaleX);
        formData.append('scaleY', data.scaleY);
        formData.append('rotate', data.rotate);
        formData.append('checkCrossOrigin', false);

        this.cropper.destroy();

        fetch(event.target.dataset.cropUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then((path) => {
            this.pathValue = path;
            const event = new CustomEvent("pathUpdate", {detail: path});
            this.element.dispatchEvent(event);
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        })
    }

    setMediaController(mediaController) {
        this.mediaController = mediaController;
    }

}