// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@msic89/toastly/index.js":[function(require,module,exports) {
const TOP_LEFT = "top-left";
const TOP_RIGHT = "top-right";
const TOP_CENTER = "top-center";
const BOTTOM_LEFT = "bottom-left";
const BOTTOM_RIGHT = "bottom-right";
const BOTTOM_CENTER = "bottom-center";
const initialOptions = {
  type: "primary",
  dismissible: true,
  timeout: 2000,
  position: TOP_RIGHT,
  icon: null,
  background: "#34495e",
  color: "#fff",
};

class Toastly {
  constructor(option = initialOptions) {
    this.optionToasty = { ...this.option, ...option };
    this.toastWrapper = document.createElement("div");
    this.toastWrapper.setAttribute("id", "toast-wrapper");
    this.toastWrapper.setAttribute("class", "toast-wrapper");
    this.animation = "slide-down";
    document.body.appendChild(this.toastWrapper);
  }

  build(content, option = {}) {
    const toastId = new Date().getTime();
    this.option = { ...this.option, ...option };
    this.setPosition();
    const toastNode = document.createElement("div");
    toastNode.setAttribute("id", `toast${toastId}`);
    toastNode.setAttribute("class", `toast ${this.option.type}`);
    toastNode.style.background = this.option.background;

    const toastContentNode = document.createElement("div");
    toastContentNode.setAttribute("class", "content__wrapper");
    toastContentNode.innerHTML = content;
    toastContentNode.style.color = this.option.color;
    toastNode.appendChild(toastContentNode);

    if (this.option.icon) {
      const iconWrapperNode = document.createElement("div");
      iconWrapperNode.setAttribute("class", "icon__wrapper");
      const toastIconNode = document.createElement("span");
      toastIconNode.setAttribute("class", "toast__icon");
      toastIconNode.innerHTML = `<span>${this.option.icon}</span>`;
      toastIconNode.style.color = this.option.background;
      iconWrapperNode.appendChild(toastIconNode);
      toastContentNode.before(iconWrapperNode);
    }

    if (this.option.dismissible) {
      const dismissWrapperNode = document.createElement("div");
      dismissWrapperNode.setAttribute("class", "dismiss__wrapper");
      const dismissNode = document.createElement("button");
      dismissNode.setAttribute("class", "btn__dismiss");
      dismissNode.innerHTML = "&#10005;";
      dismissNode.addEventListener("click", () => {
        this.close(toastNode);
      });
      dismissWrapperNode.appendChild(dismissNode);
      toastContentNode.after(dismissWrapperNode);
    }

    this.toastWrapper.appendChild(toastNode);

    toastNode.style.display = "flex";
    fadeIn(toastNode, () => {
      setTimeout(() => {
        if (this.toastWrapper.contains(toastNode)) {
          fadeOut(toastNode);
          setTimeout(() => {
            this.toastWrapper.removeChild(toastNode);
          }, 500);
        }
      }, this.option.timeout);
    });

    loadCSS(this.animation);
  }

  setPosition() {
    this.toastWrapper.setAttribute("class", "toast-wrapper");
    switch (this.option.position) {
      case BOTTOM_LEFT:
      case BOTTOM_CENTER:
      case BOTTOM_RIGHT:
        this.animation = "slide-up";
        break;
      default:
        this.animation = "slide-down";
        break;
    }
    this.toastWrapper.classList.add(this.option.position);
  }

  close(el) {
    setTimeout(() => {
      if (this.toastWrapper.contains(el)) {
        fadeOut(el);
      }
    }, 200);
  }

  show(content, option = {}) {
    this.build(content, { ...initialOptions, ...option });
  }
  success(content, option) {
    this.build(content, {
      ...option,
      type: "success",
      icon: "&#10004;",
      background: "#39b982",
      color: "#fff",
    });
  }
  error(content, option) {
    this.build(content, {
      ...option,
      type: "danger",
      icon: "&#10005;",
      background: "#f50057",
      color: "#fff",
    });
  }
  info(content, option) {
    this.build(content, {
      ...option,
      type: "info",
      icon: "&#161;",
      background: "#1e88e5",
      color: "#fff",
    });
  }
  warming(content, option) {
    this.build(content, {
      ...option,
      type: "warming",
      icon: "&#9888;",
      background: "#fb8c00",
      color: "#fff",
    });
  }
}

function fadeIn(el, callback = () => {}) {
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
  callback();
}
function fadeOut(el, callback = () => {}) {
  var fadeEffect = setInterval(function () {
    if (!el.style.opacity) {
      el.style.opacity = 1;
    }
    if (el.style.opacity > 0) {
      el.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      el.style.display = "none";
    }
  }, 30);
  callback();
}

function loadCSS(animation = "slide-up") {
  const css = `
:root {
  --primary: #34495e;
  --dander: #f50057;
  --success: #39b982;
  --warning: #fb8c00;
  --info: #1e88e5;
}

.toast-wrapper {
  padding: 0;
  margin: 0;
  width: 300px;
  position: fixed;
  text-align: center;
  z-index: 0;
  margin: 20px 20px 20px 20px;
}
.toast-wrapper * {
  padding: 0;
  margin: 0;
}

.toast {
  position: relative;
  border-radius: 0.1em;
  min-width: 150px;
  min-height: 40px;
  background: #ccc;
  color: #222;
  margin: 10px 0px;
  display: none;
  justify-content: space-between;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.25);
  animation: fade-in 0.8s ease-in-out, ${animation} 0.8s;
  transition: transform 0.8s, opacity 0.5ms;
}
.toast.removing {
  opacity: 0;
}
.toast .icon__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
.toast .toast__icon {
  height: 21px;
  width: 21px;
  background: #fff;
  border-radius: 50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast .content__wrapper {
  flex: 1;
  text-align: justify;
  vertical-align: middle;
  padding: 10px;
  font-size: 14px;
  letter-spacing: normal;
}
.toast .dismiss__wrapper {
  display: flex;
}

.toast .btn__dismiss {
  outline: none;
  border: 0;
  font-size: 18px;
  font-weight: 700;
  padding: 8px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.8s ease;
}

.toast .btn__dismiss:hover,
.toast .btn__dismiss:focus {
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 1);
}

.toast-wrapper.top-left {
  top: 0;
  left: 0;
}
.toast-wrapper.top-right {
  top: 0;
  right: 0;
}
.toast-wrapper.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.toast-wrapper.bottom-left {
  bottom: 0;
  left: 0;
}
.toast-wrapper.bottom-right {
  bottom: 0;
  right: 0;
}
.toast-wrapper.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-wrapper .toast {
  width: 100%;
}

@keyframes slide-down {
  0% {
    transform: translateY(-150px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slide-up {
  0% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
`;

  var element = document.createElement("style");
  element.setAttribute("type", "text/css");
  if ("textContent" in element) {
    element.textContent = css;
  } else {
    element.styleSheet.cssText = css;
  }
  document.getElementsByTagName("head")[0].appendChild(element);
}

module.exports = Toastly;

},{}],"index.js":[function(require,module,exports) {
"use strict";

var _toastly = _interopRequireDefault(require("@msic89/toastly"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toast = new _toastly.default();

var $ = function $(el) {
  el = document.querySelector(el);
  return el;
};

$("#toast-1").addEventListener("click", function () {
  toast.error("Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam amet\n    expedita, dolorem tempora sint sed modi assumenda vitae veritatis saepe rem\n    corporis non illo magni, perspiciatis exercitationem fugit hic ipsum.", {
    position: "top-left"
  });
});
$("#toast-2").addEventListener("click", function () {
  toast.show("Send us <b>an email</b> to get support", {
    position: "top-center",
    background: "coral",
    color: "#000"
  });
});
$("#toast-3").addEventListener("click", function () {
  toast.success("Lorem ipsum dolor sit amet consectetur adipisicing elit.", {
    position: "top-right"
  });
});
$("#toast-4").addEventListener("click", function () {
  toast.info("Lorem ipsum <b>dolor sit amet consectetur</b> adipisicing elit.", {
    position: "bottom-left"
  });
});
$("#toast-5").addEventListener("click", function () {
  toast.warming("Lorem ipsum dolor sit amet consectetur adipisicing elit.", {
    position: "bottom-center"
  });
});
$("#toast-6").addEventListener("click", function () {
  toast.success("Lorem ipsum dolor sit amet consectetur adipisicing elit.", {
    position: "bottom-right"
  });
});
},{"@msic89/toastly":"node_modules/@msic89/toastly/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40151" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/examples.e31bb0bc.js.map