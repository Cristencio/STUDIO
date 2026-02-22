import React, { useState } from 'react';
import { 
  Users, Music2, Calendar, DollarSign, Settings, BarChart3, 
  TrendingUp, TrendingDown, ChevronRight, Search, Filter,
  Shield, UserCheck, UserX, Eye, Ban
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

// Mock data
const users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'cliente', status: 'active', purchases: 5, joined: '2025-12-01' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'cliente', status: 'active', purchases: 12, joined: '2025-11-15' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'produtor', status: 'active', purchases: 0, joined: '2025-10-20' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'cliente', status: 'inactive', purchases: 2, joined: '2025-09-10' },
];

const recentSales = [
  { id: 1, beat: 'Midnight Dreams', buyer: 'João Silva', price: 29.99, date: '2026-01-15' },
  { id: 2, beat: 'Electric Vibes', buyer: 'Maria Santos', price: 34.99, date: '2026-01-14' },
  { id: 3, beat: 'Urban Flow', buyer: 'Carlos Lima', price: 24.99, date: '2026-01-13' },
  { id: 4, beat: 'Soul Motion', buyer: 'Ana Costa', price: 39.99, date: '2026-01-12' },
];

const recentSessions = [
  { id: 1, client: 'João Silva', service: 'Gravação', date: '2026-01-20', status: 'confirmed' },
  { id: 2, client: 'Maria Santos', service: 'Mixagem', date: '2026-01-22', status: 'pending' },
  { id: 3, client: 'Pedro Costa', service: 'Masterização', date: '2026-01-25', status: 'confirmed' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userFilter, setUserFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalSales: 162,
    totalRevenue: 4850.50,
    totalSessions: 45,
    monthGrowth: 12.5
  };

  const handleUserAction = (userId, action) => {
    toast.success(`Usuário ${action === 'activate' ? 'ativado' : 'desativado'} com sucesso!`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.role === userFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="admin-dashboard">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie usuários, vendas e configurações</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2" data-testid="settings-btn">
            <Settings className="w-4 h-4" />
            Configurações
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-card p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg">Visão Geral</TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg">Usuários</TabsTrigger>
            <TabsTrigger value="sales" className="rounded-lg">Vendas</TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-lg">Sessões</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Usuários Ativos</p>
                      <p className="font-heading text-2xl font-bold">{stats.activeUsers}/{stats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-500" />
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
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Music2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Vendas de Beats</p>
                      <p className="font-heading text-2xl font-bold">{stats.totalSales}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Sessões</p>
                      <p className="font-heading text-2xl font-bold">{stats.totalSessions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Card */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Crescimento Mensal</p>
                    <div className="flex items-center gap-2">
                      <p className="font-heading text-3xl font-bold">+{stats.monthGrowth}%</p>
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">vs. mês anterior</p>
                    <p className="text-green-500 font-medium">+${(stats.totalRevenue * 0.125).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Sales */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Vendas Recentes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('sales')}>
                    Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.slice(0, 4).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium">{sale.beat}</p>
                          <p className="text-muted-foreground text-sm">{sale.buyer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-green-500">${sale.price}</p>
                          <p className="text-muted-foreground text-xs">{sale.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Sessões Recentes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('sessions')}>
                    Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium">{session.service}</p>
                          <p className="text-muted-foreground text-sm">{session.client}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            session.status === 'confirmed' 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                          </span>
                          <p className="text-muted-foreground text-xs mt-1">{session.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Gerenciar Usuários</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar usuário..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border w-64"
                    data-testid="user-search"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-40 bg-card border-border" data-testid="user-filter">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="cliente">Clientes</SelectItem>
                    <SelectItem value="produtor">Produtores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Usuário</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Compras</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border last:border-0" data-testid={`user-row-${user.id}`}>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-muted-foreground text-sm">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'produtor' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-secondary text-muted-foreground'
                            }`}>
                              {user.role === 'produtor' ? 'Produtor' : 'Cliente'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`flex items-center gap-1 text-sm ${
                              user.status === 'active' ? 'text-green-500' : 'text-muted-foreground'
                            }`}>
                              {user.status === 'active' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono">{user.purchases}</td>
                          <td className="py-4 px-4 text-muted-foreground text-sm">{user.joined}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" className="rounded-full" data-testid={`view-user-${user.id}`}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full"
                                onClick={() => handleUserAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                                data-testid={`toggle-user-${user.id}`}
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Relatório de Vendas</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Music2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{sale.beat}</p>
                          <p className="text-muted-foreground text-sm">Comprado por {sale.buyer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-lg text-green-500">${sale.price}</p>
                        <p className="text-muted-foreground text-xs">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Relatório de Sessões</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{session.service}</p>
                          <p className="text-muted-foreground text-sm">Cliente: {session.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          session.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                        </span>
                        <p className="text-muted-foreground text-xs mt-1">{session.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
