'use strict';

import { Controller } from 'stimulus';

export default class extends Controller {

    static targets = ['inputFile']

    click() {
        this.inputFileTarget.click();
    }
}