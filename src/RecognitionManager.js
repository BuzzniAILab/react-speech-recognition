import isAndroid from './isAndroid'
import { debounce, concatTranscripts, browserSupportsPolyfills, sendSlack } from './utils'
import { isNative } from './NativeSpeechRecognition'

export default class RecognitionManager {
  constructor(SpeechRecognition, { onAudioEnd, onAudioStart, onError, slackToken }) {
    this.recognition = null
    this.pauseAfterDisconnect = false
    this.interimTranscript = ''
    this.finalTranscript = ''
    this.listening = false
    this.isMicrophoneAvailable = true
    this.subscribers = {}
    this.onStopListening = () => {}
    this.previousResultWasFinalOnly = false
    this.slackToken = slackToken
    this.onAudioEnd = onAudioEnd
    this.onAudioStart = onAudioStart
    this.onErrorProps = onError

    this.resetTranscript = this.resetTranscript.bind(this)
    this.startListening = this.startListening.bind(this)
    this.stopListening = this.stopListening.bind(this)
    this.abortListening = this.abortListening.bind(this)
    this.setSpeechRecognition = this.setSpeechRecognition.bind(this)
    this.disableRecognition = this.disableRecognition.bind(this)
    this.startAudioCapturing = this.startAudioCapturing.bind(this, onAudioStart)
    this.endAudioCapturing = this.endAudioCapturing.bind(this)

    this.setSpeechRecognition(SpeechRecognition)

    if (isAndroid()) {
      this.updateFinalTranscript = debounce(this.updateFinalTranscript, 250, true)
    }
  }

  startAudioCapturing() {
    this.onAudioStart?.()
  }

  endAudioCapturing() {
    this.onAudioEnd?.()
  }

  setSpeechRecognition(SpeechRecognition) {
    const browserSupportsRecogniser = !!SpeechRecognition && (
      isNative(SpeechRecognition) || browserSupportsPolyfills()
    )
    if (browserSupportsRecogniser) {
      this.disableRecognition()
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.onresult = this.updateTranscript.bind(this)
      this.recognition.onend = this.onRecognitionDisconnect.bind(this)
      this.recognition.onerror = this.onError.bind(this)
    }
    this.emitBrowserSupportsSpeechRecognitionChange(browserSupportsRecogniser)
  }

  subscribe(id, callbacks) {
    this.subscribers[id] = callbacks
  }

  unsubscribe(id) {
    delete this.subscribers[id]
  }

  emitListeningChange(listening) {
    sendSlack(this.slackToken, `emitListeningChange(${listening})`)
    this.listening = listening
    Object.keys(this.subscribers).forEach((id) => {
      const { onListeningChange } = this.subscribers[id]
      onListeningChange(listening)
    })
  }

  emitMicrophoneAvailabilityChange(isMicrophoneAvailable) {
    sendSlack(this.slackToken, `emitMicrophoneAvailabilityChange(${isMicrophoneAvailable})`)
    this.isMicrophoneAvailable = isMicrophoneAvailable
    Object.keys(this.subscribers).forEach((id) => {
      const { onMicrophoneAvailabilityChange } = this.subscribers[id]
      onMicrophoneAvailabilityChange(isMicrophoneAvailable)
    })
  }

  emitTranscriptChange(interimTranscript, finalTranscript) {
    Object.keys(this.subscribers).forEach((id) => {
      const { onTranscriptChange } = this.subscribers[id]
      onTranscriptChange(interimTranscript, finalTranscript)
    })
  }

  emitClearTranscript() {
    Object.keys(this.subscribers).forEach((id) => {
      const { onClearTranscript } = this.subscribers[id]
      onClearTranscript()
    })
  }

  emitBrowserSupportsSpeechRecognitionChange(browserSupportsSpeechRecognitionChange) {
    Object.keys(this.subscribers).forEach((id) => {
      const { onBrowserSupportsSpeechRecognitionChange, onBrowserSupportsContinuousListeningChange } = this.subscribers[id]
      onBrowserSupportsSpeechRecognitionChange(browserSupportsSpeechRecognitionChange)
      onBrowserSupportsContinuousListeningChange(browserSupportsSpeechRecognitionChange)
    })
  }

  disconnect(disconnectType) {
    sendSlack(this.slackToken, `disconnect(${disconnectType})`)
    if (this.recognition && this.listening) {
      switch (disconnectType) {
        case 'ABORT':
          this.pauseAfterDisconnect = true
          this.abort()
          break
        case 'RESET':
          this.pauseAfterDisconnect = false
          this.abort()
          break
        case 'STOP':
        default:
          this.pauseAfterDisconnect = true
          this.stop()
      }
    }
  }

  disableRecognition() {
    sendSlack(this.slackToken, 'disableRecognition()')
    if (this.recognition) {
      this.recognition.onresult = () => {}
      this.recognition.onend = () => {}
      this.recognition.onerror = () => {}
      if (this.listening) {
        this.stopListening()
      }
    }
  }

  onError(event) {
    sendSlack(this.slackToken, 'onError()::' + event.error)
    if (event && event.error) {
      if (event.error === 'not-allowed') {
        this.emitMicrophoneAvailabilityChange(false)
        this.disableRecognition()
      }
      this.onErrorProps?.(event)
    }
  }

  onRecognitionDisconnect() {
    sendSlack(this.slackToken, 'onRecognitionDisconnect()')
    this.onStopListening()
    this.listening = false
    if (this.pauseAfterDisconnect) {
      this.emitListeningChange(false)
    } else if (this.recognition) {
      if (this.recognition.continuous) {
        this.startListening({ continuous: this.recognition.continuous })
      } else {
        this.emitListeningChange(false)
      }
    }
    this.pauseAfterDisconnect = false
  }

  updateTranscript({ results, resultIndex }) {
    const currentIndex = resultIndex === undefined ? results.length - 1 : resultIndex
    this.interimTranscript = ''
    this.finalTranscript = ''
    for (let i = currentIndex; i < results.length; ++i) {
      if (results[i].isFinal && (!isAndroid() || results[i][0].confidence > 0)) {
        this.updateFinalTranscript(results[i][0].transcript)
      } else {
        this.interimTranscript = concatTranscripts(
          this.interimTranscript,
          results[i][0].transcript
        )
      }
    }
    let isDuplicateResult = false
    if (this.interimTranscript === '' && this.finalTranscript !== '') {
      if (this.previousResultWasFinalOnly) {
        isDuplicateResult = true
      }
      this.previousResultWasFinalOnly = true
    } else {
      this.previousResultWasFinalOnly = false
    }
    if (!isDuplicateResult) {
      this.emitTranscriptChange(this.interimTranscript, this.finalTranscript)
    }
  }

  updateFinalTranscript(newFinalTranscript) {
    this.finalTranscript = concatTranscripts(
      this.finalTranscript,
      newFinalTranscript
    )
  }

  resetTranscript() {
    this.disconnect('RESET')
  }

  async startListening({ continuous = false, language } = {}) {
    sendSlack(this.slackToken, 'startListening()::1', !this.recognition)
    if (!this.recognition) {
      return
    }

    this.onAudioStart?.()
    const isContinuousChanged = continuous !== this.recognition.continuous
    const isLanguageChanged = language && language !== this.recognition.lang
    sendSlack(this.slackToken, `startListening()::2::${isContinuousChanged}, ${isLanguageChanged}, ${this.listening}`)
    if (isContinuousChanged || isLanguageChanged) {
      if (this.listening) {
        await this.stopListening()
      }
      this.recognition.continuous = isContinuousChanged ? continuous : this.recognition.continuous
      this.recognition.lang = isLanguageChanged ? language : this.recognition.lang
    }
    if (!this.listening) {
      if (!this.recognition.continuous) {
        this.resetTranscript()
        this.emitClearTranscript()
      }
      try {
        await this.start()
        this.emitListeningChange(true)
      } catch (e) {
        // DOMExceptions indicate a redundant microphone start - safe to swallow
        sendSlack(this.slackToken, 'startlistening()::catch')
        if (!(e instanceof DOMException)) {
          this.emitMicrophoneAvailabilityChange(false)
        }
      }
    }
  }

  async abortListening() {
    sendSlack(this.slackToken, 'abortListening()')
    this.disconnect('ABORT')
    this.emitListeningChange(false)
    await new Promise(resolve => {
      this.onStopListening = resolve
    })
  }

  async stopListening() {
    sendSlack(this.slackToken, 'stopListening()')
    this.disconnect('STOP')
    this.emitListeningChange(false)
    await new Promise(resolve => {
      this.onStopListening = resolve
    })
  }

  getRecognition() {
    return this.recognition
  }

  async start() {
    if (this.recognition && !this.listening) {
      sendSlack(this.slackToken, 'start()')
      await this.recognition.start()
      this.listening = true
    }
  }

  stop() {
    if (this.recognition && this.listening) {
      sendSlack(this.slackToken, 'stop()')
      this.recognition.stop()
      this.listening = false
    }
  }

  abort() {
    if (this.recognition && this.listening) {
      sendSlack(this.slackToken, 'abort()')
      this.recognition.abort()
      this.listening = false
    }
  }
}
