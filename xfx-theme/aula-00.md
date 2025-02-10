# Build an AI Chat Agent with n8n

## Pré-Requisitos

### n8n
- Cloud Service (recomendado)
- Self-hosted (opcional)

### Credenciais
- OpenAI
- Alternativas
  - DeepSeek
  - Google Gemini
  - Groq
  - Azure

## Conceitos de IA no n8n

### LLMs (Large Language Models)
- Geração de texto
- Previsão de palavras

### Agentes de IA
- Funcionalidade orientada a objetivos
- Uso de ferramentas
- Processamento de saída
- Tomada de decisões

## Comparativo LLM vs Agente IA

### Capacidade Principal
- LLM: Geração de texto
- Agente: Conclusão de tarefas

### Tomada de Decisão
- LLM: Nenhuma
- Agente: Sim

### Uso de Ferramentas/APIs
- LLM: Não
- Agente: Sim

### Complexidade do Workflow
- LLM: Etapa única
- Agente: Multi-etapas

### Escopo
- LLM: Gera linguagem
- Agente: Tarefas complexas

## Passos de Implementação

### 1. Criar Workflow
- Novo workflow vazio
- Página de visão geral

### 2. Nó de Gatilho
- Chat Trigger
- Configuração inicial

### 3. Nó AI Agent
- Configuração do agente
- Tools Agent (padrão)

### 4. Configurar Nó
- Modelo de chat
- OpenAI Chat Model

### 5. Credenciais
- API Key
- Configuração segura

### 6. Testar Nó
- Janela de chat
- Logs do agente

### 7. Prompt do Sistema
- Personalização
- Comportamento do modelo

### 8. Persistência
- Window Buffer Memory
- Contexto da conversa

### 9. Salvar Workflow
- Preservar alterações
- Acesso futuro 