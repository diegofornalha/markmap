# Nó Window Buffer Memory

- **Visão Geral**
  - Persistência de histórico de chat
  - Não usar em modo de fila
  - Comportamento com workers

- **Resolução de Parâmetros**
  - **Nós Raiz**
    - Processam múltiplos itens
    - Expressões resolvem para cada item
  - **Sub-nós**
    - Resolução apenas do primeiro item
    - Comportamento com expressões

- **Configuração**
  - **Session Key**
    - Armazenamento na memória
    - Dados do workflow
  - **Context Window Length**
    - Interações anteriores
    - Definição de contexto

- **Recursos**
  - Templates de integração
  - Exemplos práticos
  - Documentação LangChain
  - Documentação n8n IA

- **Glossário IA**
  - **Completion**
    - Respostas geradas
    - Modelos GPT
  - **Hallucinations**
    - Identificação errônea
    - Padrões inexistentes
  - **Vector Database**
    - Representações matemáticas
    - Uso com embeddings
  - **Vector Store**
    - Repositório vetorial
    - Armazenamento matemático

Utilize o **nó Window Buffer Memory** para persistir o histórico de chat no seu workflow.

Nesta página, você encontrará:
- Uma lista de operações suportadas pelo nó.
- Links para mais recursos.

> **Atenção:**  
> Não utilize este nó se estiver executando o n8n em **modo de fila**.  
> Se sua instância do n8n utiliza o modo de fila, este nó não funcionará em um workflow de produção ativo, pois o n8n não pode garantir que cada chamada ao Window Buffer Memory seja direcionada para o mesmo worker.

---

## Resolução de Parâmetros em Sub-nós

Sub-nós se comportam de maneira diferente de outros nós ao processar múltiplos itens usando uma expressão:

- **Nós Raiz:**  
  - Aceitam qualquer número de itens como entrada, processam cada item e produzem os resultados.
  - *Exemplo:* Dada uma entrada com cinco valores de nome, a expressão `{{ $json.name }}` se resolve para cada nome, um por vez.

- **Sub-nós:**  
  - A expressão sempre se resolve para o **primeiro item**.
  - *Exemplo:* Dada uma entrada com cinco valores de nome, a expressão `{{ $json.name }}` sempre retorna o primeiro nome.

---

## Parâmetros do Nó

Configure os seguintes parâmetros para o nó:

- **Session Key:**  
  Insira a chave a ser utilizada para armazenar a memória nos dados do workflow.

- **Context Window Length:**  
  Defina o número de interações anteriores a serem consideradas para o contexto.

---

## Templates e Exemplos

- Consulte a documentação do nó Window Buffer Memory para acessar templates de integração e exemplos práticos.
- Explore todos os templates disponíveis para otimizar o uso do nó.

---

## Recursos Relacionados

- **LangChain Buffer Window Memory:**  
  Consulte a documentação do LangChain para mais informações sobre este serviço.

- **Documentação Avançada de IA do n8n:**  
  Verifique detalhes adicionais sobre a integração de IA no n8n.

---

## Problemas Comuns

Para dúvidas ou problemas frequentes e suas soluções sugeridas, consulte a seção de **Problemas Comuns**.
