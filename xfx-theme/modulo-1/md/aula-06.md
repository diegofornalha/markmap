# WhatsApp Flow Automation

## Objetivo
- Automação WhatsApp via n8n
- Integração com Z-API
- Interação dinâmica com usuários

## Componentes

### Entrada
- Start
- Webhook Z-API
  - Endpoint: `zapi`
  - Método: POST

### Configuração
- Constantes JavaScript
  - Endpoints dinâmicos
  - URLs de mídia
  - Flags de controle
  - Tempo de espera

### Lista de Opções
- Mensagem
- Link
- Áudio
- Vídeo
- Imagem
- Documento
- Contato

## Fluxo de Execução

### Recepção
- Webhook capta mensagem
- Configuração de parâmetros
- Montagem da lista

### Processamento
- Envio da lista
- Verificação de resposta
- Roteamento condicional
  - Resposta lista 1
  - Resposta lista 2

### Ações
- HTTP Requests
  - Envio de texto
  - Envio de link
  - Envio de mídia
  - Envio de contato
- Autenticação via Client-Token
