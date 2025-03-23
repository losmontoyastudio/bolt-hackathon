// Sound manager utility for TRON theme hover effects
class SoundManager {
  constructor() {
    // Create a pool of audio objects for better performance
    this.audioPool = Array.from({ length: 3 }, () => new Audio('/audio/button-hover-sound.wav'));
    this.currentAudioIndex = 0;
    this.isEnabled = this.loadSoundPreference();
    this.volume = 0.3; // Default volume 30%
    this.debounceTimeout = null;
    this.lastPlayTime = 0;
    this.minPlayInterval = 150; // Minimum time between sounds in ms
    
    // Set volume for all audio objects
    this.audioPool.forEach(audio => {
      audio.volume = this.volume;
      // Prevent memory leaks by ending the audio properly
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
      });
    });
  }

  isMobileDevice() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  loadSoundPreference() {
    try {
      // Default to true for first-time visitors, but false on mobile
      const savedPreference = localStorage.getItem('tronSoundEnabled');
      if (savedPreference === null) {
        return !this.isMobileDevice(); // Default to false on mobile
      }
      return savedPreference === 'true';
    } catch (error) {
      console.warn('Failed to load sound preference:', error);
      return !this.isMobileDevice(); // Default to false on mobile if error
    }
  }

  saveSoundPreference(enabled) {
    try {
      localStorage.setItem('tronSoundEnabled', enabled);
    } catch (error) {
      console.warn('Failed to save sound preference:', error);
    }
  }

  getNextAudio() {
    const audio = this.audioPool[this.currentAudioIndex];
    this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioPool.length;
    return audio;
  }

  playHoverSound(isThemeTron = false) {
    // Don't play sound on mobile devices
    if (this.isMobileDevice() || !isThemeTron || !this.isEnabled) return;

    const now = Date.now();
    if (now - this.lastPlayTime < this.minPlayInterval) return;

    // Clear any existing timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Debounce the sound playing
    this.debounceTimeout = setTimeout(() => {
      try {
        const audio = this.getNextAudio();
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or better
          audio.currentTime = 0;
          audio.play().catch(error => {
            console.warn('Failed to play hover sound:', error);
          });
          this.lastPlayTime = now;
        }
      } catch (error) {
        console.warn('Error playing hover sound:', error);
      }
    }, 50); // 50ms debounce
  }

  setEnabled(enabled) {
    // Don't allow enabling sound on mobile
    if (this.isMobileDevice()) {
      this.isEnabled = false;
      this.saveSoundPreference(false);
      return;
    }
    this.isEnabled = enabled;
    this.saveSoundPreference(enabled);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audioPool.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  // Clean up resources
  dispose() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.audioPool.forEach(audio => {
      audio.pause();
      audio.src = '';
      audio.load();
    });
    this.audioPool = [];
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager; 