import { Play, Pause, Volume2 } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

export const FloatingMusicPlayer = () => {
  const { isPlaying, duration, currentTime, togglePlay, seek } = useAudio();

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl glass-effect-strong border-2 border-amber-500/30 hover:border-yellow-400/50 transition-all duration-300 px-5 py-4 shadow-lg hover:shadow-amber-500/20 w-80 bg-background/80">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-400/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Volume2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent tracking-wide truncate">
                MÚSICA AMBIENTE
              </h3>
              <p className="text-xs text-muted-foreground truncate">Welcome Music</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3 space-y-1.5">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-yellow-400 transition-colors"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono px-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 hover:border-yellow-400/60 text-amber-300 hover:text-yellow-300 font-semibold transition-all duration-300 group/btn hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-yellow-500/30 text-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span>Reproduzir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
