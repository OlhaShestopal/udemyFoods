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
})({"js/index.js":[function(require,module,exports) {
window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //Timer

  const deadline = '2020-12-31';

  function getTimeRemaning(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  ;

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0".concat(num);
    } else {
      return num;
    }
  }

  ;

  function setClock(selectos, endtime) {
    const timer = document.querySelector(selectos),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaning(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  ;
  setClock('.timer', deadline); //Modal

  const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
  modalTriger.forEach(e => {
    e.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimeInterwal);
  }

  ;
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimeInterwal = setTimeout(openModal, 150000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window, removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); //Card 

  const getResource = async url => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Could not fetch ".concat(url, ", status: ").concat(res.status));
    }

    const data = await res.json();
    console.log(data);
    let result = Object.values(data).map(v => Object.values(v));
    return result;
  };

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = "\n            <img src=".concat(this.src, " alt=").concat(this.alt, ">\n            <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n            <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n            <div class=\"menu__item-divider\"></div>\n            <div class=\"menu__item-price\">\n                <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n                <div class=\"menu__item-total\"><span>").concat(this.price, "</span> \u0433\u0440\u043D/\u0434\u0435\u043D\u044C</div>\n            </div>\n        ");
      this.parent.append(element);
    }

  }

  getResource('http://localhost:8080/get-files').then(data => {
    console.log(data);
    data.forEach((_ref) => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); // POST Forms

  const forms = document.querySelectorAll('form'),
        status = {
    load: "img/forms/spinner.png",
    error: "Что-то пошло не так",
    succes: "Мы скоро с Вами свяжемся"
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  async function postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    const dataInfo = await res.json();
    return dataInfo;
  }

  ;

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = status.load;
      statusMessage.style.cssText = "\n        display: block;\n        margin: 0 auto;\n    ";
      form.insertAdjacentElement('afterend', statusMessage); // form.append(statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:8080/send-form', json).then(dataInfo => {
        console.log(dataInfo);
        showShankDialog(status.succes);
        statusMessage.remove();
      }).catch(() => {
        showShankDialog(status.error);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      });
    });
  }

  ; // Form message

  function showShankDialog(massage) {
    const modalDialogForm = document.querySelector('.modal__dialog');
    modalDialogForm.classList.add('hide');
    openModal();
    const thanksForm = document.createElement('div');
    thanksForm.classList.add('modal__dialog');
    thanksForm.innerHTML = "\n  <div class = \"modal__content\">\n    <div class = \"modal__close\" data-close>\xD7</div>\n    <div class = \"modal__title\">  ".concat(massage, "</div>\n  </div>\n  ");
    document.querySelector('.modal').append(thanksForm);
    setTimeout(() => {
      thanksForm.remove();
      modalDialogForm.classList.add('show');
      modalDialogForm.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  ; // fetch('http://localhost:8080/get-files')
  //   .then(response => response.json())
  //   .then(resalt => console.log(resalt));
  // Slider

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');
  let slideIndex = 1;
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = "\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 15;\n    display: flex;\n    justify-content: center;\n    margin-right: 15%;\n    margin-left: 15%;\n    list-style: none;\n";
  slider.append(indicators);
  let offset = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = "\n      box-sizing: content-box;\n      flex: 0 1 auto;\n      width: 30px;\n      height: 6px;\n      margin-right: 3px;\n      margin-left: 3px;\n      cursor: pointer;\n      background-color: #fff;\n      background-clip: padding-box;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      opacity: .5;\n      transition: opacity .6s ease;\n      ";

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  if (slides.length < 10) {
    total.textContent = "0".concat(slides.length);
    current.textContent = "0".concat(slideIndex);
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = "0".concat(slideIndex);
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, '');
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = "0".concat(slideIndex);
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesField.style.transform = "translateX(-".concat(offset, "px)");

      if (slides.length < 10) {
        current.textContent = "0".concat(slideIndex);
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  }); // function showSlides (n) {
  //     if (n > slides.length) {
  //         slideIndex = 1;
  //       } 
  //     if (n < 1){
  //       slideIndex = slides.length;
  //     }
  //     slides.forEach((item) => item.classList.add ('hide'));
  //     slides[slideIndex - 1].classList.remove('hide');
  //     slides[slideIndex - 1].classList.add ('show');
  //     if (slides.length < 10) {
  //       current.textContent =  `0${slideIndex}`;
  //   } else {
  //       current.textContent =  slideIndex;
  //   }
  // }
  // function plussSlides(n) {
  //   showSlides(slideIndex +=n);
  // }
  // showSlides(slideIndex);
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }
  // prev.addEventListener('click', () =>{
  //   plussSlides(-1);
  // });
  // next.addEventListener('click', () =>{
  //   plussSlides(1);
  // });
  // Calculator

  const result = document.querySelector('.calculating__result span');
  let sex = 'female',
      height,
      weight,
      age,
      ratio = 1.375;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____'; // Можете придумать что угодно

      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcTotal();

  function getStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll("".concat(parentSelector, " div"));
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  ;
  getStaticInfo('#gender', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;

        case "weight":
          weight = +input.value;
          break;

        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  ;
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
});
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53700" + '/');

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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map