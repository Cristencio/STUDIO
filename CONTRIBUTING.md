# Contribuindo para o Beat Studio

Obrigado pelo seu interesse em contribuir para o Beat Studio! Este documento fornece diretrizes e instruções para contribuir ao projeto.

## Código de Conduta

Nos comprometemos a fornecer um ambiente acolhedor e inclusivo para todos os contribuidores. Por favor, seja respeitoso e profissional em todas as interações.

## Começando

1. Faça um fork do repositório no GitHub
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/seu-usuario/studio.git
   cd studio
   ```
3. Crie uma nova branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nome-da-sua-feature
   # ou
   git checkout -b fix/nome-da-sua-correcao
   ```
4. Siga as instruções de configuração em [SETUP.md](SETUP.md)

## Fluxo de Trabalho de Desenvolvimento

### 1. Crie uma Branch de Feature

Use nomes significativos para as branches:
- `feature/adicionar-perfil-usuario` para novas features
- `fix/corrigir-exibicao-beat` para correções de bugs
- `docs/atualizar-api-docs` para documentação
- `refactor/melhorar-estrutura-componentes` para refatoração

### 2. Faça Suas Alterações

- Escreva commits claros e significativos
- Mantenha commits pequenos e focados em mudanças únicas
- Siga as convenções de estilo de código (veja abaixo)

### 3. Teste Suas Alterações

- Teste localmente com `npm start`
- Execute testes: `npm test`
- Verifique suas alterações funcionam em navegadores diferentes
- Teste em viewports desktop e mobile

### 4. Diretrizes de Commit

Escreva mensagens de commit claras:

```
feat: Adicionar página de perfil do usuário
fix: Resolver problema de exibição de beat card
docs: Atualizar documentação da API
refactor: Simplificar estrutura de componentes
style: Formatar código com Prettier
test: Adicionar testes unitários para AudioPlayer
```

Use o seguinte formato:
- `feat:` para novas features
- `fix:` para correções de bugs
- `docs:` para mudanças de documentação
- `refactor:` para refatoração de código
- `style:` para mudanças de formatação
- `test:` para adição de testes
- `perf:` para melhorias de performance
- `chore:` para build, dependências, etc.

### 5. Faça Push e Crie um Pull Request

```bash
git push origin nome-da-sua-branch
```

Visite GitHub e crie um Pull Request com:
- Título claro descrevendo a mudança
- Descrição detalhada do que foi mudado e por quê
- Referência a issues relacionadas (se houver)
- Screenshots ou GIFs para mudanças na UI

## Estilo de Código

### JavaScript/React

- Use sintaxe **ES6+** (arrow functions, destructuring, etc.)
- Use **componentes funcionais** com hooks
- Nomes de componentes devem ser **PascalCase**: `MeuComponente.jsx`
- Nomes de funções e variáveis devem ser **camelCase**: `minhaFuncao`
- Constantes devem ser **UPPER_SNAKE_CASE**: `MAX_RETRIES`

### Estrutura de Componente

```jsx
import React from 'react';
import { useAlgumHook } from '@/hooks';
import { funcaoUtilidade } from '@/lib/utils';

export default function MeuComponente({ prop1, prop2 }) {
  const [state, setState] = React.useState(inicial);
  const valorDerivado = useAlgumHook(prop1);

  const handleClick = () => {
    // lógica do manipulador
  };

  return (
    <div className="...">
      {/* JSX do componente */}
    </div>
  );
}
```

### Classes CSS

Use classes utilitárias do Tailwind CSS:
```jsx
<div className="flex justify-center items-center gap-4 p-6 rounded-lg bg-gray-50">
  {/* conteúdo */}
</div>
```

Para estilos complexos, use `clsx` para classes condicionais:
```jsx
import { clsx } from 'clsx';

<div className={clsx(
  "p-4 rounded-lg",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  {/* conteúdo */}
</div>
```

### Convenções de Nomeação

**Componentes:**
```
components/
├── MeuComponente.jsx        # Componente principal
├── MeuComponente.module.css # Estilos específicos do componente (se necessário)
└── index.js                # (opcional para conveniência de exportação)
```

**Organização de Arquivo:**
- Um componente por arquivo
- Componentes relacionados em pastas com index.js
- Nomes descritivos e significativos

## Processo de Pull Request

1. **Antes de Submeter:**
   - Atualize a documentação se necessário
   - Adicione testes para novas features
   - Certifique-se de que todos os testes passam: `npm test`
   - Verifique se há erros/avisos no console em desenvolvimento
   - Verifique o design responsivo em mobile

2. **Título do PR:** Deve ser descritivo e conciso
   - ✅ Bom: "Adicionar controles do reprodutor de áudio com atalhos de teclado"
   - ❌ Ruim: "Corrigir coisas", "Atualizações"

3. **Descrição do PR:** Deve incluir:
   - Qual problema isso resolve?
   - Como resolve o problema?
   - Há mudanças que quebram compatibilidade?
   - Como testar as mudanças?

4. **Processo de Review:**
   - Mantenedores revisar​ão seu PR
   - Responda ao feedback e faça as alterações solicitadas
   - Todas as conversas devem ser respeitosas e construtivas

## Problemas Comuns & Soluções

### Erro "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 Já em Uso
```bash
# Executar em porta diferente
PORT=3001 npm start
```

### Mudanças Não Refletindo
```bash
# Hard refresh (Ctrl+Shift+R ou Cmd+Shift+R)
# Ou limpar cache de build
rm -rf build
npm start
```

## Diretrizes de Teste

### Testes Unitários
- Nome dos arquivos de teste: `Componente.test.js` ou `Componente.spec.js`
- Use descrições significativas de testes
- Teste interações do usuário, não detalhes de implementação
- Apunte por alta cobertura de caminhos críticos

### Exemplo de Teste
```javascript
import { render, screen } from '@testing-library/react';
import BeatCard from './BeatCard';

describe('BeatCard', () => {
  it('deve exibir o título do beat', () => {
    render(<BeatCard title="Meu Beat" />);
    expect(screen.getByText('Meu Beat')).toBeInTheDocument();
  });
});
```

## Documentação

Ao adicionar features, por favor atualize a documentação relevante:

- **Comentários de Código** - Lógica complexa deve ser explicada
- **README.md** - Features novas significativas
- **ARCHITECTURE.md** - Mudanças estruturais
- **API.md** - Mudanças de endpoints da API
- **JSDoc em Linha** - Para funções complexas

Exemplo JSDoc:
```javascript
/**
 * Formata uma data para uma string legível
 * @param {Date} date - A data a ser formatada
 * @param {string} format - O padrão de formatação
 * @returns {string} String de data formatada
 */
export function formatDate(date, format) {
  // implementação
}
```

## Reportando Issues

Antes de criar uma issue, verifique se ela já existe. Ao reportar uma issue, forneça:

1. **Título claro** descrevendo o problema
2. **Descrição detalhada** do problema
3. **Passos para reproduzir** o problema
4. **Comportamento esperado** vs **comportamento atual**
5. **Screenshots/vídeos** se relacionado à UI
6. **Informações do sistema** (SO, navegador, versão do Node)
7. **Ambiente** (configurações de .env se relevante)

## Obtendo Ajuda

- Verifique issues e discussões existentes
- Revise [ARCHITECTURE.md](ARCHITECTURE.md) para design do sistema
- Leia [SETUP.md](SETUP.md) para ajuda com configuração
- Refira-se à documentação de componentes em comentários de código

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto. Veja arquivo [LICENSE](LICENSE) para detalhes.

## Reconhecimento

Apreciamos todas as contribuições! Contribuidores serão reconhecidos em:
- README.md do projeto
- Notas de release para suas contribuições
- Nossa lista de contribuidores

Obrigado por ajudar a melhorar o Beat Studio! 🎵
