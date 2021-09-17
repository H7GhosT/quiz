// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"45cKZ":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d1cc9c866c746c786f4f7dafd167a1ea";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"u1gPB":[function(require,module,exports) {
var _componentsQuizSection = require("./components/quiz-section");
require("./components/utils");
let quiz = {
  name: "My first quiz",
  quests: [{
    title: "Answer the question",
    type: "question",
    question: "What is the name of the first function called when executing a C++ program?",
    correctAnswers: ["main"],
    answer: ""
  }, {
    title: "Choose the right answer",
    type: "choose one",
    question: "What is the time complexity of 'Binary search'?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswers: [3]
  }, {
    title: "Choose the right answers",
    type: "choose multiple",
    question: "What may be the result of a sorting algorithm applied on an set of numbers?",
    options: ["[1, 4, 5, 3, 10, 14]", "[55, 90, 91, 123, 241]", "[62, 42, -1, -2, -99]"],
    correctAnswers: [2, 3]
  }, {
    title: "Complete empty spaces",
    type: "complete",
    question: 'Write a function named "Hello" that prints "Hello world" to the console and something more here',
    text: `<pre>function <span><c id="1" width="5" /></span>() {
  console.<span><c id="2" width="3"/></span>(<span><c id="3" width="13"/></span>);
}</pre>`,
    correctAnswers: {
      1: "Hello",
      2: "log",
      3: '"Hello world"'
    }
  }, {
    title: "Match the sides",
    type: "match",
    question: "Match the size of given types",
    left: ["int", "char", "short"],
    right: ["8 bits", "16 bits", "32 bits"],
    correctAnswers: [[1, 3], [2, 1], [3, 2]]
  }]
};
for (const q of quiz.quests) {
  q.answer = null;
  q.answers = null;
}
function main() {
  const $quiz = document.querySelector("#quiz");
  function makeQuest(idx) {
    const $placeholder = document.createElement("div");
    $quiz.innerHTML = "";
    $quiz.appendChild($placeholder);
    const ret = {
      quizSection: new _componentsQuizSection.QuizSection($placeholder, {
        progress: {
          value: idx + 1,
          total: quiz.quests.length
        },
        quest: quiz.quests[idx],
        onPrev: () => {
          if (current.questIdx > 0) {
            current = makeQuest(current.questIdx - 1);
          }
        },
        onNext: () => {
          if (current.questIdx < quiz.quests.length - 1) {
            current = makeQuest(current.questIdx + 1);
          }
        }
      }),
      questIdx: idx
    };
    return ret;
  }
  let current = makeQuest(0);
}
main();

},{"./components/quiz-section":"7IAcq","./components/utils":"1MFtj"}],"7IAcq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "QuizSection", function () {
  return QuizSection;
});
var _checkList = require("./check-list");
var _complete = require("./complete");
var _match = require("./match");
var _progress = require("./progress");
var _textField = require("./text-field");
var _utils = require("./utils");
class QuizSection {
  /**
  *
  * @param {HTMLElement} $target
  * @param {{progress: {value: number, total: number}}} param1
  */
  constructor($target, {quest, progress, onNext, onPrev, onFinish}) {
    this.$element = _utils.createElementFrom(`
      <div class="quiz-section">
        <div class="paper-4 quiz-section__wrapper">
          <div class="title primary">
            ${quest.title}
          </div>
          <div class="spacey-2"></div>
          <div class="subtitle">
            ${quest.question}
          </div>
          <div class="spacey-1"></div>
          <div class="quiz-section__content"></div>
          <div class="spacey-2"></div>
          <div class="space-between">
            <div class="progress"></div>
            <div class="quiz-section__buttons"></div>
          </div>
        </div>
      </div>
    `);
    $target.replaceWith(this.$element);
    this.$quizSectionWrap = this.$element.querySelector(".quiz-section__wrapper");
    this.$buttonsContainer = this.$element.querySelector(".quiz-section__buttons");
    this.updateProgress(progress.value, progress.total);
    this.onNext = onNext || (() => {});
    this.onPrev = onPrev || (() => {});
    this.onFinish = onFinish || (() => {});
    this.$content = this.$element.querySelector(".quiz-section__content");
    const typeHandlers = {
      question: () => {
        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);
        const input = new _textField.OLTextField($placeholder, {
          value: quest.answer || "",
          label: "Your answer"
        });
        input.onInput = () => {
          quest.answer = input.value;
        };
      },
      choose: multiple => {
        const $form = document.createElement("form");
        $form.onsubmit = e => e.preventDefault();
        const $placeholder = document.createElement("div");
        this.$content.appendChild($form);
        $form.appendChild($placeholder);
        if (!quest.answers) quest.answers = [];
        const checklist = new _checkList.CheckList($placeholder, {
          multiple,
          items: quest.options.map((o, i) => ({
            value: o,
            checked: quest.answers.includes(i + 1)
          }))
        });
        checklist.onChange = () => {
          quest.answers = [];
          checklist.items.forEach((i, idx) => {
            if (i.checked) quest.answers.push(idx + 1);
          });
        };
      },
      "choose one": function () {
        this.choose(false);
      },
      "choose multiple": function () {
        this.choose(true);
      },
      complete: () => {
        if (!quest.answers) quest.answers = {};
        const $placeholder = document.createElement("div");
        this.$content.append($placeholder);
        const complete = new _complete.Complete($placeholder, {
          values: quest.answers,
          text: quest.text
        });
        complete.onInput = ({id, value}) => {
          quest.answers[id] = value;
        };
      },
      match: () => {
        if (!quest.answers) quest.answers = [];
        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);
        const match = new _match.Match($placeholder, {
          left: quest.left,
          right: quest.right,
          connections: quest.answers.map(([l, r]) => [l - 1, r - 1])
        });
        match.onChange = match.onRemove = match.onNewConnection = match.onRemoveConnection = () => {
          quest.left = match.left.map(i => i.value);
          quest.right = match.right.map(i => i.value);
          quest.answers = match.connections.map(c => [c[0] + 1, c[1] + 1]);
        };
      }
    };
    typeHandlers[quest.type] && typeHandlers[quest.type]();
  }
  updateProgress(value, total) {
    this.progress = new _progress.Progress(this.$element.querySelector(".progress"), {
      value,
      total
    });
    this.$buttonsContainer.innerHTML = "";
    let $prev;
    let $next;
    let $finish;
    if (value > 1) {
      this.$buttonsContainer.append($prev = _utils.createElementFrom(`<button class="text-button secondary">prev</button>`), _utils.createElementFrom(`<span class="spacex-1"></span>`));
    }
    if (value < total) {
      this.$buttonsContainer.appendChild($next = _utils.createElementFrom(`<button class="filled-button primary">next</button>`));
    }
    if (value == total) {
      this.$buttonsContainer.appendChild($finish = _utils.createElementFrom(`<button class="filled-button success">finish</button>`));
    }
    if ($prev) $prev.addEventListener("click", () => this.onPrev());
    if ($next) $next.addEventListener("click", () => this.onNext());
    if ($finish) $finish.addEventListener("click", () => this.onFinish());
  }
  remove() {
    this.$element.remove();
  }
}

},{"./check-list":"5OpCq","./complete":"4g3Hn","./match":"6TdH9","./progress":"4UDJx","./text-field":"3ZTJh","./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"5OpCq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "CheckList", function () {
  return CheckList;
});
var _textField = require("./text-field");
var _utils = require("./utils");
class CheckList {
  /**
  *
  * @param {HTMLElement} $target
  * @param {{
  *  name: string,
  *  multiple: boolean,
  *  items: Array<{key: any, value: string, checked: boolean}>,
  *  editable?: boolean
  * }} param1
  */
  constructor($target, {name, multiple, items, editable = false}) {
    this.$element = document.createElement("div");
    this.multiple = multiple;
    this.editable = editable;
    this.name = name || "checklist_" + _utils.genId();
    /**
    * @type {Array<{
    *  key: string|number,
    *  value: string,
    *  checked: boolean,
    *  $input: HTMLInputElement,
    *  textField?: ULTextField,
    *  $element: HTMLInputElement
    * }>}
    */
    this.items = [];
    $target.replaceWith(this.$element);
    this.onChange = () => {};
    this.onRemove = () => {};
    for (const i of items) this.addItem(i);
    return this;
  }
  /**
  *
  * @param {{
  *  value: string,
  *  checked: boolean
  * }} param0
  * @returns
  */
  addItem({value, checked = false}) {
    const type = this.multiple ? "checkbox" : "radio";
    let key = "item_" + _utils.genId();
    const newItem = {
      key,
      value,
      get checked() {
        return !!this.$input.checked;
      },
      set checked(v) {
        this.$input.checked = v;
      },
      $input: null,
      textField: null,
      $element: _utils.createElementFrom(`
        <div>
          <label for="${key}" class="checklist-item ${this.editable ? "editable" : ""}">
            <input ${checked ? "checked" : ""} type="${type}" name="${this.name}" id="${key}"/>
            <div class="${type}__mark"></div>
            <div class="checklist-item__value">${value}</div>
            ${this.editable ? `<span class="spacex-1"></span>
                  <button type="button" class="checklist-item__remove cross-btn secondary small"></button>` : ``}
          </label>
        </div>
    `)
    };
    newItem.$input = newItem.$element.querySelector("input");
    newItem.checked = checked;
    newItem.$input.addEventListener("change", () => {
      this.onChange({
        ...newItem
      });
    });
    this.$element.appendChild(newItem.$element);
    this.items.push(newItem);
    if (this.editable) {
      newItem.textField = new _textField.ULTextField(newItem.$element.querySelector(".checklist-item__value"), {
        multiline: true,
        placeholder: "Option",
        value: newItem.value,
        required: true
      });
      newItem.textField.onInput = () => {
        newItem.value = newItem.textField.value;
        this.onChange({
          ...newItem
        });
      };
      newItem.$element.querySelector(".checklist-item__remove").addEventListener("click", () => {
        this.removeItem(newItem);
      });
    }
    return newItem;
  }
  /**
  *
  * @param {{
  *  key: string|number,
  *  value: string,
  *  $element: HTMLElement
  * }} param0
  */
  removeItem({key = null, value = null, $element = null}) {
    let removed = null;
    this.items.splice(this.items.findIndex(item => {
      if (item.key == key || item.value == value || item.$element == $element) {
        removed = item;
        item.$element.remove();
        return true;
      }
    }), 1);
    if (removed) this.onRemove({
      ...removed
    });
  }
  reportValidity() {
    let valid = this.items.every(i => i.textField.reportValidity());
    if (valid) {
      valid = this.items.findIndex(i => i.$input.checked) != -1;
      if (!valid) {
        this.items[0].$input.setCustomValidity("Please check at least 1 item");
        this.items[0].$input.reportValidity();
        this.items[0].$input.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      }
    }
    return valid;
  }
}

},{"./text-field":"3ZTJh","./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"3ZTJh":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "OLTextField", function () {
  return OLTextField;
});
_parcelHelpers.export(exports, "ULTextField", function () {
  return ULTextField;
});
var _utils = require("./utils");
class TextFieldBase {
  /**
  *
  * @param {HTMLElement} $target
  * @param {HTMLElement} $element
  */
  constructor($target, $element, {required, placeholder, value}) {
    this.$element = $element;
    /**
    * @type {HTMLTextAreaElement | HTMLInputElement}
    */
    this.$input = this.$element.querySelector("[data-input]");
    this.$input.required = required;
    if (placeholder) this.placeholder = placeholder;
    if (value) this.value = value;
    this.$input.addEventListener("focus", () => {
      this.$element.classList.add("has-text", "active");
    });
    this.$input.addEventListener("blur", () => {
      if (!this.value && !this.placeholder) {
        this.$element.classList.remove("has-text");
      }
      this.$element.classList.remove("active");
      this.onBlur();
    });
    this.onInput = () => {};
    this.onBlur = () => {};
    this.$element.querySelector("[data-input]").addEventListener("input", () => {
      this.multiline && this._resize();
      this.onInput();
    });
    $target.replaceWith(this.$element);
  }
  set value(v) {
    this.$input.value = v;
    if (v) this.$element.classList.add("has-text"); else this.$element.classList.remove("has-text");
    this.multiline && this._resize();
  }
  get value() {
    return this.$input.value;
  }
  set placeholder(v) {
    this.$input.placeholder = v;
    if (v) this.$element.classList.add("has-text"); else this.$element.classList.remove("has-text");
  }
  get placeholder() {
    return this.$input.placeholder;
  }
  focus() {
    this.$input.focus();
    this.$input.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }
  blur() {
    this.$input.blur();
  }
  reportValidity() {
    const valid = this.$input.reportValidity();
    if (!valid) this.$input.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
    return valid;
  }
}
class OLTextField extends TextFieldBase {
  /**
  *
  * @param {HTMLElement} $target
  * @param {{
  *  placeholder: string,
  *  value: string,
  *  label: string,
  *  required: boolean
  * }} param1
  */
  constructor($target, {placeholder = "", value = "", label = "", required = false}) {
    super($target, _utils.createElementFrom(`
        <div class="ol-text-field">
          <input class="ol-text-field__input" type="text" data-input />
          ${label ? `<span class="ol-text-field__label">${label}</span>` : ""}
        </div>
    `), {
      required,
      value,
      placeholder
    });
  }
}
class ULTextField extends TextFieldBase {
  /**
  *
  * @param {HTMLElement} $target
  * @param {{
  *  placeholder: string,
  *  value: string,
  *  multiline: boolean,
  *  required: boolean
  *  disableEnter: boolean
  * }} param1
  */
  constructor($target, {placeholder = "", value = "", multiline = false, required = false, disableEnter = false}) {
    super($target, _utils.createElementFrom(`
        <div class="ul-text-field">
        ${multiline ? `<textarea role="textbox" class="ul-text-field__input" data-input ></textarea>` : `<input class="ul-text-field__input" type="text" data-input />`}
        </div>
    `), {
      required,
      placeholder
    });
    this.multiline = multiline;
    this.value = value;
    if (this.multiline && disableEnter) {
      this.$input.addEventListener("keydown", e => {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    }
  }
  _resize() {
    const $wrap = _utils.createElementFrom(`<div><pre></pre></div>`);
    const $pre = $wrap.querySelector("pre");
    const style = window.getComputedStyle(this.$input);
    $pre.innerText = this.value + " ";
    $pre.style.fontSize = style.fontSize;
    $pre.style.fontFamily = style.fontFamily;
    $pre.style.fontWeight = style.fontWeight;
    $wrap.style.width = this.$input.clientWidth + "px";
    $pre.style.whiteSpace = "pre-wrap";
    $pre.style.wordWrap = "break-word";
    $wrap.style.visibility = "hidden";
    document.body.appendChild($wrap);
    this.$input.style.height = $pre.clientHeight + "px";
    $wrap.remove();
  }
}

},{"./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"1MFtj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "createElementFrom", function () {
  return createElementFrom;
});
_parcelHelpers.export(exports, "genId", function () {
  return genId;
});
function createElementFrom(str) {
  /**
  * @type {HTMLTemplateElement}
  */
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}
function genId() {
  return performance.now().toString(36);
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"417ty":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"4g3Hn":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Complete", function () {
  return Complete;
});
_parcelHelpers.export(exports, "parseText", function () {
  return parseText;
});
_parcelHelpers.export(exports, "unParseText", function () {
  return unParseText;
});
var _utils = require("./utils");
class Complete {
  /**
  * @param {HTMLElement} $target
  * @param {{
  *  text: string,
  *  values: {[key: string]: string},
  *  disabled: boolean
  * }} param1
  */
  constructor($target, {text = "", values = {}, disabled = false}) {
    this.$element = document.createElement("div");
    this.onInput = () => {};
    this._disabled = disabled;
    this.setText({
      text,
      values
    });
    $target.replaceWith(this.$element);
  }
  /**
  *
  * @param {{
  *  text: string
  *  values: {[key: string]: string}
  * }} param0
  */
  setText({text, values}) {
    this.$element.innerHTML = "";
    this.text = text;
    this.values = {
      ...values
    };
    this.$content = _utils.createElementFrom(text);
    if (this.$content) {
      this.$content.querySelectorAll("c").forEach(c => {
        const w = c.getAttribute("width");
        const id = c.getAttribute("id");
        const $span = document.createElement("span");
        const $inp = _utils.createElementFrom(`<input data-id="${id}" class="inline-text-field" type="text" maxlength="${w}" ${this._disabled ? "disabled" : ""} />`);
        $span.style.visibility = "hidden";
        $span.style.position = "absolute";
        $span.innerText = ("m").repeat(w);
        $span.style.fontSize = $inp.style.fontSize = "1rem";
        $span.style.fontFamily = $inp.style.fontFamily = "monospace";
        document.body.appendChild($span);
        $inp.style.width = $span.clientWidth + "px";
        $inp.value = values[id] || "";
        $inp.addEventListener("input", () => {
          this.values[id] = $inp.value;
          this.onInput({
            id,
            value: $inp.value
          });
        });
        c.replaceWith($inp);
        $span.remove();
      });
      this.$element.appendChild(this.$content);
      this.$content.style.whiteSpace = "pre-wrap";
      this.$content.style.wordWrap = "break-word";
    }
  }
}
function parseText(text) {
  const $pre = document.createElement("pre");
  let currentId = 1;
  const values = {};
  let toComplete = "";
  let mode = false;
  function put() {
    if (toComplete) {
      $pre.append(_utils.createElementFrom(`<span><c id="${currentId}" width="${toComplete.length}" /></span>`));
      values[currentId] = toComplete;
      currentId++;
      toComplete = "";
    }
    mode = false;
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] == "\\") {
      if (i == text.length - 1) continue;
      i++;
      if (text[i] == "\n") continue;
      if (mode) toComplete += text[i]; else $pre.append(document.createTextNode(text[i]));
    } else if (text[i] == "\n") {
      put();
      $pre.append(document.createTextNode("\n"));
    } else if (mode) {
      if (text[i] == "]") {
        put();
      } else {
        toComplete += text[i];
      }
    } else if (text[i] == "[") {
      mode = true;
    } else {
      $pre.append(document.createTextNode(text[i]));
    }
  }
  put();
  return {
    parsedText: $pre.outerHTML,
    values
  };
}
function unParseText({parsedText, values}) {
  const replace = s => s.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
  const $pre = _utils.createElementFrom(replace(parsedText));
  $pre.querySelectorAll("c").forEach(c => {
    const id = c.getAttribute("id");
    c.replaceWith(document.createTextNode(`[${replace(values[id] || "")}]`));
  });
  return $pre.innerText;
}

},{"./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"6TdH9":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Match", function () {
  return Match;
});
var _textField = require("./text-field");
var _utils = require("./utils");
class Match {
  /**
  * @param {HTMLElement} $target
  * @param {{
  *  left: string[],
  *  right: string[],
  *  connections: number[][],
  *  editable: boolean
  * }} param1
  */
  constructor($target, {left = [], right = [], connections = [], editable = false}) {
    this._canvasWidth = 100;
    this.$element = _utils.createElementFrom(`
      <div class="match">
        <div class="match__side match__side--left"></div>
        <canvas class="match__middle" width="${this._canvasWidth}" height="0"></canvas>
        <div class="match__side match__side--right"></div>
      </div>
    `);
    $target.replaceWith(this.$element);
    this.$left = this.$element.querySelector(".match__side--left");
    this.$right = this.$element.querySelector(".match__side--right");
    /**
    * @type {HTMLCanvasElement}
    */
    this.$middle = this.$element.querySelector(".match__middle");
    this._selected = [null, null];
    this._ctx = this.$middle.getContext("2d");
    /**
    * @type {number[][]}
    */
    this._connections = [];
    /**
    * @typedef {{
    *  value: string,
    *  $element: HTMLElement,
    *  $btn: HTMLButtonElement,
    *  textField?: ULTextField}} _Item
    */
    /**
    * @type {Array<_Item>}
    */
    this.left = [];
    /**
    * @type {Array<_Item>}
    */
    this.right = [];
    this.editable = editable;
    for (let item of left) {
      this.addLeft(item);
    }
    for (let item of right) {
      this.addRight(item);
    }
    this.connections = connections.map(c => [...c]);
    this.onNewConnection = ([_, __]) => {};
    this.onRemoveConnection = ([_, __]) => {};
    this.onRemove = ({sideName, item}) => {};
    this.onChange = ({sideName, item}) => {};
  }
  _drawConnections() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    for (const c of this._connections) {
      if (!this.left[c[0]] || !this.right[c[1]]) {
        continue;
      }
      const $lel = this.left[c[0]].$btn;
      const $rel = this.right[c[1]].$btn;
      const lbr = $lel.getBoundingClientRect();
      const rbr = $rel.getBoundingClientRect();
      const top = this.$middle.getBoundingClientRect().top;
      const y1 = lbr.top + lbr.height / 2 - top;
      const y2 = rbr.top + rbr.height / 2 - top;
      this._ctx.lineWidth = 4;
      this._ctx.strokeStyle = "#00a8a8";
      this._ctx.beginPath();
      this._ctx.moveTo(0, y1);
      this._ctx.lineTo(this._ctx.canvas.width, y2);
      this._ctx.stroke();
      $lel.classList.add("match-button--active");
      $rel.classList.add("match-button--active");
      $lel.blur();
      $rel.blur();
    }
  }
  set connections(v) {
    this._connections = v;
    this._drawConnections();
  }
  get connections() {
    return this._connections;
  }
  /**
  *
  * @param {number[]} c
  * @returns
  */
  addConnection(connection) {
    this._removeConnectionHelper(connection);
    this._connections.push([...connection]);
    this.connections = this._connections;
    this.onNewConnection([...connection]);
  }
  /**
  *
  * @param {Array<number?>} connection
  */
  removeConnection(connection) {
    const rc = this._removeConnectionHelper(connection);
    this.connections = this._connections;
    this.onRemoveConnection(rc);
  }
  _removeConnectionHelper(connection) {
    let ret = [];
    this._connections = this._connections.filter(c => {
      if (c[0] == connection[0] || c[1] == connection[1]) {
        ret = [...c];
        this.left[c[0]].$btn.classList.remove("match-button--active");
        this.right[c[1]].$btn.classList.remove("match-button--active");
        return false;
      }
      return true;
    });
    return ret;
  }
  /**
  *
  * @param {string} value
  * @returns {_Item}
  */
  addLeft(value) {
    return this._addToSide(value, "left");
  }
  /**
  *
  * @param {string} value
  * @returns {_Item}
  */
  addRight(value) {
    return this._addToSide(value, "right");
  }
  removeLeft(idx) {
    const removed = this._removeSide(idx, "left");
    this.onRemove({
      sideName: "left",
      removed
    });
    return removed;
  }
  removeRight(idx) {
    const removed = this._removeSide(idx, "right");
    this.onRemove({
      sideName: "right",
      removed
    });
    return removed;
  }
  _removeSide(idx, sideName) {
    let sideItems = this[sideName];
    let ci = sideName == "left" ? 0 : 1;
    this.removeConnection(sideName == "left" ? [idx, null] : [null, idx]);
    for (const c of this._connections) {
      if (c[ci] > idx) c[ci]--;
    }
    if (this._selected[ci] == idx) {
      this._selected[ci] = null;
    }
    const removed = sideItems.splice(idx, 1)[0];
    removed.$element.remove();
    for (let i = idx; i < sideItems.length; i++) {
      sideItems[i].key--;
    }
    this._adjustHeight();
    return removed;
  }
  _addToSide(value, sideName) {
    const $side = this["$" + sideName];
    const sideItems = this[sideName];
    let [ci1, ci2] = sideName == "left" ? [0, 1] : [1, 0];
    const newItem = {
      key: sideItems.length,
      value,
      $element: _utils.createElementFrom(`
        <div class="match-button__wrapper match-button__wrapper--${sideName}">
          <button class="match-button match-button--${sideName}">
            <div class="match-button__value">${value}</div>
          </button>
          ${this.editable ? `<button type="button" class="match-button__remove cross-btn secondary x-small"></button>` : ""}
        </div>
      `),
      $btn: null
    };
    newItem.$btn = newItem.$element.querySelector(".match-button");
    $side.appendChild(newItem.$element);
    if (this.editable) {
      newItem.textField = new _textField.ULTextField(newItem.$btn.querySelector(".match-button__value"), {
        multiline: true,
        disableEnter: true,
        value,
        placeholder: sideName.charAt(0).toUpperCase() + sideName.slice(1),
        required: true
      });
      newItem.textField.onInput = () => {
        newItem.value = newItem.textField.value;
        this._adjustHeight();
        this.onChange({
          sideName,
          item: newItem
        });
      };
      newItem.$element.querySelector(".match-button__remove").addEventListener("click", () => {
        const r = this._removeSide(newItem.key, sideName);
        this.onRemove({
          item: r,
          sideName
        });
      });
    }
    newItem.$btn.addEventListener("focus", e => {
      this._selected[ci1] = newItem.key;
      this.removeConnection(sideName == "left" ? [newItem.key, null] : [null, newItem.key]);
      if (this._selected[ci2] != null) {
        this.addConnection([this._selected[0], this._selected[1]]);
        this._selected = [null, null];
      }
    });
    newItem.$btn.addEventListener("blur", () => {
      setTimeout(() => {
        if (this._selected[ci1] == newItem.key) this._selected[ci1] = null;
      }, 10);
    });
    this._adjustHeight();
    sideItems.push(newItem);
    return newItem;
  }
  _adjustHeight() {
    this.$middle.height = 0;
    this.$middle.height = this.$element.clientHeight;
    this._drawConnections();
  }
  reportValidity() {
    if (this.editable) {
      let valid = this.left.every(i => i.textField.reportValidity()) && this.right.every(i => i.textField.reportValidity());
      if (valid && !this._connections.length) {
        valid = false;
        this.left[0].$btn.setCustomValidity("There should be at least 1 connection");
        this.left[0].$btn.reportValidity();
        this.left[0].$btn.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      }
      return valid;
    }
    return true;
  }
}

},{"./text-field":"3ZTJh","./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}],"4UDJx":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Progress", function () {
  return Progress;
});
var _utils = require("./utils");
class Progress {
  /**
  *
  * @param {HTMLElement} $target
  * @param {{value: number, total: number}} param1
  */
  constructor($target, {value, total}) {
    this._value = value;
    this._total = total;
    this.$element = _utils.createElementFrom(`
    <div class="progress">
      <div class="progress__text">
      </div>
      <div class="progress__bar">
      </div>
    </div>
  `);
    this._updateProgress();
    $target.replaceWith(this.$element);
  }
  set value(v) {
    this._value = v;
    this._updateProgress();
  }
  get value() {
    return this._value;
  }
  set total(v) {
    this._total = v;
    this._updateProgress();
  }
  get total() {
    return this._total;
  }
  _updateProgress() {
    const $ptext = this.$element.querySelector(".progress__text");
    const $pbar = this.$element.querySelector(".progress__bar");
    $ptext.innerText = `${this.value} of ${this.total}`;
    $pbar.innerHTML = "";
    for (let i = 1; i <= this.value; i++) {
      $pbar.append(_utils.createElementFrom(`<div class="progress__bit progress__bit--done"></div>`), _utils.createElementFrom(`<div class="spacex-1px"></div>`));
    }
    for (let i = this.value + 1; i < this.total; i++) {
      $pbar.append(_utils.createElementFrom(`<div class="progress__bit"></div>`), _utils.createElementFrom(`<div class="spacex-1px"></div>`));
    }
    if (this.value < this.total) {
      $pbar.append(_utils.createElementFrom(`<div class="progress__bit"></div>`));
    }
  }
}

},{"./utils":"1MFtj","@parcel/transformer-js/lib/esmodule-helpers.js":"417ty"}]},["45cKZ","u1gPB"], "u1gPB", "parcelRequiref125")

//# sourceMappingURL=quiz.d167a1ea.js.map
