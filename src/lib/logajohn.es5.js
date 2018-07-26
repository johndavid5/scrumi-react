"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logajohn = exports.dateTimeStamp = undefined;

var _logatim = require("logatim");

var _logatim2 = _interopRequireDefault(_logatim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ES6

var dateTimeStamp = exports.dateTimeStamp = function dateTimeStamp() {
    var le_date = new Date();
    return le_date.getFullYear() + "-" + lpad(le_date.getMonth() + 1, "0", 2) + "-" + lpad(le_date.getDate(), "0", 2) + " " + lpad(le_date.getHours(), "0", 2) + ":" + lpad(le_date.getMinutes(), "0", 2) + ":" + lpad(le_date.getSeconds(), "0", 2);
    //return "" + le_date.year();
    //return le_date.getFullYear()
}; /** Convenience methods based on logatim... */
// const logatim = require('logatim') // ES5


var lpad = function lpad(s_input, pad_string, length) {
    var s_output = "" + s_input;
    while (s_output.length < length) {
        s_output = pad_string + s_output;
    }return s_output;
};

//console.log = function(...args){ logatim.white.info(`[${dateTimeStamp()}-INFO]`,...args) }

var trace = void 0;
var debug = void 0;
var info = void 0;
var warn = void 0;
var error = void 0;

if (typeof window !== 'undefined') {
    trace = function trace() {
        var _logatim$black;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (_logatim$black = _logatim2.default.black).trace.apply(_logatim$black, ["[" + dateTimeStamp() + "][TRACE]"].concat(args));
    };

    debug = function debug() {
        var _logatim$black2;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        (_logatim$black2 = _logatim2.default.black).debug.apply(_logatim$black2, ["[" + dateTimeStamp() + "][DEBUG]"].concat(args));
    };

    info = function info() {
        var _logatim$black3;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        (_logatim$black3 = _logatim2.default.black).info.apply(_logatim$black3, ["[" + dateTimeStamp() + "][INFO]"].concat(args));
    };

    warn = function warn() {
        var _logatim$red;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        (_logatim$red = _logatim2.default.red).warn.apply(_logatim$red, ["[" + dateTimeStamp() + "][WARN]"].concat(args));
    };

    error = function error() {
        var _logatim$red2;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        (_logatim$red2 = _logatim2.default.red).error.apply(_logatim$red2, ["[" + dateTimeStamp() + "][ERROR]"].concat(args));
    };
} else {
    trace = function trace() {
        var _logatim$cyan;

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        (_logatim$cyan = _logatim2.default.cyan).trace.apply(_logatim$cyan, ["[" + dateTimeStamp() + "][TRACE]"].concat(args));
    };

    debug = function debug() {
        var _logatim$magenta;

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        (_logatim$magenta = _logatim2.default.magenta).debug.apply(_logatim$magenta, ["[" + dateTimeStamp() + "][DEBUG]"].concat(args));
    };

    info = function info() {
        var _logatim$green;

        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        (_logatim$green = _logatim2.default.green).info.apply(_logatim$green, ["[" + dateTimeStamp() + "][INFO]"].concat(args));
    };

    warn = function warn() {
        var _logatim$yellow;

        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
        }

        (_logatim$yellow = _logatim2.default.yellow).warn.apply(_logatim$yellow, ["[" + dateTimeStamp() + "][WARN]"].concat(args));
    };

    error = function error() {
        var _logatim$red3;

        for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
        }

        (_logatim$red3 = _logatim2.default.red).error.apply(_logatim$red3, ["[" + dateTimeStamp() + "][ERROR]"].concat(args));
    };
}

var setLevel = function setLevel(level) {
    var prevLevel = _logatim2.default.getLevel();_logatim2.default.setLevel(level);return prevLevel;
};

var getLevel = function getLevel() {
    return _logatim2.default.getLevel();
};

console.log = info;

var logajohn = exports.logajohn = { trace: trace, debug: debug, info: info, warn: warn, error: error, setLevel: setLevel, getLevel: getLevel };

