# Visão Geral da Arquitetura

Este documento descreve a arquitetura de alto nível da aplicação Beat Studio.

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────┐
│        Beat Studio Frontend (React)              │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │        Camada de Páginas/Rotas           │   │
│  │  - HomePage, LoginPage, BeatsPage, etc.  │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │       Camada de Componentes              │   │
│  │  - Header, Footer, BeatCard, AudioPlayer│   │
│  │  - Componentes Radix UI                  │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │    Camada de Hooks & Gerenciamento       │   │
│  │    de Estado                             │   │
│  │  - Hooks customizados (use-toast, etc.)  │   │
│  │  - Gerenciamento de estado React         │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │      Camada de Serviços & API            │   │
│  │  - Cliente HTTP Axios                    │   │
│  │  - Comunicação com API                   │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │      Camada de Estilo e Utilidades       │   │
│  │  - Tailwind CSS                          │   │
│  │  - Funções utilitárias                   │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│        Servidor API Backend                      │
│   (REACT_APP_BACKEND_URL)                       │
└─────────────────────────────────────────────────┘
```

## Estrutura de Diretórios

### `/src/pages`
Componentes de nível de página representando diferentes rotas na aplicação:
- **HomePage.jsx** - Página de início
- **LoginPage.jsx** - Página de autenticação de usuário
- **RegisterPage.jsx** - Página de registro de usuário
- **BeatsPage.jsx** - Navegar e pesquisar beats
- **CheckoutPage.jsx** - Processo de compra/checkout
- **AdminDashboard.jsx** - Interface de gerenciamento de admin
- **ClientDashboard.jsx** - Perfil do cliente e pedidos
- **ProducerDashboard.jsx** - Interface de gerenciamento do produtor
- **ContactPage.jsx** - Página de contato/suporte
- **SessionsPage.jsx** - Gerenciamento de sessões de usuário
- **ServicesPage.jsx** - Informações de serviços

### `/src/components`
Componentes reutilizáveis e de apresentação:

#### Componentes Principais
- **Header.jsx** - Navegação e cabeçalho
- **Footer.jsx** - Seção footer
- **AudioPlayer.jsx** - Funcionalidade de reprodução de áudio
- **BeatCard.jsx** - Exibição de card individual de beat

#### Biblioteca de Componentes UI (`/src/components/ui`)
Componentes baseados em Radix UI e reutilizáveis:
- Componentes de formulário: `input.jsx`, `textarea.jsx`, `select.jsx`, `checkbox.jsx`, etc.
- Componentes de diálogo: `dialog.jsx`, `alert-dialog.jsx`, `drawer.jsx`, etc.
- Navegação: `navigation-menu.jsx`, `breadcrumb.jsx`, `pagination.jsx`
- Exibição de dados: `table.jsx`, `calendar.jsx`, `carousel.jsx`
- E muitos mais...

### `/src/hooks`
Hooks React customizados:
- **use-toast.js** - Gerenciamento de notificações toast

### `/src/lib`
Funções utilitárias e helpers:
- **utils.js** - Funções de utilidade geral

## Tecnologias Principais

### Framework Núcleo
- **React 19.0** - Biblioteca UI
- **React Router 7.5** - Roteamento no lado do cliente

### UI & Estilo
- **Tailwind CSS 3.4** - Framework CSS utilitário
- **Radix UI** - Componentes sem estilo e acessíveis
- **Lucide React** - Biblioteca de ícones
- **class-variance-authority** - Composição de classes CSS
- **tailwind-merge** - Merge de classes Tailwind

### Formulários & Validação
- **React Hook Form 7.56** - Gerenciamento de estado de formulários
- **@hookform/resolvers** - Validadores de formulários
- **Zod 3.24** - Validação de schema

### Estado & Dados
- **Axios** - Cliente HTTP para chamadas da API
- **react-day-picker** - Componente seletor de data

### Bibliotecas Adicionais
- **recharts** - Visualização de dados
- **date-fns** - Utilidades de datas
- **sonner** - Notificações toast
- **embla-carousel-react** - Carrossel/slider
- **react-resizable-panels** - Painéis de layout redimensionáveis
- **next-themes** - Gerenciamento de temas

## Ferramentas de Build & Desenvolvimento

### Sistema de Build
- **Create React App 5.0** - Build tooling
- **Craco 7.1** - Sobrescrita de configuração do CRA
- **Webpack** (via CRA) - Empacotador de módulos

### Estilo
- **PostCSS** - Ferramenta de transformação CSS
- **Tailwind CSS** - Framework CSS utilitário
- **Autoprefixer** - Prefixos de fornecedores CSS

### Qualidade de Código
- **ESLint 9.23** - Linter JavaScript
- **Plugins ESLint** - Regras React, hooks, acessibilidade

### Plugins de Build
Plugins webpack customizados em `/plugins`:
- **health-check/** - Plugin de endpoint de verificação de saúde
- **visual-edits/** - Plugin de capacidades de edição visual

## Fluxo de Dados

1. **Interação do Usuário** → Página/Componente
2. **Manipulador de Evento** → Hook/Gerenciamento de Estado
3. **Processamento de Dados** → Validação (Zod, React Hook Form)
4. **Chamada da API** → Serviço Axios
5. **API de Backend** → Processamento
6. **Resposta** → Atualização de Estado
7. **Re-renderização** → Atualização da UI

## Fluxo de Autenticação

1. Usuário visita LoginPage ou RegisterPage
2. As credenciais são validadas com schema Zod
3. Envio de formulário via React Hook Form
4. Axios faz requisição para API backend
5. Backend retorna token de autenticação (armazenado em localStorage/cookie)
6. Redirecionamento para dashboard apropriado com base no role do usuário

## Estrutura de Roteamento

```
/ (HomePage)
├── /login (LoginPage)
├── /register (RegisterPage)
├── /beats (BeatsPage)
├── /checkout (CheckoutPage)
├── /contact (ContactPage)
├── /dashboard
│   ├── /admin (AdminDashboard)
│   ├── /client (ClientDashboard)
│   └── /producer (ProducerDashboard)
└── /sessions (SessionsPage)
```

## Padrão de Composição de Componentes

```jsx
// Componente Pai (Page)
<Page>
  <Header />
  <MainContent>
    <BeatCard />
    <BeatCard />
    <BeatCard />
  </MainContent>
  <Footer />
</Page>
```

## Estratégia de Gerenciamento de Estado

- **Estado de Componente** - Estado local do componente com `useState`
- **Hooks Customizados** - Lógica compartilhada através de hooks customizados
- **Context API** - Potencial para estado global (se necessário)
- **Estado de Formulário** - React Hook Form para gerenciamento de formulários

## Considerações de Performance

- Code splitting via React Router
- Lazy loading para rotas/componentes
- Otimização de imagens
- CSS-in-JS com Tailwind para CSS mínimo
- Tree-shaking com ES modules

## Configuração de Ambiente

Produção, desenvolvimento, e ambientes de teste são configurados via:
- `.env` - Variáveis de ambiente padrão
- `.env.local` - Sobrescrita local (não commitada)
- Variáveis de ambiente de CI/CD para deployments

## Melhorias Futuras

- Adicionar biblioteca de gerenciamento de estado (Redux, Zustand) para estado complexo
- Implementar cache de resposta da API
- Adicionar testes unitários e de integração
- Configurar testes E2E
- Adicionar rastreamento de analytics
- Implementar error boundaries
- Adicionar suporte offline (Service Workers)
