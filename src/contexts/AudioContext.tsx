import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

interface Track {
  id: number;
  name: string;
  artist: string;
  src: string;
  cover: string;
}

const tracks: Track[] = [
  {
    id: 1,
    name: "Do Job",
    artist: "Relaxe enquanto explora",
    src: "/assets/background-music.mp3",
    cover: "https://i.ytimg.com/vi/JZ_8RmkzcKw/hq720.jpg"
  },
  {
    id: 2,
    name: "MALANDRA MENTE",
    artist: "Relaxe enquanto explora",
    src: "/assets/malandra-mente.mp3",
    cover: "https://i.ytimg.com/vi/pO0q-1JJ77E/hqdefault.jpg"
  }
];

interface AudioContextType {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  currentTrack: Track;
  tracks: Track[];
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
        setIsPlaying(true);
      } else {
        setCurrentTrackIndex(0);
        setIsPlaying(true);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const nextTrack = () => {
    const wasPlaying = isPlaying;
    setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
    if (wasPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 100);
    }
  };

  const previousTrack = () => {
    const wasPlaying = isPlaying;
    setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length);
    if (wasPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 100);
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      duration, 
      currentTime, 
      currentTrack,
      tracks,
      togglePlay, 
      seek, 
      nextTrack,
      previousTrack,
      audioRef 
    }}>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
