"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNative = exports["default"] = void 0;
var NativeSpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition);
var isNative = exports.isNative = function isNative(SpeechRecognition) {
  return SpeechRecognition === NativeSpeechRecognition;
};
var _default = exports["default"] = NativeSpeechRecognition;