import React, { useState } from 'react';
import { Search, Filter, Grid, List, Music, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import BeatCard from '../components/BeatCard';

// Sample beats data
const allBeats = [
  { id: 1, title: 'Midnight Dreams', producer: 'Quality Studio', bpm: 140, genre: 'Trap', duration: '3:24', price: 29.99, cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Urban Flow', producer: 'Quality Studio', bpm: 95, genre: 'Hip-Hop', duration: '2:58', price: 24.99, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Electric Vibes', producer: 'Quality Studio', bpm: 128, genre: 'Afrobeat', duration: '3:45', price: 34.99, cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Soul Motion', producer: 'Quality Studio', bpm: 85, genre: 'R&B', duration: '4:12', price: 39.99, cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop' },
  { id: 5, title: 'Night Rider', producer: 'Quality Studio', bpm: 150, genre: 'Trap', duration: '3:08', price: 27.99, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'Smooth Criminal', producer: 'Quality Studio', bpm: 100, genre: 'Hip-Hop', duration: '3:32', price: 32.99, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop' },
  { id: 7, title: 'Lagos Nights', producer: 'Quality Studio', bpm: 116, genre: 'Afrobeat', duration: '4:00', price: 44.99, cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=400&auto=format&fit=crop' },
  { id: 8, title: 'Velvet Touch', producer: 'Quality Studio', bpm: 78, genre: 'R&B', duration: '3:55', price: 29.99, cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop' },
  { id: 9, title: 'Drip Season', producer: 'Quality Studio', bpm: 145, genre: 'Trap', duration: '2:45', price: 22.99, cover: 'https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?q=80&w=400&auto=format&fit=crop' },
  { id: 10, title: 'Golden Era', producer: 'Quality Studio', bpm: 92, genre: 'Hip-Hop', duration: '3:18', price: 34.99, cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=400&auto=format&fit=crop' },
  { id: 11, title: 'Afro Wave', producer: 'Quality Studio', bpm: 122, genre: 'Afrobeat', duration: '3:50', price: 37.99, cover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=400&auto=format&fit=crop' },
  { id: 12, title: 'Silk Roads', producer: 'Quality Studio', bpm: 82, genre: 'R&B', duration: '4:22', price: 42.99, cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=400&auto=format&fit=crop' },
];

const genres = ['Todos', 'Trap', 'Hip-Hop', 'Afrobeat', 'R&B'];
const sortOptions = [
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'price-low', label: 'Menor Preço' },
  { value: 'price-high', label: 'Maior Preço' },
  { value: 'bpm-low', label: 'Menor BPM' },
  { value: 'bpm-high', label: 'Maior BPM' },
];

const BeatsPage = ({ onPlayBeat, onBuyBeat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and sort beats
  const filteredBeats = allBeats
    .filter((beat) => {
      const matchesSearch = beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           beat.producer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'Todos' || beat.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'bpm-low': return a.bpm - b.bpm;
        case 'bpm-high': return b.bpm - a.bpm;
        default: return b.id - a.id;
      }
    });

  return (
    <div className="min-h-screen pt-24 pb-32" data-testid="beats-page">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
            Catálogo Completo
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">NOSSOS BEATS</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore nossa coleção de beats exclusivos. Ouça as prévias e encontre o instrumental perfeito para sua música.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl bg-card border border-border" data-testid="filters-bar">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar beats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-0"
              data-testid="search-input"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedGenre(genre)}
                data-testid={`genre-${genre.toLowerCase()}`}
              >
                {genre}
              </Button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] bg-secondary border-0" data-testid="sort-select">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden md:flex items-center gap-1 p-1 bg-secondary rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('grid')}
                data-testid="view-grid"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('list')}
                data-testid="view-list"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground text-sm mb-6">
          Mostrando <span className="text-foreground font-medium">{filteredBeats.length}</span> beats
        </p>

        {/* Beats Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBeats.map((beat) => (
              <BeatCard 
                key={beat.id} 
                beat={beat} 
                variant="grid"
                onPlay={onPlayBeat}
                onBuy={onBuyBeat}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredBeats.map((beat) => (
              <BeatCard 
                key={beat.id} 
                beat={beat} 
                variant="list"
                onPlay={onPlayBeat}
                onBuy={onBuyBeat}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredBeats.length === 0 && (
          <div className="text-center py-20">
            <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">Nenhum beat encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outro termo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatsPage;
