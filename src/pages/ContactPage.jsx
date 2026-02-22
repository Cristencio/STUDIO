import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mensagem enviada!', {
      description: 'Entraremos em contato em breve.'
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contato@qualitystudio.com', href: 'mailto:contato@qualitystudio.com' },
    { icon: Phone, label: 'Telefone', value: '+258 84 000 0000', href: 'tel:+258840000000' },
    { icon: MapPin, label: 'Endereço', value: 'Maputo, Moçambique', href: '#' },
    { icon: Clock, label: 'Horário', value: 'Seg-Sáb: 9h - 21h', href: '#' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="contact-page">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
            Contato
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            ENTRE EM CONTATO
          </h1>
          <p className="text-muted-foreground text-lg">
            Tem alguma dúvida ou quer saber mais sobre nossos serviços? Envie uma mensagem e responderemos o mais breve possível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    className="bg-card border-border"
                    required
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className="bg-card border-border"
                    required
                    data-testid="contact-email"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Assunto</label>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Sobre o que deseja falar?"
                  className="bg-card border-border"
                  required
                  data-testid="contact-subject"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Escreva sua mensagem..."
                  className="bg-card border-border resize-none"
                  rows={6}
                  required
                  data-testid="contact-message"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full gap-2 btn-glow"
                disabled={isSubmitting}
                data-testid="contact-submit"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h2 className="font-heading text-2xl font-semibold mb-6">Informações de Contato</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={index}
                      href={item.href}
                      className="flex items-start gap-4 group"
                      data-testid={`contact-info-${item.label.toLowerCase()}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Redes Sociais</p>
                <div className="flex items-center gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    data-testid="social-instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    data-testid="social-youtube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden aspect-video bg-card border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Mapa interativo</p>
                <p className="text-muted-foreground text-sm">Maputo, Moçambique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
