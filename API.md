# Documentação da API

Este documento descreve a integração da API para a aplicação Beat Studio.

## URL Base

A URL base para todas as requisições da API é configurada pela variável de ambiente `REACT_APP_BACKEND_URL`:

```
https://beat-shop-2.preview.emergentagent.com
```

## Cliente HTTP

Todas as requisições da API são feitas usando **Axios**. O cliente é configurado para:
- Usar a URL base das variáveis de ambiente
- Incluir headers necessários (Content-Type, Authorization, etc.)
- Manipular interceptadores de requisição/resposta
- Gerenciar respostas de erro

## Autenticação

### Login

**Endpoint:** `POST /auth/login`

**Corpo da Requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "email": "usuario@exemplo.com",
    "role": "client|producer|admin",
    "name": "Nome do Usuário"
  }
}
```

**Uso:**
```javascript
import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login falhou:', error);
  }
};
```

### Registrar

**Endpoint:** `POST /auth/register`

**Corpo da Requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "role": "client|producer"
}
```

**Resposta:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "email": "usuario@exemplo.com",
    "role": "client|producer",
    "name": "Nome do Usuário"
  }
}
```

## API de Beats

### Obter Todos os Beats

**Endpoint:** `GET /beats`

**Parâmetros de Query:**
- `page` (number) - Número da página para paginação (padrão: 1)
- `limit` (number) - Itens por página (padrão: 10)
- `search` (string) - Consulta de busca para nome/artista do beat
- `genre` (string) - Filtrar por gênero
- `minPrice` (number) - Filtrar por preço mínimo
- `maxPrice` (number) - Filtrar por preço máximo
- `sort` (string) - Ordenar por: `newest`, `price_asc`, `price_desc`, `popularity`

**Resposta:**
```json
{
  "data": [
    {
      "id": "beat_id",
      "title": "Título do Beat",
      "artist": "Nome do Produtor",
      "genre": "Hip-Hop",
      "price": 29.99,
      "bpm": 95,
      "key": "Dó Menor",
      "imageUrl": "https://...",
      "audioPreviewUrl": "https://...",
      "description": "Descrição do beat",
      "likes": 42,
      "downloads": 156
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 250,
    "pages": 25
  }
}
```

**Uso:**
```javascript
const getBeats = async (filters = {}) => {
  try {
    const response = await axios.get('/beats', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Falha ao buscar beats:', error);
  }
};
```

### Obter um Beat Individual

**Endpoint:** `GET /beats/:id`

**Resposta:**
```json
{
  "id": "beat_id",
  "title": "Título do Beat",
  "artist": "Nome do Produtor",
  "genre": "Hip-Hop",
  "price": 29.99,
  "bpm": 95,
  "key": "Dó Menor",
  "imageUrl": "https://...",
  "audioPreviewUrl": "https://...",
  "fullAudioUrl": "https://...",
  "description": "Descrição detalhada do beat",
  "likes": 42,
  "downloads": 156,
  "tags": ["type:rap", "mood:dark", "tempo:medium"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-02-10T14:20:00Z"
}
```

### Criar Beat (Apenas produtor)

**Endpoint:** `POST /beats`

**Headers:**
```
Authorization: Bearer {token}
```

**Corpo da Requisição (multipart/form-data):**
```
- title (string, obrigatório)
- genre (string, obrigatório)
- bpm (number, obrigatório)
- key (string, obrigatório)
- price (number, obrigatório)
- description (string)
- audio (File, obrigatório)
- image (File, opcional)
- tags (array de strings)
```

**Resposta:** Retorna o objeto beat criado

### Atualizar Beat (Apenas produtor)

**Endpoint:** `PUT /beats/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Corpo da Requisição:**
```json
{
  "title": "Título Atualizado",
  "description": "Descrição atualizada",
  "price": 34.99,
  "tags": ["type:rap", "mood:uplifting"]
}
```

### Deletar Beat (Apenas produtor)

**Endpoint:** `DELETE /beats/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "message": "Beat deletado com sucesso"
}
```

## API de Usuários

### Obter Usuário Atual

**Endpoint:** `GET /users/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": "user_id",
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "role": "client|producer|admin",
  "avatar": "https://...",
  "bio": "Bio do usuário",
  "createdAt": "2023-12-01T10:00:00Z"
}
```

### Atualizar Perfil do Usuário

**Endpoint:** `PUT /users/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Corpo da Requisição:**
```json
{
  "name": "Novo Nome",
  "bio": "Bio atualizada",
  "avatar": "dados_da_imagem_base64"
}
```

## API de Pedidos

### Obter Pedidos do Usuário

**Endpoint:** `GET /orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Parâmetros de Query:**
- `page` (number) - Paginação
- `status` (string) - Filtrar por status: `pending`, `completed`, `refunded`

**Resposta:**
```json
{
  "data": [
    {
      "id": "order_id",
      "beatId": "beat_id",
      "beatTitle": "Título do Beat",
      "amount": 29.99,
      "status": "completed",
      "downloadUrl": "https://...",
      "createdAt": "2024-02-10T14:20:00Z"
    }
  ],
  "pagination": { /* ... */ }
}
```

### Criar Pedido (Checkout)

**Endpoint:** `POST /orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Corpo da Requisição:**
```json
{
  "beatId": "beat_id",
  "paymentMethod": "stripe|paypal",
  "paymentToken": "payment_token"
}
```

**Resposta:**
```json
{
  "id": "order_id",
  "status": "completed",
  "downloadUrl": "https://...",
  "invoice": {
    "number": "INV-2024-001",
    "date": "2024-02-10T14:20:00Z"
  }
}
```

## APIs de Dashboard

### Stats do Admin Dashboard

**Endpoint:** `GET /admin/stats`

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "totalUsers": 1250,
  "totalBeats": 3450,
  "totalRevenue": 125450.50,
  "monthlyRevenue": 14320.75,
  "recentOrders": [ /* array de pedidos */ ],
  "topBeats": [ /* array de beats */ ]
}
```

### Stats do Producer Dashboard

**Endpoint:** `GET /producer/stats`

**Headers:**
```
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "totalBeats": 45,
  "totalDownloads": 2340,
  "totalRevenue": 45320.75,
  "monthlyRevenue": 5432.10,
  "myBeats": [ /* array de beats */ ],
  "recentSales": [ /* array de vendas */ ]
}
```

## Tratamento de Erros

Todas as respostas de erro seguem este formato:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem de erro legível para humanos"
  }
}
```

### Códigos de Erro Comuns

| Código HTTP | Código de Erro | Significado |
|-------------|-----------|---------|
| 400 | INVALID_REQUEST | Parâmetros de requisição inválidos |
| 401 | UNAUTHORIZED | Token de autenticação ausente ou inválido |
| 403 | FORBIDDEN | Usuário não tem permissão |
| 404 | NOT_FOUND | Recurso não encontrado |
| 409 | CONFLICT | Recurso já existe |
| 422 | VALIDATION_ERROR | Validação falhou |
| 500 | INTERNAL_ERROR | Erro do servidor |

**Exemplo de Resposta de Erro:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Email é obrigatório",
    "details": {
      "field": "email",
      "rule": "required"
    }
  }
}
```

## Token de Autenticação

Os tokens são JWT (JSON Web Tokens) incluídos no header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

A estratégia de expiração de token e refresh token deve ser implementada no backend.

## Limit de Taxa

- Os limites de taxa são aplicados por endereço IP
- Limite padrão: 100 requisições por minuto
- As informações de limite de taxa estão incluídas nos headers da resposta:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1707569400
  ```

## CORS

A API suporta requisições CORS do frontend. Certifique-se de que seu backend tem headers CORS apropriados configurados.

## Paginação

Endpoints paginados suportam estes parâmetros:

```
GET /resource?page=1&limit=10&sort=oldest
```

A resposta inclui:
```json
{
  "data": [ /* itens */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 250,
    "pages": 25
  }
}
```

## Exemplo de Uso da API em Componentes

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

export function BeatsPage() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/beats', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { page: 1, limit: 20 }
        });
        setBeats(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Falha ao buscar beats');
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {beats.map(beat => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  );
}
```

## Suporte à Documentação da API

Para atualizações da documentação da API ou problemas, entre em contato com o time de backend ou envie uma issue no GitHub.
