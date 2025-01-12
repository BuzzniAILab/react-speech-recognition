"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTranscript = exports.appendTranscript = void 0;
var _constants = require("./constants");
var clearTranscript = exports.clearTranscript = function clearTranscript() {
  return {
    type: _constants.CLEAR_TRANSCRIPT
  };
};
var appendTranscript = exports.appendTranscript = function appendTranscript(interimTranscript, finalTranscript) {
  return {
    type: _constants.APPEND_TRANSCRIPT,
    payload: {
      interimTranscript: interimTranscript,
      finalTranscript: finalTranscript
    }
  };
};