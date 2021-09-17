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
})({"../node_modules/uuid/dist/esm-browser/rng.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],"../node_modules/uuid/dist/esm-browser/regex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/validate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":"../node_modules/uuid/dist/esm-browser/regex.js"}],"../node_modules/uuid/dist/esm-browser/stringify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/v1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":"../node_modules/uuid/dist/esm-browser/rng.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js"}],"../node_modules/uuid/dist/esm-browser/parse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/v35.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js","./parse.js":"../node_modules/uuid/dist/esm-browser/parse.js"}],"../node_modules/uuid/dist/esm-browser/md5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/v3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./v35.js":"../node_modules/uuid/dist/esm-browser/v35.js","./md5.js":"../node_modules/uuid/dist/esm-browser/md5.js"}],"../node_modules/uuid/dist/esm-browser/v4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  var rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":"../node_modules/uuid/dist/esm-browser/rng.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js"}],"../node_modules/uuid/dist/esm-browser/sha1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/v5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./v35.js":"../node_modules/uuid/dist/esm-browser/v35.js","./sha1.js":"../node_modules/uuid/dist/esm-browser/sha1.js"}],"../node_modules/uuid/dist/esm-browser/nil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./v1.js":"../node_modules/uuid/dist/esm-browser/v1.js","./v3.js":"../node_modules/uuid/dist/esm-browser/v3.js","./v4.js":"../node_modules/uuid/dist/esm-browser/v4.js","./v5.js":"../node_modules/uuid/dist/esm-browser/v5.js","./nil.js":"../node_modules/uuid/dist/esm-browser/nil.js","./version.js":"../node_modules/uuid/dist/esm-browser/version.js","./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js","./parse.js":"../node_modules/uuid/dist/esm-browser/parse.js"}],"components/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElementFrom = createElementFrom;
exports.genId = genId;

var uuid = _interopRequireWildcard(require("uuid"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 
 * @param {string} str 
 * @returns {HTMLElement}
 */
function createElementFrom(str) {
  /**
   * @type {HTMLTemplateElement}
   */
  var template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}

function genId() {
  return uuid.v1();
}
},{"uuid":"../node_modules/uuid/dist/esm-browser/index.js"}],"components/text-field.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ULTextField = exports.OLTextField = void 0;

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextFieldBase = /*#__PURE__*/function () {
  /**
   *
   * @param {HTMLElement} $target
   * @param {HTMLElement} $element
   */
  function TextFieldBase($target, $element, _ref) {
    var _this = this;

    var required = _ref.required,
        placeholder = _ref.placeholder,
        value = _ref.value;

    _classCallCheck(this, TextFieldBase);

    this.$element = $element;
    /**
     * @type {HTMLTextAreaElement | HTMLInputElement}
     */

    this.$input = this.$element.querySelector("[data-input]");
    this.$input.required = required;
    if (placeholder) this.placeholder = placeholder;
    if (value) this.value = value;
    this.$input.addEventListener("focus", function () {
      _this.$element.classList.add("has-text", "active");
    });
    this.$input.addEventListener("blur", function () {
      if (!_this.value && !_this.placeholder) {
        _this.$element.classList.remove("has-text");
      }

      _this.$element.classList.remove("active");

      _this.onBlur();
    });

    this.onInput = function () {};

    this.onBlur = function () {};

    this.$element.querySelector("[data-input]").addEventListener("input", function () {
      _this.multiline && _this._resize();

      _this.onInput();
    });
    $target.replaceWith(this.$element);
  }

  _createClass(TextFieldBase, [{
    key: "value",
    get: function get() {
      return this.$input.value;
    },
    set: function set(v) {
      this.$input.value = v;
      if (v) this.$element.classList.add("has-text");else this.$element.classList.remove("has-text");
      this.multiline && this._resize();
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.$input.placeholder;
    },
    set: function set(v) {
      this.$input.placeholder = v;
      if (v) this.$element.classList.add("has-text");else this.$element.classList.remove("has-text");
    }
  }, {
    key: "focus",
    value: function focus() {
      this.$input.focus();
      this.$input.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, {
    key: "blur",
    value: function blur() {
      this.$input.blur();
    }
  }, {
    key: "reportValidity",
    value: function reportValidity() {
      var valid = this.$input.reportValidity();
      if (!valid) this.$input.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
      return valid;
    }
  }]);

  return TextFieldBase;
}();

var OLTextField = /*#__PURE__*/function (_TextFieldBase) {
  _inherits(OLTextField, _TextFieldBase);

  var _super = _createSuper(OLTextField);

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
  function OLTextField($target, _ref2) {
    var _ref2$placeholder = _ref2.placeholder,
        placeholder = _ref2$placeholder === void 0 ? "" : _ref2$placeholder,
        _ref2$value = _ref2.value,
        value = _ref2$value === void 0 ? "" : _ref2$value,
        _ref2$label = _ref2.label,
        label = _ref2$label === void 0 ? "" : _ref2$label,
        _ref2$required = _ref2.required,
        required = _ref2$required === void 0 ? false : _ref2$required;

    _classCallCheck(this, OLTextField);

    return _super.call(this, $target, (0, _utils.createElementFrom)("\n        <div class=\"ol-text-field\">\n          <input class=\"ol-text-field__input\" type=\"text\" data-input />\n          ".concat(label ? "<span class=\"ol-text-field__label\">".concat(label, "</span>") : "", "\n        </div>\n    ")), {
      required: required,
      value: value,
      placeholder: placeholder
    });
  }

  return OLTextField;
}(TextFieldBase);

exports.OLTextField = OLTextField;

var ULTextField = /*#__PURE__*/function (_TextFieldBase2) {
  _inherits(ULTextField, _TextFieldBase2);

  var _super2 = _createSuper(ULTextField);

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
  function ULTextField($target, _ref3) {
    var _this2;

    var _ref3$placeholder = _ref3.placeholder,
        placeholder = _ref3$placeholder === void 0 ? "" : _ref3$placeholder,
        _ref3$value = _ref3.value,
        value = _ref3$value === void 0 ? "" : _ref3$value,
        _ref3$multiline = _ref3.multiline,
        multiline = _ref3$multiline === void 0 ? false : _ref3$multiline,
        _ref3$required = _ref3.required,
        required = _ref3$required === void 0 ? false : _ref3$required,
        _ref3$disableEnter = _ref3.disableEnter,
        disableEnter = _ref3$disableEnter === void 0 ? false : _ref3$disableEnter;

    _classCallCheck(this, ULTextField);

    _this2 = _super2.call(this, $target, (0, _utils.createElementFrom)("\n        <div class=\"ul-text-field\">\n        ".concat(multiline ? "<textarea role=\"textbox\" class=\"ul-text-field__input\" data-input ></textarea>" : "<input class=\"ul-text-field__input\" type=\"text\" data-input />", "\n        </div>\n    ")), {
      required: required,
      placeholder: placeholder
    });
    _this2.multiline = multiline;
    _this2.value = value;

    if (_this2.multiline && disableEnter) {
      _this2.$input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    }

    return _this2;
  }

  _createClass(ULTextField, [{
    key: "_resize",
    value: function _resize() {
      var $wrap = (0, _utils.createElementFrom)("<div><pre></pre></div>");
      var $pre = $wrap.querySelector("pre");
      var style = window.getComputedStyle(this.$input);
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
  }]);

  return ULTextField;
}(TextFieldBase);

exports.ULTextField = ULTextField;
},{"./utils":"components/utils.js"}],"components/check-list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckList = void 0;

var _textField = require("./text-field");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CheckList = /*#__PURE__*/function () {
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
  function CheckList($target, _ref) {
    var name = _ref.name,
        multiple = _ref.multiple,
        items = _ref.items,
        _ref$editable = _ref.editable,
        editable = _ref$editable === void 0 ? false : _ref$editable;

    _classCallCheck(this, CheckList);

    this.$element = document.createElement("div");
    this.multiple = multiple;
    this.editable = editable;
    this.name = name || "checklist_" + (0, _utils.genId)();
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

    this.onChange = function () {};

    this.onRemove = function () {};

    var _iterator = _createForOfIteratorHelper(items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        this.addItem(i);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

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


  _createClass(CheckList, [{
    key: "addItem",
    value: function addItem(_ref2) {
      var _this = this;

      var value = _ref2.value,
          _ref2$checked = _ref2.checked,
          checked = _ref2$checked === void 0 ? false : _ref2$checked;
      var type = this.multiple ? "checkbox" : "radio";
      var key = "item_" + (0, _utils.genId)();
      var newItem = {
        key: key,
        value: value,

        get checked() {
          return !!this.$input.checked;
        },

        set checked(v) {
          this.$input.checked = v;
        },

        $input: null,
        textField: null,
        $element: (0, _utils.createElementFrom)("\n        <div>\n          <label\n            for=\"".concat(key, "\"\n            class=\"checklist-item ").concat(this.editable ? "editable" : "", "\">\n\n              <input\n                ").concat(checked ? "checked" : "", "\n                type=\"").concat(type, "\"\n                name=\"").concat(this.name, "\"\n                id=\"").concat(key, "\"\n              />\n\n              <div class=\"").concat(type, "__mark\"></div>\n              <div class=\"checklist-item__value\">").concat(value, "</div>\n              ").concat(this.editable ? "<span class=\"spacex-1\"></span>\n                    <button type=\"button\" class=\"checklist-item__remove cross-btn secondary small\"></button>" : "", "\n\n          </label>\n        </div>\n    "))
      };
      newItem.$input = newItem.$element.querySelector("input");
      newItem.checked = checked;
      newItem.$input.addEventListener("change", function () {
        _this.onChange(_objectSpread({}, newItem));
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

        newItem.textField.onInput = function () {
          newItem.value = newItem.textField.value;

          _this.onChange(_objectSpread({}, newItem));
        };

        newItem.$element.querySelector(".checklist-item__remove").addEventListener("click", function () {
          _this.removeItem(newItem);
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

  }, {
    key: "removeItem",
    value: function removeItem(_ref3) {
      var _ref3$key = _ref3.key,
          key = _ref3$key === void 0 ? null : _ref3$key,
          _ref3$value = _ref3.value,
          value = _ref3$value === void 0 ? null : _ref3$value,
          _ref3$$element = _ref3.$element,
          $element = _ref3$$element === void 0 ? null : _ref3$$element;
      var removed = null;
      this.items.splice(this.items.findIndex(function (item) {
        if (item.key == key || item.value == value || item.$element == $element) {
          removed = item;
          item.$element.remove();
          return true;
        }
      }), 1);
      if (removed) this.onRemove(_objectSpread({}, removed));
    }
  }, {
    key: "reportValidity",
    value: function reportValidity() {
      var valid = this.items.every(function (i) {
        return i.textField.reportValidity();
      });

      if (valid) {
        valid = this.items.findIndex(function (i) {
          return i.$input.checked;
        }) != -1;

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
  }]);

  return CheckList;
}();

exports.CheckList = CheckList;
},{"./text-field":"components/text-field.js","./utils":"components/utils.js"}],"components/complete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseText = parseText;
exports.unParseText = unParseText;
exports.Complete = void 0;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Complete = /*#__PURE__*/function () {
  /**
   * @param {HTMLElement} $target
   * @param {{
   *  text: string,
   *  values: {[key: string]: string},
   *  disabled: boolean
   * }} param1
   */
  function Complete($target, _ref) {
    var _ref$text = _ref.text,
        text = _ref$text === void 0 ? "" : _ref$text,
        _ref$values = _ref.values,
        values = _ref$values === void 0 ? {} : _ref$values,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === void 0 ? false : _ref$disabled;

    _classCallCheck(this, Complete);

    this.$element = document.createElement("div");

    this.onInput = function () {};

    this._disabled = disabled;
    this.setText({
      text: text,
      values: values
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


  _createClass(Complete, [{
    key: "setText",
    value: function setText(_ref2) {
      var _this = this;

      var text = _ref2.text,
          values = _ref2.values;
      this.$element.innerHTML = "";
      this.text = text;
      this.values = _objectSpread({}, values);
      this.$content = (0, _utils.createElementFrom)(text);

      if (this.$content) {
        this.$content.querySelectorAll("c").forEach(function (c) {
          var w = c.getAttribute("width");
          var id = c.getAttribute("id");
          var $span = document.createElement("span");
          var $inp = (0, _utils.createElementFrom)("<input data-id=\"".concat(id, "\" class=\"inline-text-field\" type=\"text\" maxlength=\"").concat(w, "\" ").concat(_this._disabled ? "disabled" : "", " />"));
          $span.style.visibility = "hidden";
          $span.style.position = "absolute";
          $span.innerText = "m".repeat(w);
          $span.style.fontSize = $inp.style.fontSize = "1rem";
          $span.style.fontFamily = $inp.style.fontFamily = "monospace";
          document.body.appendChild($span);
          $inp.style.width = $span.clientWidth + "px";
          $inp.value = values[id] || "";
          $inp.addEventListener("input", function () {
            _this.values[id] = $inp.value;

            _this.onInput({
              id: id,
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
  }]);

  return Complete;
}();
/**
 *
 * @param {string} text
 */


exports.Complete = Complete;

function parseText(text) {
  var $pre = document.createElement("pre");
  var currentId = 1;
  var values = {};
  var toComplete = "";
  var mode = false;

  function put() {
    if (toComplete) {
      $pre.append((0, _utils.createElementFrom)("<span><c id=\"".concat(currentId, "\" width=\"").concat(toComplete.length, "\" /></span>")));
      values[currentId] = toComplete;
      currentId++;
      toComplete = "";
    }

    mode = false;
  }

  for (var i = 0; i < text.length; i++) {
    if (text[i] == "\\") {
      if (i == text.length - 1) continue;
      i++;
      if (text[i] == "\n") continue;
      if (mode) toComplete += text[i];else $pre.append(document.createTextNode(text[i]));
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
    values: values
  };
}

function unParseText(_ref3) {
  var parsedText = _ref3.parsedText,
      values = _ref3.values;

  var replace = function replace(s) {
    return s.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
  };

  var $pre = (0, _utils.createElementFrom)(replace(parsedText));
  $pre.querySelectorAll("c").forEach(function (c) {
    var id = c.getAttribute("id");
    c.replaceWith(document.createTextNode("[".concat(replace(values[id] || ""), "]")));
  });
  return $pre.innerText;
}
},{"./utils":"components/utils.js"}],"components/match.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Match = void 0;

var _textField = require("./text-field");

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Match = /*#__PURE__*/function () {
  /**
   * @param {HTMLElement} $target
   * @param {{
   *  left: string[],
   *  right: string[],
   *  connections: number[][],
   *  editable: boolean
   * }} param1
   */
  function Match($target, _ref) {
    var _ref$left = _ref.left,
        left = _ref$left === void 0 ? [] : _ref$left,
        _ref$right = _ref.right,
        right = _ref$right === void 0 ? [] : _ref$right,
        _ref$connections = _ref.connections,
        connections = _ref$connections === void 0 ? [] : _ref$connections,
        _ref$editable = _ref.editable,
        editable = _ref$editable === void 0 ? false : _ref$editable;

    _classCallCheck(this, Match);

    this._canvasWidth = 100;
    this.$element = (0, _utils.createElementFrom)("\n      <div class=\"match\">\n        <div class=\"match__side match__side--left\"></div>\n        <canvas class=\"match__middle\" width=\"".concat(this._canvasWidth, "\" height=\"0\"></canvas>\n        <div class=\"match__side match__side--right\"></div>\n      </div>\n    "));
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

    var _iterator = _createForOfIteratorHelper(left),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        this.addLeft(item);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = _createForOfIteratorHelper(right),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _item = _step2.value;
        this.addRight(_item);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this.connections = connections.map(function (c) {
      return _toConsumableArray(c);
    });

    this.onNewConnection = function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          _ = _ref3[0],
          __ = _ref3[1];
    };

    this.onRemoveConnection = function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          _ = _ref5[0],
          __ = _ref5[1];
    };

    this.onRemove = function (_ref6) {
      var sideName = _ref6.sideName,
          item = _ref6.item;
    };

    this.onChange = function (_ref7) {
      var sideName = _ref7.sideName,
          item = _ref7.item;
    };
  }

  _createClass(Match, [{
    key: "_drawConnections",
    value: function _drawConnections() {
      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

      var _iterator3 = _createForOfIteratorHelper(this._connections),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var c = _step3.value;

          if (!this.left[c[0]] || !this.right[c[1]]) {
            continue;
          }

          var $lel = this.left[c[0]].$btn;
          var $rel = this.right[c[1]].$btn;
          var lbr = $lel.getBoundingClientRect();
          var rbr = $rel.getBoundingClientRect();
          var top = this.$middle.getBoundingClientRect().top;
          var y1 = lbr.top + lbr.height / 2 - top;
          var y2 = rbr.top + rbr.height / 2 - top;
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
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "connections",
    get: function get() {
      return this._connections;
    }
    /**
     *
     * @param {number[]} c
     * @returns
     */
    ,
    set: function set(v) {
      this._connections = v;

      this._drawConnections();
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      this._removeConnectionHelper(connection);

      this._connections.push(_toConsumableArray(connection));

      this.connections = this._connections;
      this.onNewConnection(_toConsumableArray(connection));
    }
    /**
     *
     * @param {Array<number?>} connection
     */

  }, {
    key: "removeConnection",
    value: function removeConnection(connection) {
      var rc = this._removeConnectionHelper(connection);

      this.connections = this._connections;
      this.onRemoveConnection(rc);
    }
  }, {
    key: "_removeConnectionHelper",
    value: function _removeConnectionHelper(connection) {
      var _this = this;

      var ret = [];
      this._connections = this._connections.filter(function (c) {
        if (c[0] == connection[0] || c[1] == connection[1]) {
          ret = _toConsumableArray(c);

          _this.left[c[0]].$btn.classList.remove("match-button--active");

          _this.right[c[1]].$btn.classList.remove("match-button--active");

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

  }, {
    key: "addLeft",
    value: function addLeft(value) {
      return this._addToSide(value, "left");
    }
    /**
     *
     * @param {string} value
     * @returns {_Item}
     */

  }, {
    key: "addRight",
    value: function addRight(value) {
      return this._addToSide(value, "right");
    }
  }, {
    key: "removeLeft",
    value: function removeLeft(idx) {
      var removed = this._removeSide(idx, "left");

      this.onRemove({
        sideName: "left",
        removed: removed
      });
      return removed;
    }
  }, {
    key: "removeRight",
    value: function removeRight(idx) {
      var removed = this._removeSide(idx, "right");

      this.onRemove({
        sideName: "right",
        removed: removed
      });
      return removed;
    }
  }, {
    key: "_removeSide",
    value: function _removeSide(idx, sideName) {
      var sideItems = this[sideName];
      var ci = sideName == "left" ? 0 : 1;
      this.removeConnection(sideName == "left" ? [idx, null] : [null, idx]);

      var _iterator4 = _createForOfIteratorHelper(this._connections),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var c = _step4.value;
          if (c[ci] > idx) c[ci]--;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (this._selected[ci] == idx) {
        this._selected[ci] = null;
      }

      var removed = sideItems.splice(idx, 1)[0];
      removed.$element.remove();

      for (var i = idx; i < sideItems.length; i++) {
        sideItems[i].key--;
      }

      this._adjustHeight();

      return removed;
    }
  }, {
    key: "_addToSide",
    value: function _addToSide(value, sideName) {
      var _this2 = this;

      var $side = this["$" + sideName];
      var sideItems = this[sideName];

      var _ref8 = sideName == "left" ? [0, 1] : [1, 0],
          _ref9 = _slicedToArray(_ref8, 2),
          ci1 = _ref9[0],
          ci2 = _ref9[1];

      var newItem = {
        key: sideItems.length,
        value: value,
        $element: (0, _utils.createElementFrom)("\n        <div class=\"match-button__wrapper match-button__wrapper--".concat(sideName, "\">\n          <button class=\"match-button match-button--").concat(sideName, "\">\n            <div class=\"match-button__value\">").concat(value, "</div>\n          </button>\n          ").concat(this.editable ? "<button type=\"button\" class=\"match-button__remove cross-btn secondary x-small\"></button>" : "", "\n        </div>\n      ")),
        $btn: null
      };
      newItem.$btn = newItem.$element.querySelector(".match-button");
      $side.appendChild(newItem.$element);

      if (this.editable) {
        newItem.textField = new _textField.ULTextField(newItem.$btn.querySelector(".match-button__value"), {
          multiline: true,
          disableEnter: true,
          value: value,
          placeholder: sideName.charAt(0).toUpperCase() + sideName.slice(1),
          required: true
        });

        newItem.textField.onInput = function () {
          newItem.value = newItem.textField.value;

          _this2._adjustHeight();

          _this2.onChange({
            sideName: sideName,
            item: newItem
          });
        };

        newItem.$element.querySelector(".match-button__remove").addEventListener("click", function () {
          var r = _this2._removeSide(newItem.key, sideName);

          _this2.onRemove({
            item: r,
            sideName: sideName
          });
        });
      }

      newItem.$btn.addEventListener("focus", function (e) {
        _this2._selected[ci1] = newItem.key;

        _this2.removeConnection(sideName == "left" ? [newItem.key, null] : [null, newItem.key]);

        if (_this2._selected[ci2] != null) {
          _this2.addConnection([_this2._selected[0], _this2._selected[1]]);

          _this2._selected = [null, null];
        }
      });
      newItem.$btn.addEventListener("blur", function () {
        setTimeout(function () {
          if (_this2._selected[ci1] == newItem.key) _this2._selected[ci1] = null;
        }, 10);
      });

      this._adjustHeight();

      sideItems.push(newItem);
      return newItem;
    }
  }, {
    key: "_adjustHeight",
    value: function _adjustHeight() {
      this.$middle.height = 0;
      this.$middle.height = this.$element.clientHeight;

      this._drawConnections();
    }
  }, {
    key: "reportValidity",
    value: function reportValidity() {
      if (this.editable) {
        var valid = this.left.every(function (i) {
          return i.textField.reportValidity();
        }) && this.right.every(function (i) {
          return i.textField.reportValidity();
        });

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
  }]);

  return Match;
}();

exports.Match = Match;
},{"./text-field":"components/text-field.js","./utils":"components/utils.js"}],"components/progress.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Progress = /*#__PURE__*/function () {
  /**
   * 
   * @param {HTMLElement} $target 
   * @param {{value: number, total: number}} param1 
   */
  function Progress($target, _ref) {
    var value = _ref.value,
        total = _ref.total;

    _classCallCheck(this, Progress);

    this._value = value;
    this._total = total;
    this.$element = (0, _utils.createElementFrom)("\n    <div class=\"progress\">\n      <div class=\"progress__text\">\n      </div>\n      <div class=\"progress__bar\">\n      </div>\n    </div>\n  ");

    this._updateProgress();

    $target.replaceWith(this.$element);
  }

  _createClass(Progress, [{
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(v) {
      this._value = v;

      this._updateProgress();
    }
  }, {
    key: "total",
    get: function get() {
      return this._total;
    },
    set: function set(v) {
      this._total = v;

      this._updateProgress();
    }
  }, {
    key: "_updateProgress",
    value: function _updateProgress() {
      var $ptext = this.$element.querySelector(".progress__text");
      var $pbar = this.$element.querySelector(".progress__bar");
      $ptext.innerText = "".concat(this.value, " of ").concat(this.total);
      $pbar.innerHTML = "";

      for (var i = 1; i <= this.value; i++) {
        $pbar.append((0, _utils.createElementFrom)("<div class=\"progress__bit progress__bit--done\"></div>"), (0, _utils.createElementFrom)("<div class=\"spacex-1px\"></div>"));
      }

      for (var _i = this.value + 1; _i < this.total; _i++) {
        $pbar.append((0, _utils.createElementFrom)("<div class=\"progress__bit\"></div>"), (0, _utils.createElementFrom)("<div class=\"spacex-1px\"></div>"));
      }

      if (this.value < this.total) {
        $pbar.append((0, _utils.createElementFrom)("<div class=\"progress__bit\"></div>"));
      }
    }
  }]);

  return Progress;
}();

exports.Progress = Progress;
},{"./utils":"components/utils.js"}],"components/quiz-section.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuizSection = void 0;

var _checkList = require("./check-list");

var _complete = require("./complete");

var _match = require("./match");

var _progress = require("./progress");

var _textField = require("./text-field");

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuizSection = /*#__PURE__*/function () {
  /**
   *
   * @param {HTMLElement} $target
   * @param {{progress: {value: number, total: number}}} param1
   */
  function QuizSection($target, _ref) {
    var _this = this;

    var quest = _ref.quest,
        progress = _ref.progress,
        onNext = _ref.onNext,
        onPrev = _ref.onPrev,
        onFinish = _ref.onFinish;

    _classCallCheck(this, QuizSection);

    this.$element = (0, _utils.createElementFrom)("\n      <div class=\"quiz-section\">\n        <div class=\"paper-4 quiz-section__wrapper\">\n          <div class=\"title primary\">\n            ".concat(quest.title, "\n          </div>\n          <div class=\"spacey-2\"></div>\n          <div class=\"subtitle\">\n            ").concat(quest.question, "\n          </div>\n          <div class=\"spacey-1\"></div>\n          <div class=\"quiz-section__content\"></div>\n          <div class=\"spacey-2\"></div>\n          <div class=\"space-between\">\n            <div class=\"progress\"></div>\n            <div class=\"quiz-section__buttons\"></div>\n          </div>\n        </div>\n      </div>\n    "));
    $target.replaceWith(this.$element);
    this.$quizSectionWrap = this.$element.querySelector(".quiz-section__wrapper");
    this.$buttonsContainer = this.$element.querySelector(".quiz-section__buttons");
    this.updateProgress(progress.value, progress.total);

    this.onNext = onNext || function () {};

    this.onPrev = onPrev || function () {};

    this.onFinish = onFinish || function () {};

    this.$content = this.$element.querySelector(".quiz-section__content");
    var typeHandlers = {
      question: function question() {
        var $placeholder = document.createElement("div");

        _this.$content.appendChild($placeholder);

        var input = new _textField.OLTextField($placeholder, {
          value: quest.answer || "",
          label: "Your answer"
        });

        input.onInput = function () {
          quest.answer = input.value;
        };
      },
      choose: function choose(multiple) {
        var $form = document.createElement("form");

        $form.onsubmit = function (e) {
          return e.preventDefault();
        };

        var $placeholder = document.createElement("div");

        _this.$content.appendChild($form);

        $form.appendChild($placeholder);
        if (!quest.answers) quest.answers = [];
        var checklist = new _checkList.CheckList($placeholder, {
          multiple: multiple,
          items: quest.options.map(function (o, i) {
            return {
              value: o,
              checked: quest.answers.includes(i + 1)
            };
          })
        });

        checklist.onChange = function () {
          quest.answers = [];
          checklist.items.forEach(function (i, idx) {
            if (i.checked) quest.answers.push(idx + 1);
          });
        };
      },
      "choose one": function chooseOne() {
        this.choose(false);
      },
      "choose multiple": function chooseMultiple() {
        this.choose(true);
      },
      complete: function complete() {
        if (!quest.answers) quest.answers = {};
        var $placeholder = document.createElement("div");

        _this.$content.append($placeholder);

        var complete = new _complete.Complete($placeholder, {
          values: quest.answers,
          text: quest.text
        });

        complete.onInput = function (_ref2) {
          var id = _ref2.id,
              value = _ref2.value;
          quest.answers[id] = value;
        };
      },
      match: function match() {
        if (!quest.answers) quest.answers = [];
        var $placeholder = document.createElement("div");

        _this.$content.appendChild($placeholder);

        var match = new _match.Match($placeholder, {
          left: quest.left,
          right: quest.right,
          connections: quest.answers.map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                l = _ref4[0],
                r = _ref4[1];

            return [l - 1, r - 1];
          })
        });

        match.onChange = match.onRemove = match.onNewConnection = match.onRemoveConnection = function () {
          quest.left = match.left.map(function (i) {
            return i.value;
          });
          quest.right = match.right.map(function (i) {
            return i.value;
          });
          quest.answers = match.connections.map(function (c) {
            return [c[0] + 1, c[1] + 1];
          });
        };
      }
    };
    typeHandlers[quest.type] && typeHandlers[quest.type]();
  }

  _createClass(QuizSection, [{
    key: "updateProgress",
    value: function updateProgress(value, total) {
      var _this2 = this;

      this.progress = new _progress.Progress(this.$element.querySelector(".progress"), {
        value: value,
        total: total
      });
      this.$buttonsContainer.innerHTML = "";
      var $prev;
      var $next;
      var $finish;

      if (value > 1) {
        this.$buttonsContainer.append($prev = (0, _utils.createElementFrom)("<button class=\"text-button secondary\">prev</button>"), (0, _utils.createElementFrom)("<span class=\"spacex-1\"></span>"));
      }

      if (value < total) {
        this.$buttonsContainer.appendChild($next = (0, _utils.createElementFrom)("<button class=\"filled-button primary\">next</button>"));
      }

      if (value == total) {
        this.$buttonsContainer.appendChild($finish = (0, _utils.createElementFrom)("<button class=\"filled-button success\">finish</button>"));
      }

      if ($prev) $prev.addEventListener("click", function () {
        return _this2.onPrev();
      });
      if ($next) $next.addEventListener("click", function () {
        return _this2.onNext();
      });
      if ($finish) $finish.addEventListener("click", function () {
        return _this2.onFinish();
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      this.$element.remove();
    }
  }]);

  return QuizSection;
}();

exports.QuizSection = QuizSection;
},{"./check-list":"components/check-list.js","./complete":"components/complete.js","./match":"components/match.js","./progress":"components/progress.js","./text-field":"components/text-field.js","./utils":"components/utils.js"}],"quiz.js":[function(require,module,exports) {
"use strict";

var _quizSection = require("./components/quiz-section");

var _utils = require("./components/utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var quiz = {
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
    text: "<pre>function <span><c id=\"1\" width=\"5\" /></span>() {\n  console.<span><c id=\"2\" width=\"3\"/></span>(<span><c id=\"3\" width=\"13\"/></span>);\n}</pre>",
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

var _iterator = _createForOfIteratorHelper(quiz.quests),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var q = _step.value;
    q.answer = null;
    q.answers = null;
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

function main() {
  var $quiz = document.querySelector("#quiz");

  function makeQuest(idx) {
    var $placeholder = document.createElement("div");
    $quiz.innerHTML = "";
    $quiz.appendChild($placeholder);
    var ret = {
      quizSection: new _quizSection.QuizSection($placeholder, {
        progress: {
          value: idx + 1,
          total: quiz.quests.length
        },
        quest: quiz.quests[idx],
        onPrev: function onPrev() {
          if (current.questIdx > 0) {
            current = makeQuest(current.questIdx - 1);
          }
        },
        onNext: function onNext() {
          if (current.questIdx < quiz.quests.length - 1) {
            current = makeQuest(current.questIdx + 1);
          }
        }
      }),
      questIdx: idx
    };
    return ret;
  }

  var current = makeQuest(0);
}

main();
},{"./components/quiz-section":"components/quiz-section.js","./components/utils":"components/utils.js"}],"C:/Users/nordd/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56218" + '/');

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
},{}]},{},["C:/Users/nordd/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","quiz.js"], null)
//# sourceMappingURL=/quiz.a58f7c4d.js.map