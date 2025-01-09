'use strict';

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
var id = 0;
function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
import { Controller } from '@hotwired/stimulus';
import { icons } from "./icons.js";
var _dragCounter = /*#__PURE__*/_classPrivateFieldLooseKey("dragCounter");
var _iframeTriggered = /*#__PURE__*/_classPrivateFieldLooseKey("iframeTriggered");
var _pathUpdateEventListener = /*#__PURE__*/_classPrivateFieldLooseKey("pathUpdateEventListener");
var _toggleProgress = /*#__PURE__*/_classPrivateFieldLooseKey("toggleProgress");
var _uploadFiles = /*#__PURE__*/_classPrivateFieldLooseKey("uploadFiles");
var _setErrorMessage = /*#__PURE__*/_classPrivateFieldLooseKey("setErrorMessage");
var _disableCropButton = /*#__PURE__*/_classPrivateFieldLooseKey("disableCropButton");
var _hideClearButton = /*#__PURE__*/_classPrivateFieldLooseKey("hideClearButton");
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    Object.defineProperty(_this, _hideClearButton, {
      value: _hideClearButton2
    });
    Object.defineProperty(_this, _disableCropButton, {
      value: _disableCropButton2
    });
    Object.defineProperty(_this, _setErrorMessage, {
      value: _setErrorMessage2
    });
    Object.defineProperty(_this, _uploadFiles, {
      value: _uploadFiles2
    });
    Object.defineProperty(_this, _toggleProgress, {
      value: _toggleProgress2
    });
    Object.defineProperty(_this, _pathUpdateEventListener, {
      value: _pathUpdateEventListener2
    });
    Object.defineProperty(_this, _dragCounter, {
      writable: true,
      value: 0
    });
    Object.defineProperty(_this, _iframeTriggered, {
      writable: true,
      value: false
    });
    return _this;
  }
  _inheritsLoose(_default, _Controller);
  var _proto = _default.prototype;
  _proto.connect = function connect() {
    this.element[this.identifier] = this;
    if (this.hasCropModalTarget) {
      this.cropModalTarget.addEventListener('pathUpdate', _classPrivateFieldLooseBase(this, _pathUpdateEventListener)[_pathUpdateEventListener].bind(this));
    }
  };
  _proto.disconnect = function disconnect() {
    if (this.hasCropModalTarget) {
      this.cropModalTarget.removeEventListener('pathUpdate', _classPrivateFieldLooseBase(this, _pathUpdateEventListener)[_pathUpdateEventListener]);
    }
  };
  _proto.clearErrorMessage = function clearErrorMessage() {
    _classPrivateFieldLooseBase(this, _setErrorMessage)[_setErrorMessage](null);
  }

  /**
   * Remove the image
   */;
  _proto.clear = function clear() {
    this.pathValue = '';
  };
  _proto.upload = function upload(e) {
    _classPrivateFieldLooseBase(this, _uploadFiles)[_uploadFiles](e.target.files);
  };
  _proto.updatePathValue = function updatePathValue(e) {
    this.pathValue = e.target.value;
  };
  _proto.pathValueChanged = function pathValueChanged() {
    var _this2 = this;
    this.inputPathTarget.value = this.pathValue;
    var hasValue = this.pathValue !== '';
    _classPrivateFieldLooseBase(this, _disableCropButton)[_disableCropButton]();
    _classPrivateFieldLooseBase(this, _hideClearButton)[_hideClearButton](!hasValue);
    if (hasValue) {
      if (this.pathValue.match(/.(jpg|jpeg|png|gif|svg|webp)/i)) {
        var img = document.createElement('img');
        img.src = this.pathValue;
        img.height = 75;
        img.addEventListener('error', function () {
          _this2.imageLoaded = false;
          _classPrivateFieldLooseBase(_this2, _disableCropButton)[_disableCropButton]();
        });
        img.addEventListener('load', function () {
          _this2.imageLoaded = true;
          _classPrivateFieldLooseBase(_this2, _disableCropButton)[_disableCropButton](!img.getAttribute('src').match(/^\/.+(jpg|jpeg|png|webp)$/i));
        });
        this.filePreviewTarget.innerHTML = '';
        this.filePreviewTarget.appendChild(img);
      } else {
        if (this.pathValue.match(/.+\.[A-Za-z]+/)) {
          var extension = this.pathValue.split('.').pop().split('?')[0];
          var icon = icons[extension];
          if (icon === undefined) {
            icon = extension;
          }
          this.filePreviewTarget.innerHTML = "<div class=\"border p-2 text-secondary bg-light rounded\">" + icon + "</div>";
          _classPrivateFieldLooseBase(this, _disableCropButton)[_disableCropButton]();
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
    var event = new Event('change', {
      bubbles: true
    });
    this.inputPathTarget.dispatchEvent(event);
  };
  _proto.openFileManager = function openFileManager() {
    var _this3 = this;
    var iframe = this.fileManagerModalTarget.querySelector('iframe');
    if (!_classPrivateFieldLooseBase(this, _iframeTriggered)[_iframeTriggered]) {
      _classPrivateFieldLooseBase(this, _iframeTriggered)[_iframeTriggered] = true;
      iframe.addEventListener('load', function () {
        // equivalent of jquery's $iframe.contents().on('click', '.select', handler);
        var iframeContent = iframe.contentDocument || iframe.contentWindow.document;
        var self = _this3;
        iframeContent.addEventListener('click', function (e) {
          for (var target = e.target; target && target !== this; target = target.parentNode) {
            if (target.matches('.select')) {
              // self.pathValue = target.dataset.path;
              self.pathValue = target.dataset.path.replace(/%5C/g, '/');
              self.fileManagerModalTarget.querySelector('.modal-footer button').click();
              break;
            }
          }
        }, false);
      });
    }
    iframe.src = iframe.dataset.src;
  };
  _proto.drop = function drop(event) {
    event.preventDefault();
    var files = [];
    if (event.dataTransfer.items) {
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          files.push(event.dataTransfer.items[i].getAsFile());
        }
      }
    }
    _classPrivateFieldLooseBase(this, _uploadFiles)[_uploadFiles](files);
    this.dragleave();
  };
  _proto.dragenter = function dragenter(event) {
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
    _classPrivateFieldLooseBase(this, _dragCounter)[_dragCounter]++;
  };
  _proto.dragleave = function dragleave() {
    _classPrivateFieldLooseBase(this, _dragCounter)[_dragCounter]--;
    if (_classPrivateFieldLooseBase(this, _dragCounter)[_dragCounter] === 0) {
      this.element.classList.remove("bg-light");
      this.element.classList.add("bg-white");
    }
  };
  _proto.dragover = function dragover(event) {
    event.preventDefault();
  };
  return _createClass(_default, [{
    key: "fileManagerUrl",
    get: function get() {
      return this.element.dataset.filemanagerUrl;
    }
  }]);
}(Controller);
function _pathUpdateEventListener2(data) {
  this.pathValue = data.detail;
  _classPrivateFieldLooseBase(this, _setErrorMessage)[_setErrorMessage](null);
}
function _toggleProgress2(show) {
  if (show) {
    this.progressTarget.firstElementChild.style.width = '0%';
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
    _classPrivateFieldLooseBase(this, _toggleProgress)[_toggleProgress](true);
    // use XHR to keep upload progress
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.fileManagerUrl);
    xhr.onload = function () {
      var json = JSON.parse(xhr.response);
      if (json.files[0].error) {
        _classPrivateFieldLooseBase(_this4, _setErrorMessage)[_setErrorMessage](json.files[0].name + " : " + json.files[0].error);
      } else {
        _classPrivateFieldLooseBase(_this4, _setErrorMessage)[_setErrorMessage](null);
      }
      _this4.pathValue = json.files[0].url;
      _classPrivateFieldLooseBase(_this4, _toggleProgress)[_toggleProgress](false);
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
      _classPrivateFieldLooseBase(_this4, _toggleProgress)[_toggleProgress](false);
    };
    xhr.upload.onprogress = function (event) {
      var percent = event.loaded / event.total * 100;
      _this4.progressTarget.firstElementChild.style.width = percent + '%';
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
function _disableCropButton2(disabled) {
  if (disabled === void 0) {
    disabled = true;
  }
  if (this.hasCropButtonTarget) {
    this.cropButtonTarget.style.display = disabled ? 'none' : '';
    if (disabled) {
      this.cropButtonTarget.parentNode.classList.add('no-crop');
    } else {
      this.cropButtonTarget.parentNode.classList.remove('no-crop');
    }
  }
}
function _hideClearButton2(hidden) {
  if (hidden === void 0) {
    hidden = true;
  }
  if (this.hasClearButtonTarget) {
    this.clearButtonTarget.style.display = hidden ? 'none' : '';
  }
}
_default.targets = ['inputPath', 'filePreview', 'fileManagerModal', 'progress', 'clearButton', 'cropModal', 'cropButton', 'fileError', 'fileErrorMessage'];
_default.values = {
  path: String
};
export { _default as default };
;
