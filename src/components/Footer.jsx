import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16" data-testid="footer">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Music2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">
                QUALITY <span className="text-primary">STUDIO</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Estúdio de gravação profissional. Beats exclusivos, mixagem e masterização de alta qualidade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Links Rápidos</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/beats" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Catálogo de Beats
              </Link>
              <Link to="/servicos" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Nossos Serviços
              </Link>
              <Link to="/sessoes" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Agendar Sessão
              </Link>
              <Link to="/sobre" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Sobre Nós
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Serviços</h4>
            <nav className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">Gravação Profissional</span>
              <span className="text-muted-foreground text-sm">Mixagem de Áudio</span>
              <span className="text-muted-foreground text-sm">Masterização</span>
              <span className="text-muted-foreground text-sm">Produção Musical</span>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contato@qualitystudio.com" className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                contato@qualitystudio.com
              </a>
              <a href="tel:+258840000000" className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +258 84 000 0000
              </a>
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                Maputo, Moçambique
              </span>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors" data-testid="social-instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors" data-testid="social-youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Quality Studio Gêmeos. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/termos" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
