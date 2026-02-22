import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Sliders, Speaker, Music, Check, ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

const services = [
  {
    id: 'gravacao',
    title: 'Gravação',
    icon: Mic2,
    description: 'Estúdio equipado com tecnologia de ponta para capturar sua voz com clareza e potência máximas.',
    features: [
      'Microfones de alta qualidade (Neumann, AKG)',
      'Pré-amplificadores premium',
      'Tratamento acústico profissional',
      'Monitoramento em tempo real',
      'Múltiplas cabines de gravação'
    ],
    price: 'A partir de 50$/hora',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mixagem',
    title: 'Mixagem',
    icon: Sliders,
    description: 'Mixagem profissional para equilibrar e polir cada elemento da sua faixa, garantindo um som coeso e impactante.',
    features: [
      'Equilíbrio de frequências',
      'Compressão e dinâmica',
      'Efeitos e espacialização',
      'Automação detalhada',
      'Até 3 revisões incluídas'
    ],
    price: 'A partir de 100$/faixa',
    image: 'https://images.unsplash.com/photo-1611134612965-d0ba82a139b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'masterizacao',
    title: 'Masterização',
    icon: Speaker,
    description: 'Finalização profissional para garantir que sua música soe incrível em qualquer plataforma e dispositivo.',
    features: [
      'Loudness otimizado para streaming',
      'Equalização final',
      'Limitação transparente',
      'Formatos para todas plataformas',
      'Código ISRC incluído'
    ],
    price: 'A partir de 50$/faixa',
    image: 'https://images.unsplash.com/photo-1606669027987-0bacdc7a8f70?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'producao',
    title: 'Produção Musical',
    icon: Music,
    description: 'Produção completa do seu projeto, desde a ideia inicial até o produto final pronto para lançamento.',
    features: [
      'Composição e arranjo',
      'Produção de beats customizados',
      'Direção artística',
      'Gravação e mixagem incluídas',
      'Consultoria de lançamento'
    ],
    price: 'Sob consulta',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop'
  }
];

const testimonials = [
  {
    name: 'João Silva',
    role: 'Artista',
    text: 'O Quality Studio transformou minha música. A qualidade do som e a atenção aos detalhes são incomparáveis.',
    rating: 5
  },
  {
    name: 'Maria Santos',
    role: 'Produtora',
    text: 'Profissionalismo em cada etapa. A masterização deles fez toda diferença no meu EP.',
    rating: 5
  },
  {
    name: 'Pedro Costa',
    role: 'Rapper',
    text: 'Ambiente incrível e equipe talentosa. Gravei meu álbum inteiro aqui e não me arrependo.',
    rating: 5
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="services-page">
      {/* Hero */}
      <section className="container-custom mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
            Nossos Serviços
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            SERVIÇOS PROFISSIONAIS<br />DE ÁUDIO
          </h1>
          <p className="text-muted-foreground text-lg">
            Do conceito ao lançamento, oferecemos tudo que você precisa para transformar sua visão musical em realidade.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="container-custom mb-20">
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                data-testid={`service-detail-${service.id}`}
              >
                {/* Image */}
                <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full">
                    <span className="font-mono text-sm font-bold text-primary">{service.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/sessoes">
                    <Button className="rounded-full gap-2" data-testid={`cta-${service.id}`}>
                      Agendar {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card/30" data-testid="testimonials-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
              Depoimentos
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">O QUE DIZEM NOSSOS CLIENTES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
                data-testid={`testimonial-${index}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" data-testid="services-cta">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            PRONTO PARA COMEÇAR?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Entre em contato conosco para discutir seu projeto e receber um orçamento personalizado.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sessoes">
              <Button size="lg" className="rounded-full gap-2 btn-glow">
                <Clock className="w-4 h-4" />
                Agendar Sessão
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="rounded-full">
                Falar Conosco
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
