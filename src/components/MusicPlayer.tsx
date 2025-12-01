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
    <div className="w-full max-w-sm border-3 border-primary bg-card animate-fade-in">
      {/* Header */}
      <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
        <p className="font-mono font-black text-xs text-foreground tracking-widest">
          MÚSICA AMBIENTE
        </p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Album Art + Info */}
        <div className="flex gap-3">
          <div className="w-16 h-16 border-2 border-primary bg-primary/10 flex-shrink-0 overflow-hidden">
            <img
              src="https://i.ytimg.com/vi/JZ_8RmkzcKw/hq720.jpg"
              alt="Album"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center border-l-2 border-primary pl-2">
            <p className="font-mono font-bold text-xs text-foreground leading-tight">Do Job</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">Relaxe enquanto explora</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative h-6 bg-primary/10 border-2 border-primary overflow-hidden">
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
          <div className="flex justify-between items-center border-2 border-primary/30 px-2 py-1 bg-card">
            <span className="font-mono font-bold text-xs text-foreground">
              {formatTime(currentTime)}
            </span>
            <div className="w-1 h-1 bg-primary"></div>
            <span className="font-mono font-bold text-xs text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={togglePlay}
          className="w-full border-2 border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-2 px-3 text-xs tracking-widest transition-colors active:scale-95"
        >
          <div className="flex items-center justify-center gap-2">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>PAUSAR</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>REPRODUZIR</span>
              </>
            )}
          </div>
        </button>

        {/* Status Indicator */}
        <div className="border-2 border-primary/50 px-2 py-1 flex items-center gap-2">
          <div className={`w-2 h-2 ${isPlaying ? 'bg-accent' : 'bg-muted-foreground'}`}></div>
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            {isPlaying ? 'TOCANDO' : 'PARADO'}
          </span>
        </div>
      </div>
    </div>
  );
};
