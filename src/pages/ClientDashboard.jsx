import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music2, Download, Calendar, Clock, User, Settings, LogOut, 
  Play, ShoppingBag, ChevronRight, CreditCard 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data
const purchasedBeats = [
  { id: 1, title: 'Midnight Dreams', producer: 'Quality Studio', purchaseDate: '2026-01-10', price: 29.99, cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop' },
  { id: 2, title: 'Urban Flow', producer: 'Quality Studio', purchaseDate: '2026-01-05', price: 24.99, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop' },
];

const sessions = [
  { id: 1, service: 'Gravação', date: '2026-01-20', time: '14:00', duration: '2h', status: 'confirmed' },
  { id: 2, service: 'Mixagem', date: '2026-01-25', time: '10:00', duration: '3h', status: 'pending' },
];

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao'
  };

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="client-dashboard">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Olá, {user.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/beats">
              <Button className="rounded-full gap-2" data-testid="browse-beats-btn">
                <Music2 className="w-4 h-4" />
                Explorar Beats
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-card p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg" data-testid="tab-overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="purchases" className="rounded-lg" data-testid="tab-purchases">Minhas Compras</TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-lg" data-testid="tab-sessions">Minhas Sessões</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg" data-testid="tab-settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Beats Comprados</p>
                      <p className="font-heading text-2xl font-bold">{purchasedBeats.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Sessões Agendadas</p>
                      <p className="font-heading text-2xl font-bold">{sessions.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Gasto</p>
                      <p className="font-heading text-2xl font-bold font-mono">
                        ${purchasedBeats.reduce((acc, b) => acc + b.price, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Purchases */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Compras Recentes</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('purchases')}>
                  Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchasedBeats.slice(0, 3).map((beat) => (
                    <div key={beat.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{beat.title}</h4>
                        <p className="text-muted-foreground text-sm">{beat.purchaseDate}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full" data-testid={`download-${beat.id}`}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Próximas Sessões</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('sessions')}>
                  Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{session.service}</h4>
                        <p className="text-muted-foreground text-sm">
                          {session.date} às {session.time} • {session.duration}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'confirmed' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Minhas Compras</h2>
            <div className="grid gap-4">
              {purchasedBeats.map((beat) => (
                <div key={beat.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{beat.title}</h4>
                    <p className="text-muted-foreground text-sm">{beat.producer}</p>
                    <p className="text-muted-foreground text-xs">Comprado em {beat.purchaseDate}</p>
                  </div>
                  <span className="font-mono font-bold">${beat.price}</span>
                  <Button className="rounded-full gap-2" data-testid={`download-beat-${beat.id}`}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Minhas Sessões</h2>
              <Link to="/sessoes">
                <Button className="rounded-full gap-2">
                  <Calendar className="w-4 h-4" />
                  Nova Sessão
                </Button>
              </Link>
            </div>
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{session.service}</h4>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.time}
                      </span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    session.status === 'confirmed' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Configurações</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Informações Pessoais</p>
                      <p className="text-muted-foreground text-sm">Atualize seus dados pessoais</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Preferências</p>
                      <p className="text-muted-foreground text-sm">Notificações e privacidade</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <Button variant="destructive" className="rounded-full gap-2" data-testid="logout-btn">
                  <LogOut className="w-4 h-4" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
