# Beat Studio

Plataforma completa baseada em React para descobrir, vender e gerenciar beats musicais. Beat Studio conecta produtores musicais com clientes que procuram beats instrumentais de alta qualidade.

![React][react-badge] ![Tailwind CSS][tailwind-badge] ![Node.js][node-badge]

## 🎵 Funcionalidades

- **Marketplace de Beats** - Navegar e pesquisar milhares de beats por gênero, preço e popularidade
- **Reprodutor de Áudio** - Reprodutor de áudio integrado com controles de reprodução e funcionalidade de pré-visualização
- **Autenticação de Usuário** - Sistema seguro de login e registro
- **Múltiplos Tipos de Usuário**:
  - **Clientes** - Comprar e baixar beats
  - **Produtores** - Enviar, gerenciar e vender beats
  - **Admins** - Gerenciar usuários e conteúdo da plataforma
- **Carrinho & Checkout** - Fluxo de compra completo
- **Dashboard** - Dashboard personalizado para cada tipo de usuário
- **Contato & Suporte** - Página de contato para atendimento ao cliente
- **Design Responsivo** - Interface bonita que funciona em todos os dispositivos

## 📋 Índice

- [Início Rápido](#início-rápido)
- [Documentação](#documentação)
- [Stack de Tecnologias](#stack-de-tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js v18.x ou superior
- npm v9.x ou superior (ou yarn)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/studio.git
   cd studio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   Atualize `.env.local` com a URL do seu backend e configurações.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   A aplicação abrirá em [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
npm start       # Executar servidor de desenvolvimento com hot reload
npm run build   # Compilar para produção
npm test        # Executar testes em modo watch
```

## 📚 Documentação

Documentação completa disponível:

- **[SETUP.md](SETUP.md)** - Guia detalhado de configuração e instalação
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura e design do sistema
- **[API.md](API.md)** - Documentação da integração da API backend
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Diretrizes para contribuição
- **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões e mudanças
- **[LICENSE](LICENSE)** - Licença MIT

Para informações detalhadas sobre a configuração do projeto, consulte o guia [SETUP.md](SETUP.md).

## 🛠 Stack de Tecnologias

### Framework Frontend
- **React 19.0** - Biblioteca UI moderna
- **React Router 7** - Roteamento no lado do cliente
- **React Hook Form 7** - Gerenciamento de estado de formulários

### Estilo & UI
- **Tailwind CSS 3.4** - Estilo utilitário
- **Radix UI** - Biblioteca de componentes acessíveis
- **Lucide React** - Biblioteca de ícones

### Estado & Dados
- **Zod** - Validação de schema
- **Axios** - Cliente HTTP
- **React Context** - Gerenciamento de estado

### Ferramentas de Desenvolvimento
- **Create React App** - Build tooling
- **Craco** - Configuração CRA
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS

### Bibliotecas Adicionais
- **react-hook-form** - Manipulação de formulários
- **sonner** - Notificações toast
- **recharts** - Visualização de dados
- **date-fns** - Utilidades de datas
- **embla-carousel** - Componente de carrossel

## 📁 Estrutura do Projeto

```
studio/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes Radix UI
│   │   ├── AudioPlayer.jsx
│   │   ├── BeatCard.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Componentes de página
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── BeatsPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── ...
│   ├── hooks/              # Hooks React personalizados
│   ├── lib/                # Utilitários e helpers
│   ├── App.js              # Componente principal
│   └── index.js            # Ponto de entrada
├── public/                 # Ativos estáticos
├── plugins/                # Plugins webpack personalizados
├── package.json            # Dependências
├── .env.example            # Template de ambiente
├── README.md              # Este arquivo
├── SETUP.md               # Guia de configuração
├── ARCHITECTURE.md        # Documentação de arquitetura
├── CONTRIBUTING.md        # Diretrizes de contribuição
├── API.md                 # Documentação da API
└── LICENSE                # Licença MIT
```

Para uma explicação detalhada da estrutura do projeto, veja [ARCHITECTURE.md](ARCHITECTURE.md).

## 🔐 Autenticação

A aplicação utiliza autenticação JWT (JSON Web Token):

1. Usuários fazem login com email e senha
2. Backend retorna um token JWT
3. Token é armazenado em localStorage
4. Token é incluído no header `Authorization` para requisições da API

Veja [API.md](API.md) para endpoints de autenticação.

## 🎨 Componentes UI

A aplicação inclui uma biblioteca abrangente de componentes baseada em Radix UI e Tailwind CSS:

- Botões, inputs, formulários
- Diálogos, modais, drawers
- Tabelas, carrosséis, abas
- Navegação, breadcrumbs, paginação
- E muito mais!

Os componentes estão localizados em `src/components/ui/` e podem ser importados diretamente em suas páginas.

## 📖 Exemplos de Uso

### Buscando Beats

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function BeatsPage() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/beats')
      .then(res => setBeats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {beats.map(beat => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  );
}
```

### Usando Formulários com Validação

```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha muito curta')
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      {/* ... */}
    </form>
  );
}
```

## 🤝 Contribuindo

Bem-vindo contribuições da comunidade! Consulte nosso guia [CONTRIBUTING.md](CONTRIBUTING.md) para:

- Começar com desenvolvimento
- Estilo de código e convenções
- Processo de Pull Request
- Diretrizes de testes

## 📝 Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙋 Suporte

- 📖 Verifique os arquivos de documentação
- 💬 Abra uma issue no GitHub
- 📧 Use a página de contato na aplicação

## 🎯 Roadmap

- [ ] Testes unitários e de integração
- [ ] Melhorias no gerenciamento de estado
- [ ] Testes E2E com Cypress
- [ ] Suporte a modo escuro
- [ ] Progressive Web App (PWA)
- [ ] Busca e filtragem avançadas
- [ ] Avaliações e comentários de usuários
- [ ] Integração de gateway de pagamento
- [ ] Dashboard de análises
- [ ] Aplicativo móvel (React Native)

## 📊 Performance

- Code splitting para carregamento inicial mais rápido
- Otimização de imagens
- Otimização CSS com Tailwind
- Lazy loading de rotas

## ♿ Acessibilidade

Construído com diretrizes de acessibilidade WCAG usando componentes Radix UI que fornecem:
- Navegação por teclado
- Suporte a leitores de tela
- Labels e roles ARIA
- HTML semântico

## 🔒 Segurança

- Autenticação baseada em JWT
- Variáveis de ambiente para dados sensíveis
- Configuração CORS
- Comunicação segura da API
- Validação de entrada com Zod

## 📞 Contato

Para mais informações, solicitações de funcionalidades ou relatos de bugs:
- Abra uma issue no GitHub
- Use a página de contato na aplicação
- Email: support@beatstudio.dev

---

**Happy coding! 🎵**

[react-badge]: https://img.shields.io/badge/React-19.0-blue?logo=react
[tailwind-badge]: https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss
[node-badge]: https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
