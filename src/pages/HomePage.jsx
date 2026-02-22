import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Calendar, Mic2, Sliders, Speaker, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import BeatCard from '../components/BeatCard';

// Sample beats data
const featuredBeats = [
  { id: 1, title: 'Midnight Dreams', producer: 'Quality Studio', bpm: 140, genre: 'Trap', duration: '3:24', price: 29.99, cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Urban Flow', producer: 'Quality Studio', bpm: 95, genre: 'Hip-Hop', duration: '2:58', price: 24.99, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Electric Vibes', producer: 'Quality Studio', bpm: 128, genre: 'Afrobeat', duration: '3:45', price: 34.99, cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Soul Motion', producer: 'Quality Studio', bpm: 85, genre: 'R&B', duration: '4:12', price: 39.99, cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop' },
];

const services = [
  { 
    title: 'Gravação', 
    icon: Mic2, 
    desc: 'Estúdio equipado com tecnologia de ponta para capturar sua voz com clareza e potência.',
    span: 'md:col-span-2'
  },
  { 
    title: 'Mixagem', 
    icon: Sliders, 
    desc: 'Mixagem profissional para equilibrar e polir cada elemento da sua faixa.',
    span: ''
  },
  { 
    title: 'Masterização', 
    icon: Speaker, 
    desc: 'Finalização profissional para garantir que sua música soe incrível em qualquer plataforma.',
    span: ''
  },
  { 
    title: 'Beatmaking', 
    icon: Music, 
    desc: 'Instrumentais exclusivos produzidos sob medida para o seu estilo.',
    span: 'md:col-span-2'
  },
];

const HomePage = ({ onPlayBeat, onBuyBeat }) => {
  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1606669027987-0bacdc7a8f70?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Studio"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 text-center pt-20">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-6 opacity-0 animate-fade-in stagger-1">
            Quality Studio Gêmeos
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6 opacity-0 animate-fade-in stagger-2">
            GRAVE COM<br />
            <span className="text-gradient">QUALIDADE</span><br />
            PROFISSIONAL
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in stagger-3">
            Beats exclusivos, estúdio de gravação de alta qualidade e serviços profissionais de mixagem e masterização.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in stagger-4">
            <Link to="/beats">
              <Button size="lg" className="rounded-full gap-2 btn-glow text-base px-8" data-testid="hero-explore-beats">
                <Play className="w-4 h-4" />
                Explorar Beats
              </Button>
            </Link>
            <Link to="/sessoes">
              <Button size="lg" variant="outline" className="rounded-full gap-2 text-base px-8" data-testid="hero-schedule">
                <Calendar className="w-4 h-4" />
                Agendar Sessão
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in stagger-5">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32" data-testid="services-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
              O que oferecemos
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">NOSSOS SERVIÇOS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className={`service-card group relative p-8 rounded-2xl bg-card border border-border card-hover overflow-hidden ${service.span}`}
                  data-testid={`service-${service.title.toLowerCase()}`}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 service-icon text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Beats Section */}
      <section className="py-20 md:py-32 bg-card/30" data-testid="featured-beats-section">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
                Catálogo
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold">BEATS EM DESTAQUE</h2>
            </div>
            <Link to="/beats" className="hidden md:flex">
              <Button variant="ghost" className="gap-2">
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBeats.map((beat) => (
              <BeatCard 
                key={beat.id} 
                beat={beat} 
                variant="grid"
                onPlay={onPlayBeat}
                onBuy={onBuyBeat}
              />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link to="/beats">
              <Button variant="outline" className="rounded-full gap-2">
                Ver todos os beats
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32" data-testid="cta-section">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1611134612965-d0ba82a139b2?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Studio"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                PRONTO PARA COMEÇAR?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                Explore nosso catálogo de beats ou agende sua sessão de gravação hoje.
              </p>
              <Link to="/beats">
                <Button size="lg" className="rounded-full gap-2 btn-glow text-base px-10" data-testid="cta-buy-beats">
                  Comprar Beats Agora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
