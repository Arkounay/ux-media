'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("@hotwired/stimulus");

var _cropperjs = _interopRequireDefault(require("cropperjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "parent", void 0);

    return _this;
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
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
    }
  }, {
    key: "openCrop",
    value: function openCrop() {
      var img = document.createElement('img');
      img.src = this.pathValue;
      this.containerTarget.replaceChildren(img);
      var self = this;
      this.cropper = new _cropperjs["default"](img, {
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
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft(event) {
      event.preventDefault();
      this.cropper.clear();
      this.cropper.rotate(-90);
    }
  }, {
    key: "rotateRight",
    value: function rotateRight(event) {
      event.preventDefault();
      this.cropper.clear();
      this.cropper.rotate(90);
    }
  }, {
    key: "flipHorizontal",
    value: function flipHorizontal(event) {
      event.preventDefault();
      this.cropper.clear();
      this.cropper.scaleX(-this.cropper.imageData.scaleX);
    }
  }, {
    key: "flipVertical",
    value: function flipVertical(event) {
      event.preventDefault();
      this.cropper.clear();
      this.cropper.scaleY(-this.cropper.imageData.scaleY);
    }
  }, {
    key: "toggleCrop",
    value: function toggleCrop(event) {
      event.preventDefault();

      if (Object.keys(this.cropper.getCropBoxData()).length === 0) {
        this.cropper.crop();
      } else {
        this.cropper.clear();
      }
    }
  }, {
    key: "save",
    value: function save(event) {
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
          detail: path
        });

        _this3.element.dispatchEvent(event);
      })["catch"](function (error) {
        console.error(error);
        alert(error.message);
      });
    }
  }, {
    key: "setMediaController",
    value: function setMediaController(mediaController) {
      this.mediaController = mediaController;
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

_defineProperty(_default, "targets", ['container', 'x', 'y', 'width', 'height', 'saveButton']);

_defineProperty(_default, "values", {
  path: String
});