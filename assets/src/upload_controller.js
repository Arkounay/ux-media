'use strict';

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['inputFile']

    click() {
        this.inputFileTarget.click();
    }
}