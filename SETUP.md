# Guia de Configuração

Este guia ajudará você a configurar e executar o projeto Beat Studio localmente.

## Pré-requisitos

- **Node.js** (v18.x ou superior)
- **npm** (v9.x ou superior) ou **yarn**
- Um navegador web moderno

## Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd studio
```

### 2. Instale as Dependências

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

### 3. Configuração de Ambiente

Crie um arquivo `.env.local` no diretório raiz baseado em `.env.example`:

```bash
cp .env.example .env.local
```

Atualize as variáveis de ambiente de acordo com sua configuração de desenvolvimento:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=true
```

## Executando a Aplicação

### Modo de Desenvolvimento

Inicie o servidor de desenvolvimento com hot reload:

```bash
npm start
```

A aplicação abrirá em [http://localhost:3000](http://localhost:3000)

### Build para Produção

Crie um build otimizado para produção:

```bash
npm run build
```

A saída do build estará no diretório `build/`.

### Testando

Execute os testes em modo de observação interativo:

```bash
npm test
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── AudioPlayer.jsx # Componente de reprodução de áudio
│   ├── BeatCard.jsx    # Componente de exibição de beat
│   ├── Footer.jsx      # Componente footer
│   ├── Header.jsx      # Header de navegação
│   └── ui/             # Biblioteca de componentes UI (baseada em Radix)
├── pages/              # Componentes de páginas/rotas
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── BeatsPage.jsx
│   ├── CheckoutPage.jsx
│   ├── ProfilePage.jsx
│   ├── AdminDashboard.jsx
│   ├── ClientDashboard.jsx
│   ├── ProducerDashboard.jsx
│   └── ServicesPage.jsx
├── hooks/              # Hooks React customizados
├── lib/                # Funções utilitárias e helpers
├── App.js              # Componente principal da aplicação
└── index.js            # Ponto de entrada da aplicação
```

## Scripts Disponíveis

### `npm start`
Executa a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no seu navegador.

### `npm run build`
Compila a aplicação para produção na pasta `build`.

### `npm test`
Inicia o executor de testes em modo de observação interativo.

## Stack de Tecnologias

- **React** - Framework UI
- **React Router v7** - Roteamento no lado do cliente
- **Tailwind CSS** - Estilo
- **Radix UI** - Biblioteca de componentes
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schema
- **Axios** - Cliente HTTP
- **HookForm Resolvers** - Validação de formulários
- **Recharts** - Visualização de dados

## Resolução de Problemas

### Porta 3000 Já em Uso

Se a porta 3000 já estiver em uso, você pode especificar uma porta diferente:

```bash
PORT=3001 npm start
```

### Problemas com CORS

Certifique-se de que sua `REACT_APP_BACKEND_URL` em `.env.local` corresponde à configuração do seu servidor backend e possui cabeçalhos CORS apropriados.

### Módulo Não Encontrado

Limpe node_modules e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Próximos Passos

- Leia [ARCHITECTURE.md](ARCHITECTURE.md) para detalhes do design do sistema
- Verifique [API.md](API.md) para documentação dos endpoints da API
- Revise [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes de contribuição
