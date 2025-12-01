import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl glass-effect-strong border-2 border-amber-500/30 hover:border-yellow-400/50 transition-all duration-300 px-6 py-5 shadow-lg hover:shadow-amber-500/20 w-full max-w-md animate-fade-in">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <audio
        ref={audioRef}
        src="/assets/welcome-music.m4a"
        preload="metadata"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-400/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Volume2 className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h3 className="text-sm font-bold font-sans bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent tracking-wide">
            MÚSICA AMBIENTE
          </h3>
        </div>

        {/* Music Info */}
        <div className="mb-4">
          <p className="text-center text-foreground font-semibold text-sm mb-2">
            Welcome Music
          </p>
          <p className="text-center text-muted-foreground text-xs">
            Relaxe enquanto explora a API
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-3 space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-yellow-400 transition-colors"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={togglePlay}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 hover:border-yellow-400/60 text-amber-300 hover:text-yellow-300 font-semibold transition-all duration-300 group/btn hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-yellow-500/30"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              <span>Reproduzir</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
