import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';

const AudioPlayer = ({ currentBeat, onClose, onBuy }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Mock waveform data
  const waveformBars = Array.from({ length: 50 }, () => Math.random() * 100);

  useEffect(() => {
    if (currentBeat) {
      setIsPlaying(true);
    }
  }, [currentBeat]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (value) => {
    setCurrentTime(value[0]);
  };

  if (!currentBeat) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 player-bar z-50 animate-slide-up" data-testid="audio-player">
      <div className="container-custom py-4">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Beat Info */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={currentBeat.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"} 
                alt={currentBeat.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{currentBeat.title}</p>
              <p className="text-muted-foreground text-xs truncate">{currentBeat.producer}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-1 hidden md:flex flex-col gap-2">
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" className="w-8 h-8" data-testid="prev-btn">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                onClick={togglePlay} 
                size="icon" 
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                data-testid="play-pause-btn"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8" data-testid="next-btn">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Waveform / Progress */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1 flex items-end justify-center gap-[2px] h-8">
                {waveformBars.map((height, index) => {
                  const progress = (currentTime / (duration || 180)) * 100;
                  const isActive = (index / waveformBars.length) * 100 <= progress;
                  return (
                    <div 
                      key={index}
                      className={`waveform-bar ${isPlaying ? 'wave-bar' : ''}`}
                      style={{ 
                        height: `${Math.max(10, height * 0.35)}px`,
                        background: isActive ? 'linear-gradient(to top, #7c3aed, #06b6d4)' : '#27272a',
                        animationDelay: `${index * 0.02}s`
                      }}
                    />
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground w-10">{formatTime(duration || 180)}</span>
            </div>
          </div>

          {/* Mobile Play Button */}
          <div className="flex md:hidden items-center gap-2 flex-1 justify-center">
            <Button 
              onClick={togglePlay} 
              size="icon" 
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
              data-testid="mobile-play-btn"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
          </div>

          {/* Volume & Buy */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={toggleMute} data-testid="volume-btn">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={(value) => setVolume(value[0] / 100)}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
            <Button 
              onClick={() => onBuy && onBuy(currentBeat)}
              className="rounded-full gap-2 btn-glow"
              data-testid="buy-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Comprar</span>
              <span className="font-mono font-bold">${currentBeat.price}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
