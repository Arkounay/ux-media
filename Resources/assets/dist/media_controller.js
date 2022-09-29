'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("@hotwired/stimulus");

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

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _dragCounter = /*#__PURE__*/new WeakMap();

var _iframeTriggered = /*#__PURE__*/new WeakMap();

var _pathUpdateEventListener = /*#__PURE__*/new WeakSet();

var _toggleProgress = /*#__PURE__*/new WeakSet();

var _uploadFiles = /*#__PURE__*/new WeakSet();

var _setErrorMessage = /*#__PURE__*/new WeakSet();

var _disableCropButton = /*#__PURE__*/new WeakSet();

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

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _disableCropButton);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _setErrorMessage);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _uploadFiles);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _toggleProgress);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _pathUpdateEventListener);

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _dragCounter, {
      writable: true,
      value: 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _iframeTriggered, {
      writable: true,
      value: false
    });

    return _this;
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      this.element[this.identifier] = this;

      if (this.hasCropModalTarget) {
        this.cropModalTarget.addEventListener('pathUpdate', _classPrivateMethodGet(this, _pathUpdateEventListener, _pathUpdateEventListener2).bind(this));
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.hasCropModalTarget) {
        this.cropModalTarget.removeEventListener('pathUpdate', _classPrivateMethodGet(this, _pathUpdateEventListener, _pathUpdateEventListener2));
      }
    }
  }, {
    key: "clearErrorMessage",
    value: function clearErrorMessage() {
      _classPrivateMethodGet(this, _setErrorMessage, _setErrorMessage2).call(this, null);
    }
    /**
     * Remove the image
     */

  }, {
    key: "clear",
    value: function clear() {
      this.pathValue = '';
    }
  }, {
    key: "upload",
    value: function upload(e) {
      _classPrivateMethodGet(this, _uploadFiles, _uploadFiles2).call(this, e.target.files);
    }
  }, {
    key: "updatePathValue",
    value: function updatePathValue(e) {
      this.pathValue = e.target.value;
    }
  }, {
    key: "pathValueChanged",
    value: function pathValueChanged() {
      var _this2 = this;

      this.inputPathTarget.value = this.pathValue;
      var hasValue = this.pathValue !== '';

      _classPrivateMethodGet(this, _disableCropButton, _disableCropButton2).call(this);

      if (hasValue) {
        if (this.pathValue.match(/.(jpg|jpeg|png|gif|svg)/i)) {
          var img = document.createElement('img');
          img.src = this.pathValue;
          img.height = 75;
          img.addEventListener('error', function () {
            _this2.imageLoaded = false;

            _classPrivateMethodGet(_this2, _disableCropButton, _disableCropButton2).call(_this2);
          });
          img.addEventListener('load', function () {
            _this2.imageLoaded = true;

            _classPrivateMethodGet(_this2, _disableCropButton, _disableCropButton2).call(_this2, !img.getAttribute('src').match(/^\/.+(jpg|jpeg|png|gif)$/i));
          });
          this.filePreviewTarget.innerHTML = '';
          this.filePreviewTarget.appendChild(img);
        } else {
          if (this.pathValue.match(/.+\.[A-Za-z]+/)) {
            var extension = this.pathValue.split('.').pop();
            this.filePreviewTarget.innerHTML = "<div class=\"border p-2 text-secondary bg-light rounded\">".concat(extension, "</div>");

            _classPrivateMethodGet(this, _disableCropButton, _disableCropButton2).call(this);
          } else {
            this.filePreviewTarget.innerHTML = '';
          }
        }
      } else {
        this.filePreviewTarget.innerHTML = "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-file me-2\" width=\"44\" height=\"44\" viewBox=\"0 0 24 24\" stroke-width=\"1\" stroke=\"#555555\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n                  <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" />\n                  <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z\" />\n                </svg>\n            ";
      }

      if (this.hasCropModalTarget) {
        this.cropModalTarget.dataset['arkounay-UxMedia-CropPathValue'] = this.pathValue;
      }

      var event = new Event('change');
      this.inputPathTarget.dispatchEvent(event);
    }
  }, {
    key: "openFileManager",
    value: function openFileManager() {
      var _this3 = this;

      var iframe = this.fileManagerModalTarget.querySelector('iframe');

      if (!_classPrivateFieldGet(this, _iframeTriggered)) {
        _classPrivateFieldSet(this, _iframeTriggered, true);

        iframe.addEventListener('load', function () {
          // equivalent of jquery's $iframe.contents().on('click', '.select', handler);
          var iframeContent = iframe.contentDocument || iframe.contentWindow.document;
          var self = _this3;
          iframeContent.addEventListener('click', function (e) {
            for (var target = e.target; target && target !== this; target = target.parentNode) {
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
  }, {
    key: "drop",
    value: function drop(event) {
      event.preventDefault();
      var files = [];

      if (event.dataTransfer.items) {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === 'file') {
            files.push(event.dataTransfer.items[i].getAsFile());
          }
        }
      }

      _classPrivateMethodGet(this, _uploadFiles, _uploadFiles2).call(this, files);

      this.dragleave();
    }
  }, {
    key: "dragenter",
    value: function dragenter(event) {
      var _this$dragCounter;

      var containsFiles = false;

      if (event.dataTransfer.types) {
        for (var i = 0; i < event.dataTransfer.types.length; i++) {
          if (event.dataTransfer.types[i] === "Files") {
            containsFiles = true;
            break;
          }
        }
      }

      if (containsFiles) {
        this.element.classList.remove("bg-white");
        this.element.classList.add("bg-light");
      }

      event.preventDefault();
      _classPrivateFieldSet(this, _dragCounter, (_this$dragCounter = +_classPrivateFieldGet(this, _dragCounter)) + 1), _this$dragCounter;
    }
  }, {
    key: "dragleave",
    value: function dragleave() {
      var _this$dragCounter2;

      _classPrivateFieldSet(this, _dragCounter, (_this$dragCounter2 = +_classPrivateFieldGet(this, _dragCounter)) - 1), _this$dragCounter2;

      if (_classPrivateFieldGet(this, _dragCounter) === 0) {
        this.element.classList.remove("bg-light");
        this.element.classList.add("bg-white");
      }
    }
  }, {
    key: "dragover",
    value: function dragover(event) {
      event.preventDefault();
    }
  }, {
    key: "fileManagerUrl",
    get: function get() {
      return this.element.dataset.filemanagerUrl;
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

function _pathUpdateEventListener2(data) {
  this.pathValue = data.detail;

  _classPrivateMethodGet(this, _setErrorMessage, _setErrorMessage2).call(this, null);
}

function _toggleProgress2(show) {
  if (show) {
    this.progressTarget.firstChild.style.width = '0%';
    this.progressTarget.classList.remove('d-none');
  } else {
    this.progressTarget.classList.add('d-none');
  }
}

function _uploadFiles2(files) {
  var _this4 = this;

  var data = new FormData();

  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      data.append('files[]', files[i]);
    }

    _classPrivateMethodGet(this, _toggleProgress, _toggleProgress2).call(this, true); // use XHR to keep upload progress


    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.fileManagerUrl);

    xhr.onload = function () {
      var json = JSON.parse(xhr.response);

      if (json.files[0].error) {
        _classPrivateMethodGet(_this4, _setErrorMessage, _setErrorMessage2).call(_this4, "".concat(json.files[0].name, " : ").concat(json.files[0].error));
      } else {
        _classPrivateMethodGet(_this4, _setErrorMessage, _setErrorMessage2).call(_this4, null);
      }

      _this4.pathValue = json.files[0].url;

      _classPrivateMethodGet(_this4, _toggleProgress, _toggleProgress2).call(_this4, false);

      if (json.files.length > 1) {
        var collectionController = _this4.element.closest('[data-controller="arkounay--ux-collection--collection"]')['arkounay--ux-collection--collection'];

        if (collectionController !== undefined) {
          var _loop = function _loop(_i) {
            var position = Array.from(collectionController.element.children).indexOf(_this4.element.closest('[data-arkounay--ux-collection--collection-target="collectionElement"]'));
            var newElement = collectionController.add(null, position);
            setTimeout(function () {
              var media = newElement.querySelector('[data-controller="arkounay--ux-media--media"]')['arkounay--ux-media--media'];

              if (media !== undefined) {
                media.pathValue = json.files[_i].url;
              }
            }, 0);
          };

          for (var _i = 1; _i < json.files.length; _i++) {
            _loop(_i);
          }
        }
      }
    };

    xhr.onerror = function () {
      alert('An error occurred.');

      _classPrivateMethodGet(_this4, _toggleProgress, _toggleProgress2).call(_this4, false);
    };

    xhr.upload.onprogress = function (event) {
      var percent = event.loaded / event.total * 100;
      _this4.progressTarget.firstChild.style.width = percent + '%';
    };

    xhr.send(data);
  }
}

function _setErrorMessage2(message) {
  if (message) {
    this.fileErrorMessageTarget.innerText = message;
    this.fileErrorTarget.classList.remove('d-none');
  } else {
    this.fileErrorMessageTarget.innerText = '';
    this.fileErrorTarget.classList.add('d-none');
  }
}

function _disableCropButton2() {
  var disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (this.hasCropButtonTarget) {
    this.cropButtonTarget.style.display = disabled ? 'none' : '';

    if (disabled) {
      this.cropButtonTarget.parentNode.classList.add('no-crop');
    } else {
      this.cropButtonTarget.parentNode.classList.remove('no-crop');
    }
  }
}

_defineProperty(_default, "targets", ['inputPath', 'filePreview', 'fileManagerModal', 'progress', 'cropModal', 'cropButton', 'fileError', 'fileErrorMessage']);

_defineProperty(_default, "values", {
  path: String
});

;