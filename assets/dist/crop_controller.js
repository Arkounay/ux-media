'use strict';

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import { Controller } from '@hotwired/stimulus';
import Cropper from 'cropperjs';
import 'cropperjs';
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _this.parent = void 0;
    return _this;
  }
  _inheritsLoose(_default, _Controller);
  var _proto = _default.prototype;
  _proto.connect = function connect() {
    var _this2 = this;
    this.element[this.identifier] = this;
    this.element.addEventListener('shown.bs.modal', function () {
      _this2.openCrop();
    });
    this.element.addEventListener('hidden.bs.modal', function () {
      _this2.containerTarget.innerHTML = '';
    });
    this.conf = this.element.dataset.conf;
    this.extra = this.element.dataset.extra;
  };
  _proto.openCrop = function openCrop() {
    var img = document.createElement('img');
    img.src = this.pathValue;
    this.containerTarget.replaceChildren(img);
    var self = this;
    this.cropper = new Cropper(img, {
      aspectRatio: this.element.dataset.ratio,
      zoomable: true,
      viewMode: 1,
      autoCrop: false,
      crop: function crop(event) {
        var data = event.detail;
        self.xTarget.innerHTML = Math.round(data.x);
        self.yTarget.innerHTML = Math.round(data.y);
        self.widthTarget.innerHTML = Math.round(data.width);
        self.heightTarget.innerHTML = Math.round(data.height);
        self.saveButtonTarget.disabled = data.width <= 4 && data.width > 0 || data.height <= 4 && data.height > 0 || data.width === 0 && data.height === 0 && data.x === 0 && data.y === 0 && data.scaleX === 1 && data.scaleY === 1 && data.rotate === 0;
      },
      ready: function ready() {
        this.cropper.zoomTo(.9);
      }
    });
  };
  _proto.rotateLeft = function rotateLeft(event) {
    event.preventDefault();
    this.cropper.clear();
    this.cropper.rotate(-90);
  };
  _proto.rotateRight = function rotateRight(event) {
    event.preventDefault();
    this.cropper.clear();
    this.cropper.rotate(90);
  };
  _proto.flipHorizontal = function flipHorizontal(event) {
    event.preventDefault();
    this.cropper.clear();
    this.cropper.scaleX(-this.cropper.imageData.scaleX);
  };
  _proto.flipVertical = function flipVertical(event) {
    event.preventDefault();
    this.cropper.clear();
    this.cropper.scaleY(-this.cropper.imageData.scaleY);
  };
  _proto.toggleCrop = function toggleCrop(event) {
    event.preventDefault();
    if (Object.keys(this.cropper.getCropBoxData()).length === 0) {
      this.cropper.crop();
    } else {
      this.cropper.clear();
    }
  };
  _proto.save = function save(event) {
    var _this3 = this;
    event.preventDefault();
    var data = this.cropper.getData();
    var formData = new FormData();
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
    }).then(function (response) {
      return response.json();
    }).then(function (path) {
      _this3.pathValue = path;
      var event = new CustomEvent("pathUpdate", {
        detail: path.split('/').map(encodeURIComponent).join('/')
      });
      _this3.element.dispatchEvent(event);
    })["catch"](function (error) {
      console.error(error);
      alert(error.message);
    });
  };
  _proto.setMediaController = function setMediaController(mediaController) {
    this.mediaController = mediaController;
  };
  return _default;
}(Controller);
_default.targets = ['container', 'x', 'y', 'width', 'height', 'saveButton'];
_default.values = {
  path: String
};
export { _default as default };