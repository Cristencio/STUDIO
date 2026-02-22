# Guia de Desenvolvimento

Referência rápida para desenvolvedores trabalhando no Beat Studio.

## Comandos Rápidos

```bash
# Iniciar desenvolvimento
npm start

# Compilar para produção
npm run build

# Executar testes
npm test

# Instalar novo pacote
npm install nome-do-pacote

# Remover pacote
npm uninstall nome-do-pacote
```

## Convenções de Código

### Componentes

```jsx
// ✅ Bom
export default function BeatCard({ beat, onPlay }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">{beat.title}</h2>
      <p className="text-gray-600">{beat.artist}</p>
      <button onClick={handlePlay}>
        {isPlaying ? 'Pausar' : 'Reproduzir'}
      </button>
    </div>
  );
}
```

### Importações

Mantenha as importações organizadas:
```jsx
// 1. Bibliotecas externas
import React, { useState } from 'react';
import axios from 'axios';

// 2. Componentes de pacotes
import { Button } from '@/components/ui/button';

// 3. Componentes/hooks customizados
import { AudioPlayer } from '@/components/AudioPlayer';
import { useBeat } from '@/hooks/useBeat';

// 4. Utilidades
import { formatPrice } from '@/lib/utils';
```

### Estilo

```jsx
// Use classes Tailwind
<div className="flex gap-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Clique em mim
  </button>
</div>

// Para classes condicionais, use clsx
import { clsx } from 'clsx';

<div className={clsx(
  'p-4 rounded',
  isActive && 'bg-blue-500',
  !isActive && 'bg-gray-200'
)}>
  Estilo condicional
</div>
```

### Formulários

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mín. 8 caracteres')
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    const response = await axios.post('/api/auth/login', data);
    // Manipular resposta
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### Chamadas de API

```jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/beats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Ocorreu um erro');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Adicione dependências conforme necessário

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return <div>{/* Use data */}</div>;
}
```

## Organização de Arquivo

```
components/
├── AudioPlayer.jsx          # Componente único, simples
├── BeatCard.jsx
└── Header.jsx

pages/
└── HomePage.jsx             # Componentes de página

complex-feature/
├── ComplexComponent.jsx     # Componente principal
├── helpers.js              # Funções auxiliares
├── types.js                # Definições de tipo (se necessário)
└── index.js                # Conveniência de exportação
```

## Tarefas Comuns

### Adicionando uma Nova Página

1. Crie componente em `src/pages/NovaPage.jsx`
2. Importe e adicione rota em `src/App.js`
3. Adicione link de navegação em `Header.jsx`

```jsx
// src/App.js
import NovaPage from './pages/NovaPage';

function App() {
  return (
    <Routes>
      <Route path="/nova-page" element={<NovaPage />} />
    </Routes>
  );
}
```

### Adicionando um Novo Componente

1. Crie arquivo em `src/components/NovoComponente.jsx`
2. Exporte o componente
3. Importe onde necessário

```jsx
// src/components/NovoComponente.jsx
export default function NovoComponente() {
  return <div>Meu Componente</div>;
}

// Em outro arquivo
import NovoComponente from '@/components/NovoComponente';
```

### Adicionando um Hook Customizado

1. Crie arquivo em `src/hooks/useMeuHook.js`
2. Exporte a função hook
3. Importe em componentes

```jsx
// src/hooks/useMeuHook.js
import { useState, useEffect } from 'react';

export function useMeuHook(valorInicial) {
  const [value, setValue] = useState(valorInicial);

  useEffect(() => {
    // Lógica do hook
  }, []);

  return { value, setValue };
}

// Em um componente
import { useMeuHook } from '@/hooks/useMeuHook';

function MeuComponente() {
  const { value, setValue } = useMeuHook('inicial');
  // ...
}
```

### Adicionando uma Função Utilitária

1. Adicione em `src/lib/utils.js` ou crie novo arquivo
2. Exporte a função
3. Importe onde necessário

```jsx
// src/lib/utils.js
export function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

// Em um componente
import { formatPrice } from '@/lib/utils';

function BeatCard({ beat }) {
  return <span>{formatPrice(beat.price)}</span>;
}
```

## Debugging

### Console Logging

```javascript
console.log('Valor simples:', variable);
console.table(arrayOfObjects);
console.error('Mensagem de erro:', error);
console.warn('Mensagem de aviso');
```

### React DevTools

- Instale a extensão [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/) do navegador
- Inspecione componentes na aba de Componentes
- Verifique props e estado em tempo real

### Debugging de Rede

- Abra DevTools (F12) → aba Network
- Faça requisições da API e inspecione:
  - Headers da requisição
  - Corpo da requisição
  - Status da resposta
  - Dados da resposta

## Dicas de Performance

1. **Memoize componentes** quando props não mudam frequentemente
   ```jsx
   import { memo } from 'react';
   
   export default memo(BeatCard);
   ```

2. **Use useCallback** para funções passadas como props
   ```jsx
   const handleClick = useCallback(() => {
     // lógica do manipulador
   }, [dependencies]);
   ```

3. **Lazy load rotas** para melhor performance
   ```jsx
   import { lazy } from 'react';
   
   const HomePage = lazy(() => import('./pages/HomePage'));
   ```

4. **Use key prop** corretamente em listas
   ```jsx
   {beats.map(beat => (
     <BeatCard key={beat.id} beat={beat} />
   ))}
   ```

## Acessibilidade

- Use HTML semântico: `<button>`, `<nav>`, `<main>`, etc.
- Adicione labels ARIA quando necessário: `aria-label`, `aria-describedby`
- Certifique-se de que navegação por teclado funciona
- Teste apenas com teclado (Tab, Enter, etc.)

```jsx
<button
  onClick={handleClick}
  aria-label="Reproduzir áudio"
  className="p-2 rounded hover:bg-gray-100"
>
  Reproduzir
</button>
```

## Variáveis de Ambiente

Disponíveis no código como `process.env.REACT_APP_*`:

```javascript
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const enableHealthCheck = process.env.ENABLE_HEALTH_CHECK === 'true';
```

## Resolução de Problemas

### Porta já em uso
```bash
PORT=3001 npm start
```

### Módulo não encontrado
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas com cache
```bash
# No navegador: Ctrl+Shift+R ou Cmd+Shift+R
# Ou abra DevTools e desative o cache
```

### Erros de plugin Babel
Reinicie o servidor de desenvolvimento se modificar babel config ou adicionar novos plugins.

## Recursos

- [Documentação React](https://react.dev)
- [Documentação React Router](https://reactrouter.com)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Documentação React Hook Form](https://react-hook-form.com)
- [Documentação Zod](https://zod.dev)

## Obtendo Ajuda

1. Verifique a documentação existente
2. Pesquise issues no GitHub
3. Revise exemplos de componentes na documentação do Radix UI
4. Pergunte em discussões da equipe
