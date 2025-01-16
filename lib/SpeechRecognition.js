"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSpeechRecognition = exports["default"] = void 0;
var _react = require("react");
var _utils = require("./utils");
var _actions = require("./actions");
var _reducers = require("./reducers");
var _RecognitionManager = _interopRequireDefault(require("./RecognitionManager"));
var _isAndroid = _interopRequireDefault(require("./isAndroid"));
var _NativeSpeechRecognition = _interopRequireDefault(require("./NativeSpeechRecognition"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _browserSupportsSpeechRecognition = !!_NativeSpeechRecognition["default"];
var _browserSupportsContinuousListening = _browserSupportsSpeechRecognition && !(0, _isAndroid["default"])();
var recognitionManager;
var useSpeechRecognition = exports.useSpeechRecognition = function useSpeechRecognition() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$transcribing = _ref.transcribing,
    transcribing = _ref$transcribing === void 0 ? true : _ref$transcribing,
    _ref$clearTranscriptO = _ref.clearTranscriptOnListen,
    clearTranscriptOnListen = _ref$clearTranscriptO === void 0 ? true : _ref$clearTranscriptO,
    _ref$commands = _ref.commands,
    commands = _ref$commands === void 0 ? [] : _ref$commands,
    onAudioEnd = _ref.onAudioEnd,
    onAudioStart = _ref.onAudioStart,
    onError = _ref.onError,
    slackToken = _ref.slackToken;
  var _useState = (0, _react.useState)(SpeechRecognition.getRecognitionManager({
      onAudioEnd: onAudioEnd,
      onAudioStart: onAudioStart,
      onError: onError,
      slackToken: slackToken
    })),
    _useState2 = _slicedToArray(_useState, 1),
    recognitionManager = _useState2[0];
  var _useState3 = (0, _react.useState)(_browserSupportsSpeechRecognition),
    _useState4 = _slicedToArray(_useState3, 2),
    browserSupportsSpeechRecognition = _useState4[0],
    setBrowserSupportsSpeechRecognition = _useState4[1];
  var _useState5 = (0, _react.useState)(_browserSupportsContinuousListening),
    _useState6 = _slicedToArray(_useState5, 2),
    browserSupportsContinuousListening = _useState6[0],
    setBrowserSupportsContinuousListening = _useState6[1];
  var _useReducer = (0, _react.useReducer)(_reducers.transcriptReducer, {
      interimTranscript: recognitionManager.interimTranscript,
      finalTranscript: ''
    }),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    interimTranscript = _useReducer2$.interimTranscript,
    finalTranscript = _useReducer2$.finalTranscript,
    dispatch = _useReducer2[1];
  var _useState7 = (0, _react.useState)(recognitionManager.listening),
    _useState8 = _slicedToArray(_useState7, 2),
    listening = _useState8[0],
    setListening = _useState8[1];
  var _useState9 = (0, _react.useState)(recognitionManager.isMicrophoneAvailable),
    _useState10 = _slicedToArray(_useState9, 2),
    isMicrophoneAvailable = _useState10[0],
    setMicrophoneAvailable = _useState10[1];
  var commandsRef = (0, _react.useRef)(commands);
  commandsRef.current = commands;
  var dispatchClearTranscript = function dispatchClearTranscript() {
    dispatch((0, _actions.clearTranscript)());
  };
  var resetTranscript = (0, _react.useCallback)(function () {
    recognitionManager.resetTranscript();
    dispatchClearTranscript();
  }, [recognitionManager]);
  var testFuzzyMatch = function testFuzzyMatch(command, input, fuzzyMatchingThreshold) {
    var commandToString = _typeof(command) === 'object' ? command.toString() : command;
    var commandWithoutSpecials = commandToString.replace(/[&/\\#,+()!$~%.'":*?<>{}]/g, '').replace(/  +/g, ' ').trim();
    var howSimilar = (0, _utils.compareTwoStringsUsingDiceCoefficient)(commandWithoutSpecials, input);
    if (howSimilar >= fuzzyMatchingThreshold) {
      return {
        command: command,
        commandWithoutSpecials: commandWithoutSpecials,
        howSimilar: howSimilar,
        isFuzzyMatch: true
      };
    }
    return null;
  };
  var testMatch = function testMatch(command, input) {
    var pattern = (0, _utils.commandToRegExp)(command);
    var result = pattern.exec(input);
    if (result) {
      return {
        command: command,
        parameters: result.slice(1)
      };
    }
    return null;
  };
  var matchCommands = (0, _react.useCallback)(function (newInterimTranscript, newFinalTranscript) {
    commandsRef.current.forEach(function (_ref2) {
      var command = _ref2.command,
        callback = _ref2.callback,
        _ref2$matchInterim = _ref2.matchInterim,
        matchInterim = _ref2$matchInterim === void 0 ? false : _ref2$matchInterim,
        _ref2$isFuzzyMatch = _ref2.isFuzzyMatch,
        isFuzzyMatch = _ref2$isFuzzyMatch === void 0 ? false : _ref2$isFuzzyMatch,
        _ref2$fuzzyMatchingTh = _ref2.fuzzyMatchingThreshold,
        fuzzyMatchingThreshold = _ref2$fuzzyMatchingTh === void 0 ? 0.8 : _ref2$fuzzyMatchingTh,
        _ref2$bestMatchOnly = _ref2.bestMatchOnly,
        bestMatchOnly = _ref2$bestMatchOnly === void 0 ? false : _ref2$bestMatchOnly;
      var input = !newFinalTranscript && matchInterim ? newInterimTranscript.trim() : newFinalTranscript.trim();
      var subcommands = Array.isArray(command) ? command : [command];
      var results = subcommands.map(function (subcommand) {
        if (isFuzzyMatch) {
          return testFuzzyMatch(subcommand, input, fuzzyMatchingThreshold);
        }
        return testMatch(subcommand, input);
      }).filter(function (x) {
        return x;
      });
      if (isFuzzyMatch && bestMatchOnly && results.length >= 2) {
        results.sort(function (a, b) {
          return b.howSimilar - a.howSimilar;
        });
        var _results$ = results[0],
          _command = _results$.command,
          commandWithoutSpecials = _results$.commandWithoutSpecials,
          howSimilar = _results$.howSimilar;
        callback(commandWithoutSpecials, input, howSimilar, {
          command: _command,
          resetTranscript: resetTranscript
        });
      } else {
        results.forEach(function (result) {
          if (result.isFuzzyMatch) {
            var _command2 = result.command,
              _commandWithoutSpecials = result.commandWithoutSpecials,
              _howSimilar = result.howSimilar;
            callback(_commandWithoutSpecials, input, _howSimilar, {
              command: _command2,
              resetTranscript: resetTranscript
            });
          } else {
            var _command3 = result.command,
              parameters = result.parameters;
            callback.apply(void 0, _toConsumableArray(parameters).concat([{
              command: _command3,
              resetTranscript: resetTranscript
            }]));
          }
        });
      }
    });
  }, [resetTranscript]);
  var handleTranscriptChange = (0, _react.useCallback)(function (newInterimTranscript, newFinalTranscript) {
    if (transcribing) {
      dispatch((0, _actions.appendTranscript)(newInterimTranscript, newFinalTranscript));
    }
    matchCommands(newInterimTranscript, newFinalTranscript);
  }, [matchCommands, transcribing]);
  var handleClearTranscript = (0, _react.useCallback)(function () {
    if (clearTranscriptOnListen) {
      dispatchClearTranscript();
    }
  }, [clearTranscriptOnListen]);
  var handleMicrophoneAvailabilityChange = (0, _react.useCallback)(function (isMicrophoneAvailable) {
    setMicrophoneAvailable(isMicrophoneAvailable);
  }, []);
  var handleListeningChange = (0, _react.useCallback)(function (listening) {
    setListening(listening);
  }, []);
  (0, _react.useEffect)(function () {
    var id = SpeechRecognition.counter;
    SpeechRecognition.counter += 1;
    var callbacks = {
      onListeningChange: setListening,
      onMicrophoneAvailabilityChange: setMicrophoneAvailable,
      onTranscriptChange: handleTranscriptChange,
      onClearTranscript: handleClearTranscript,
      onBrowserSupportsSpeechRecognitionChange: setBrowserSupportsSpeechRecognition,
      onBrowserSupportsContinuousListeningChange: setBrowserSupportsContinuousListening
    };
    recognitionManager.subscribe(id, callbacks);
    return function () {
      recognitionManager.unsubscribe(id);
    };
  }, [transcribing, clearTranscriptOnListen, recognitionManager, handleTranscriptChange, handleClearTranscript]);
  var transcript = (0, _utils.concatTranscripts)(finalTranscript, interimTranscript);
  return {
    transcript: transcript,
    interimTranscript: interimTranscript,
    finalTranscript: finalTranscript,
    listening: listening,
    isMicrophoneAvailable: isMicrophoneAvailable,
    resetTranscript: resetTranscript,
    browserSupportsSpeechRecognition: browserSupportsSpeechRecognition,
    browserSupportsContinuousListening: browserSupportsContinuousListening,
    handleMicrophoneAvailabilityChange: handleMicrophoneAvailabilityChange,
    handleListeningChange: handleListeningChange
  };
};
var SpeechRecognition = {
  counter: 0,
  applyPolyfill: function applyPolyfill(PolyfillSpeechRecognition) {
    if (recognitionManager) {
      recognitionManager.setSpeechRecognition(PolyfillSpeechRecognition);
    } else {
      recognitionManager = new _RecognitionManager["default"](PolyfillSpeechRecognition);
    }
    var browserSupportsPolyfill = !!PolyfillSpeechRecognition && (0, _utils.browserSupportsPolyfills)();
    _browserSupportsSpeechRecognition = browserSupportsPolyfill;
    _browserSupportsContinuousListening = browserSupportsPolyfill;
  },
  removePolyfill: function removePolyfill() {
    if (recognitionManager) {
      recognitionManager.setSpeechRecognition(_NativeSpeechRecognition["default"]);
    } else {
      recognitionManager = new _RecognitionManager["default"](_NativeSpeechRecognition["default"]);
    }
    _browserSupportsSpeechRecognition = !!_NativeSpeechRecognition["default"];
    _browserSupportsContinuousListening = _browserSupportsSpeechRecognition && !(0, _isAndroid["default"])();
  },
  getRecognitionManager: function getRecognitionManager(_ref3) {
    var onAudioEnd = _ref3.onAudioEnd,
      onAudioStart = _ref3.onAudioStart,
      onError = _ref3.onError,
      slackToken = _ref3.slackToken;
    if (!recognitionManager) {
      recognitionManager = new _RecognitionManager["default"](_NativeSpeechRecognition["default"], {
        onAudioEnd: onAudioEnd,
        onAudioStart: onAudioStart,
        onError: onError,
        slackToken: slackToken
      });
    }
    return recognitionManager;
  },
  getRecognition: function getRecognition() {
    var recognitionManager = SpeechRecognition.getRecognitionManager();
    return recognitionManager.getRecognition();
  },
  startListening: function () {
    var _startListening = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _ref4,
        continuous,
        language,
        onAudioStart,
        onStartException,
        recognitionManager,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, continuous = _ref4.continuous, language = _ref4.language, onAudioStart = _ref4.onAudioStart, onStartException = _ref4.onStartException;
            recognitionManager = SpeechRecognition.getRecognitionManager({
              onAudioStart: onAudioStart
            });
            _context.next = 4;
            return recognitionManager.startListening({
              continuous: continuous,
              language: language,
              onStartException: onStartException
            });
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function startListening() {
      return _startListening.apply(this, arguments);
    }
    return startListening;
  }(),
  stopListening: function () {
    var _stopListening = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref5) {
      var onAudioEnd, recognitionManager;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            onAudioEnd = _ref5.onAudioEnd;
            recognitionManager = SpeechRecognition.getRecognitionManager({
              onAudioEnd: onAudioEnd
            });
            _context2.next = 4;
            return recognitionManager.stopListening();
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function stopListening(_x) {
      return _stopListening.apply(this, arguments);
    }
    return stopListening;
  }(),
  abortListening: function () {
    var _abortListening = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var recognitionManager;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            recognitionManager = SpeechRecognition.getRecognitionManager();
            _context3.next = 3;
            return recognitionManager.abortListening();
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function abortListening() {
      return _abortListening.apply(this, arguments);
    }
    return abortListening;
  }(),
  browserSupportsSpeechRecognition: function browserSupportsSpeechRecognition() {
    return _browserSupportsSpeechRecognition;
  },
  browserSupportsContinuousListening: function browserSupportsContinuousListening() {
    return _browserSupportsContinuousListening;
  }
};
var _default = exports["default"] = SpeechRecognition;