import React from 'react';
import { Play, Clock, Music, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';

const BeatCard = ({ beat, onPlay, onBuy, variant = 'list' }) => {
  if (variant === 'grid') {
    return (
      <div 
        className="beat-card group relative rounded-2xl overflow-hidden bg-card border border-border card-hover"
        data-testid={`beat-card-${beat.id}`}
      >
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={beat.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop"} 
            alt={beat.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Play Overlay */}
          <div className="beat-play-overlay absolute inset-0 bg-black/60 flex items-center justify-center">
            <Button 
              onClick={() => onPlay(beat)} 
              size="icon" 
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90"
              data-testid={`play-beat-${beat.id}`}
            >
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
          {/* Genre Badge */}
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium">
            {beat.genre}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg truncate">{beat.title}</h3>
          <p className="text-muted-foreground text-sm">{beat.producer}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <Music className="w-3 h-3" />
                {beat.bpm} BPM
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {beat.duration}
              </span>
            </div>
            <span className="font-mono font-bold text-primary">${beat.price}</span>
          </div>

          <Button 
            onClick={() => onBuy(beat)} 
            className="w-full mt-4 rounded-full gap-2"
            data-testid={`buy-beat-${beat.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </Button>
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div 
      className="beat-card group flex items-center gap-4 p-3 rounded-xl bg-card/50 border border-border hover:bg-card transition-colors"
      data-testid={`beat-card-${beat.id}`}
    >
      {/* Cover */}
      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={beat.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop"} 
          alt={beat.title}
          className="w-full h-full object-cover"
        />
        <div className="beat-play-overlay absolute inset-0 bg-black/60 flex items-center justify-center">
          <Play className="w-5 h-5" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{beat.title}</h3>
        <p className="text-muted-foreground text-sm truncate">{beat.producer}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 text-muted-foreground text-sm">
        <span className="font-mono">{beat.bpm} BPM</span>
        <span className="px-2 py-1 bg-secondary rounded-full text-xs">{beat.genre}</span>
        <span>{beat.duration}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          onClick={() => onPlay(beat)} 
          variant="ghost" 
          size="icon"
          className="w-10 h-10 rounded-full"
          data-testid={`play-beat-list-${beat.id}`}
        >
          <Play className="w-4 h-4" />
        </Button>
        <span className="font-mono font-bold text-primary hidden sm:block">${beat.price}</span>
        <Button 
          onClick={() => onBuy(beat)} 
          size="sm"
          className="rounded-full gap-1"
          data-testid={`buy-beat-list-${beat.id}`}
        >
          <ShoppingCart className="w-3 h-3" />
          <span className="hidden sm:inline">Comprar</span>
          <span className="sm:hidden">${beat.price}</span>
        </Button>
      </div>
    </div>
  );
};

export default BeatCard;
