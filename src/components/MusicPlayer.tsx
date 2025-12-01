import { Play, Pause } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

export const MusicPlayer = () => {
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

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md border-4 border-primary bg-card animate-fade-in">
      {/* Header */}
      <div className="border-b-4 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary border-2 border-foreground"></div>
          <h3 className="font-mono font-black text-sm text-foreground tracking-widest">
            MÚSICA AMBIENTE
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Song Info */}
        <div className="border-2 border-primary/50 p-3">
          <p className="font-mono font-bold text-foreground text-sm">Welcome Music</p>
          <p className="font-mono text-xs text-muted-foreground">Relaxe enquanto explora a API</p>
        </div>

        {/* Progress Bar - Brutalist Style */}
        <div className="space-y-2">
          <div className="relative h-8 bg-primary/10 border-3 border-primary overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between items-center border-2 border-primary/30 px-3 py-2 bg-card">
            <span className="font-mono font-bold text-xs text-foreground">
              {formatTime(currentTime)}
            </span>
            <div className="w-1 h-1 bg-primary"></div>
            <span className="font-mono font-bold text-xs text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Play Button - Brutalist */}
        <button
          onClick={togglePlay}
          className="w-full border-3 border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-black py-4 px-4 text-sm tracking-widest transition-colors active:scale-95 active:translate-y-1"
        >
          <div className="flex items-center justify-center gap-3">
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>PAUSAR</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>REPRODUZIR</span>
              </>
            )}
          </div>
        </button>

        {/* Status Indicator */}
        <div className="border-2 border-primary/50 px-3 py-2 flex items-center gap-2">
          <div className={`w-3 h-3 ${isPlaying ? 'bg-accent' : 'bg-muted-foreground'}`}></div>
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            {isPlaying ? 'TOCANDO' : 'PARADO'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-primary bg-primary/5 px-4 py-2">
        <p className="font-mono text-xs text-muted-foreground text-center">
          ▌▌ INTERFACE BRUTALISTA
        </p>
      </div>
    </div>
  );
};
