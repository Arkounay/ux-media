'use strict';

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['inputPath', 'filePreview', 'fileManagerModal', 'progress', 'cropModal', 'cropButton', 'fileError', 'fileErrorMessage'];
    static values = {path: String};

    #dragCounter = 0;
    #iframeTriggered = false;

    connect() {
        this.element[this.identifier] = this;
        if (this.hasCropModalTarget) {
            this.cropModalTarget.addEventListener('pathUpdate', this.#pathUpdateEventListener.bind(this));
        }
    }

    disconnect() {
        if (this.hasCropModalTarget) {
            this.cropModalTarget.removeEventListener('pathUpdate', this.#pathUpdateEventListener);
        }
    }

    #pathUpdateEventListener(data) {
        this.pathValue = data.detail;
        this.#setErrorMessage(null);
    }

    clearErrorMessage() {
        this.#setErrorMessage(null);
    }

    /**
     * Remove the image
     */
    clear() {
        this.pathValue = '';
    }

    upload(e) {
        this.#uploadFiles(e.target.files)
    }

    #toggleProgress(show) {
        if (show) {
            this.progressTarget.firstChild.style.width = '0%';
            this.progressTarget.classList.remove('d-none');
        } else {
            this.progressTarget.classList.add('d-none');
        }
    }

    #uploadFiles(files) {
        const data = new FormData()

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                data.append('files[]', files[i])
            }

            this.#toggleProgress(true);
            // use XHR to keep upload progress
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.fileManagerUrl)
            xhr.onload = () => {
                const json = JSON.parse(xhr.response);

                if (json.files[0].error) {
                    this.#setErrorMessage(`${json.files[0].name} : ${json.files[0].error}`);
                } else {
                    this.#setErrorMessage(null);
                }
                this.pathValue = json.files[0].url;
                this.#toggleProgress(false);

                if (json.files.length > 1) {
                    const collectionController = this.element.closest('[data-controller="arkounay--ux-collection--collection"]')['arkounay--ux-collection--collection'];
                    if (collectionController !== undefined) {
                        for (let i = 1; i < json.files.length; i++) {
                            const position = Array.from(collectionController.element.children).indexOf(this.element.closest('[data-arkounay--ux-collection--collection-target="collectionElement"]'));
                            const newElement = collectionController.add(null, position);
                            setTimeout(() => {
                                const media = newElement.querySelector('[data-controller="arkounay--ux-media--media"]')['arkounay--ux-media--media'];
                                if (media !== undefined) {
                                    media.pathValue = json.files[i].url;
                                }
                            }, 0)
                        }
                    }
                }
            };

            xhr.onerror = () => {
                alert('An error occurred.')
                this.#toggleProgress(false);
            };

            xhr.upload.onprogress = (event) => {
                const percent = event.loaded / event.total * 100;
                this.progressTarget.firstChild.style.width = percent + '%';
            };

            xhr.send(data);

        }
    }

    #setErrorMessage(message) {
        if (message) {
            this.fileErrorMessageTarget.innerText = message;
            this.fileErrorTarget.classList.remove('d-none');
        } else {
            this.fileErrorMessageTarget.innerText = '';
            this.fileErrorTarget.classList.add('d-none');
        }
    }

    #disableCropButton(disabled = true) {
        if (this.hasCropButtonTarget) {
            this.cropButtonTarget.style.display = disabled ? 'none' : '';
            if (disabled) {
                this.cropButtonTarget.parentNode.classList.add('no-crop');
            } else {
                this.cropButtonTarget.parentNode.classList.remove('no-crop');
            }
        }
    }

    updatePathValue(e) {
        this.pathValue = e.target.value;
    }

    pathValueChanged() {
        this.inputPathTarget.value = this.pathValue;
        const hasValue = this.pathValue !== '';
        this.#disableCropButton();
        if (hasValue) {
            if (this.pathValue.match(/.(jpg|jpeg|png|gif|svg)/i)) {
                const img = document.createElement('img');
                img.src = this.pathValue;
                img.height = 75;
                img.addEventListener('error', () => {
                    this.imageLoaded = false;
                    this.#disableCropButton();
                });
                img.addEventListener('load', () => {
                    this.imageLoaded = true;
                    this.#disableCropButton(!img.getAttribute('src').match(/^\/.+(jpg|jpeg|png|gif)$/i));
                });
                this.filePreviewTarget.innerHTML = '';
                this.filePreviewTarget.appendChild(img);
            } else {
                if (this.pathValue.match(/.+\.[A-Za-z]+/)) {
                    const extension = this.pathValue.split('.').pop();
                    this.filePreviewTarget.innerHTML = `<div class="border p-2 text-secondary bg-light rounded">${extension}</div>`;
                    this.#disableCropButton();
                } else {
                    this.filePreviewTarget.innerHTML = '';
                }
            }
        } else {
            this.filePreviewTarget.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file me-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#555555" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                </svg>
            `;
        }

        if (this.hasCropModalTarget) {
            this.cropModalTarget.dataset['arkounay-UxMedia-CropPathValue'] = this.pathValue;
        }

        const event = new Event('change');
        this.inputPathTarget.dispatchEvent(event);
    }

    openFileManager() {
        const iframe = this.fileManagerModalTarget.querySelector('iframe');
        if (!this.#iframeTriggered) {
            this.#iframeTriggered = true;
            iframe.addEventListener('load', () => {
                // equivalent of jquery's $iframe.contents().on('click', '.select', handler);
                const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
                const self = this;
                iframeContent.addEventListener('click', function(e) {
                    for (let target = e.target; target && target !== this; target = target.parentNode) {
                        if (target.matches('.select')) {
                            self.pathValue = encodeURI(target.dataset.path);
                            self.fileManagerModalTarget.querySelector('.modal-footer button').click();
                            break;
                        }
                    }
                }, false);
            });
        }
        iframe.src = iframe.dataset.src;
    }

    drop(event) {
        event.preventDefault();

        const files = [];

        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    files.push(event.dataTransfer.items[i].getAsFile())
                }
            }
        }

        this.#uploadFiles(files);

        this.dragleave()
    }

    dragenter(event) {
        let containsFiles = false;
        if (event.dataTransfer.types) {
            for (var i = 0; i < event.dataTransfer.types.length; i++) {
                if (event.dataTransfer.types[i] === "Files") {
                    containsFiles = true;
                    break;
                }
            }
        }

        if (containsFiles) {
            this.element.classList.remove("bg-white")
            this.element.classList.add("bg-light")
        }

        event.preventDefault()
        this.#dragCounter++;
    }

    dragleave() {
        this.#dragCounter--;
        if (this.#dragCounter === 0) {
            this.element.classList.remove("bg-light")
            this.element.classList.add("bg-white")
        }
    }

    dragover(event) {
        event.preventDefault()
    }

    get fileManagerUrl() {
        return this.element.dataset.filemanagerUrl;
    }
};