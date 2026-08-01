// Web Speech API Voice Recognition Engine
export class VoiceCommandEngine {
  constructor(onCommandRecognized) {
    this.onCommandRecognized = onCommandRecognized;
    this.recognition = null;
    this.isListening = false;
    this.init();
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript.toLowerCase().trim();
        console.log('Voice recognized:', transcript);
        this.processCommand(transcript);
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch (e) {
            // Restarted
          }
        }
      };
    }
  }

  start() {
    if (this.recognition && !this.isListening) {
      try {
        this.isListening = true;
        this.recognition.start();
      } catch (e) {
        console.warn('Speech start error:', e);
      }
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Speech stop error:', e);
      }
    }
  }

  processCommand(text) {
    if (!this.onCommandRecognized) return;

    if (text.includes('dark') || text.includes('night') || text.includes('black')) {
      this.onCommandRecognized({ type: 'THEME', mode: 'dark', text });
    } else if (text.includes('light') || text.includes('day') || text.includes('white')) {
      this.onCommandRecognized({ type: 'THEME', mode: 'light', text });
    } else if (text.includes('nothing font') || text.includes('dot font') || text.includes('ndot')) {
      this.onCommandRecognized({ type: 'FONT', fontId: 'ndot', text });
    } else if (text.includes('space font') || text.includes('grotesk')) {
      this.onCommandRecognized({ type: 'FONT', fontId: 'grotesk', text });
    } else if (text.includes('sage') || text.includes('green')) {
      this.onCommandRecognized({ type: 'PALETTE', paletteId: 'sage-green', text });
    } else if (text.includes('red')) {
      this.onCommandRecognized({ type: 'PALETTE', paletteId: 'nothing-red', text });
    } else if (text.includes('monochrome') || text.includes('black and white')) {
      this.onCommandRecognized({ type: 'ICON_PACK', packId: 'monochrome', text });
    } else if (text.includes('neon') || text.includes('glyph')) {
      this.onCommandRecognized({ type: 'ICON_PACK', packId: 'glyph-neon', text });
    } else if (text.includes('fitness') || text.includes('fitpulse') || text.includes('health')) {
      this.onCommandRecognized({ type: 'OPEN_APP', appId: 'fitness', text });
    } else if (text.includes('settings')) {
      this.onCommandRecognized({ type: 'OPEN_SETTINGS', text });
    }
  }
}
