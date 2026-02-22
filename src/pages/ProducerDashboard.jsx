import React, { useState } from 'react';
import { 
  Music2, Upload, Edit, Trash2, Eye, EyeOff, Plus, Image, 
  DollarSign, Clock, Music, BarChart3, TrendingUp 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';

// Mock data
const producerBeats = [
  { id: 1, title: 'Midnight Dreams', genre: 'Trap', bpm: 140, price: 29.99, plays: 1250, sales: 45, status: 'active', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop' },
  { id: 2, title: 'Urban Flow', genre: 'Hip-Hop', bpm: 95, price: 24.99, plays: 890, sales: 32, status: 'active', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop' },
  { id: 3, title: 'Electric Vibes', genre: 'Afrobeat', bpm: 128, price: 34.99, plays: 2100, sales: 67, status: 'active', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=200&auto=format&fit=crop' },
  { id: 4, title: 'Soul Motion', genre: 'R&B', bpm: 85, price: 39.99, plays: 650, sales: 18, status: 'inactive', cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200&auto=format&fit=crop' },
];

const galleryImages = [
  { id: 1, title: 'Estúdio Principal', url: 'https://images.unsplash.com/photo-1606669027987-0bacdc7a8f70?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Cabine de Gravação', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Equipamentos', url: 'https://images.unsplash.com/photo-1611134612965-d0ba82a139b2?q=80&w=400&auto=format&fit=crop' },
];

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddBeatOpen, setIsAddBeatOpen] = useState(false);
  const [newBeat, setNewBeat] = useState({
    title: '',
    genre: '',
    bpm: '',
    price: '',
    description: ''
  });

  const stats = {
    totalBeats: producerBeats.length,
    totalSales: producerBeats.reduce((acc, b) => acc + b.sales, 0),
    totalRevenue: producerBeats.reduce((acc, b) => acc + (b.sales * b.price), 0),
    totalPlays: producerBeats.reduce((acc, b) => acc + b.plays, 0)
  };

  const handleAddBeat = () => {
    toast.success('Beat adicionado com sucesso!');
    setIsAddBeatOpen(false);
    setNewBeat({ title: '', genre: '', bpm: '', price: '', description: '' });
  };

  const toggleBeatStatus = (beatId) => {
    toast.success('Status do beat atualizado!');
  };

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="producer-dashboard">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold">Painel do Produtor</h1>
            <p className="text-muted-foreground">Gerencie seus beats e conteúdo</p>
          </div>
          <Dialog open={isAddBeatOpen} onOpenChange={setIsAddBeatOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full gap-2" data-testid="add-beat-btn">
                <Plus className="w-4 h-4" />
                Adicionar Beat
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-lg">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Beat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Título</label>
                  <Input 
                    value={newBeat.title}
                    onChange={(e) => setNewBeat({...newBeat, title: e.target.value})}
                    placeholder="Nome do beat"
                    className="bg-secondary border-0"
                    data-testid="beat-title-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Gênero</label>
                    <Select value={newBeat.genre} onValueChange={(v) => setNewBeat({...newBeat, genre: v})}>
                      <SelectTrigger className="bg-secondary border-0">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trap">Trap</SelectItem>
                        <SelectItem value="hiphop">Hip-Hop</SelectItem>
                        <SelectItem value="afrobeat">Afrobeat</SelectItem>
                        <SelectItem value="rnb">R&B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">BPM</label>
                    <Input 
                      type="number"
                      value={newBeat.bpm}
                      onChange={(e) => setNewBeat({...newBeat, bpm: e.target.value})}
                      placeholder="120"
                      className="bg-secondary border-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Preço ($)</label>
                  <Input 
                    type="number"
                    value={newBeat.price}
                    onChange={(e) => setNewBeat({...newBeat, price: e.target.value})}
                    placeholder="29.99"
                    className="bg-secondary border-0"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Descrição (opcional)</label>
                  <Textarea 
                    value={newBeat.description}
                    onChange={(e) => setNewBeat({...newBeat, description: e.target.value})}
                    placeholder="Descreva o beat..."
                    className="bg-secondary border-0 resize-none"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-dashed border-border rounded-xl text-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload Prévia</p>
                  </div>
                  <div className="p-4 border border-dashed border-border rounded-xl text-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload Completo</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 rounded-full" onClick={() => setIsAddBeatOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1 rounded-full" onClick={handleAddBeat} data-testid="save-beat-btn">
                    Salvar Beat
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-card p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg">Visão Geral</TabsTrigger>
            <TabsTrigger value="beats" className="rounded-lg">Meus Beats</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-lg">Galeria</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Music2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total de Beats</p>
                      <p className="font-heading text-2xl font-bold">{stats.totalBeats}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Vendas Totais</p>
                      <p className="font-heading text-2xl font-bold">{stats.totalSales}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Receita Total</p>
                      <p className="font-heading text-2xl font-bold font-mono">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Reproduções</p>
                      <p className="font-heading text-2xl font-bold">{stats.totalPlays.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Beats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Beats Mais Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {producerBeats
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 3)
                    .map((beat, index) => (
                    <div key={beat.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                      <span className="font-mono text-2xl font-bold text-muted-foreground w-8">#{index + 1}</span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{beat.title}</h4>
                        <p className="text-muted-foreground text-sm">{beat.genre} • {beat.bpm} BPM</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{beat.sales} vendas</p>
                        <p className="text-muted-foreground text-sm font-mono">${(beat.sales * beat.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Beats Tab */}
          <TabsContent value="beats" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Meus Beats ({producerBeats.length})</h2>
            </div>
            <div className="grid gap-4">
              {producerBeats.map((beat) => (
                <div key={beat.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{beat.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        beat.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {beat.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{beat.genre} • {beat.bpm} BPM</p>
                    <div className="flex items-center gap-4 text-muted-foreground text-xs mt-1">
                      <span>{beat.plays} plays</span>
                      <span>{beat.sales} vendas</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-lg">${beat.price}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full" data-testid={`edit-beat-${beat.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => toggleBeatStatus(beat.id)}
                      data-testid={`toggle-beat-${beat.id}`}
                    >
                      {beat.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Galeria do Estúdio</h2>
              <Button className="rounded-full gap-2" data-testid="add-image-btn">
                <Image className="w-4 h-4" />
                Adicionar Imagem
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="group relative aspect-video rounded-xl overflow-hidden">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/10" data-testid={`edit-img-${img.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-destructive" data-testid={`delete-img-${img.id}`}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-medium text-sm">{img.title}</p>
                  </div>
                </div>
              ))}
              {/* Add Image Placeholder */}
              <div className="aspect-video rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <div className="text-center">
                  <Plus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm">Adicionar Imagem</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProducerDashboard;
